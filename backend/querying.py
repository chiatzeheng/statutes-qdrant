import os
import concurrent.futures
from qdrant_client import QdrantClient
from dotenv import load_dotenv
from openai import OpenAI
from langchain_openai import ChatOpenAI
from pydantic import BaseModel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate

class QueryRequest(BaseModel):
    query: str

load_dotenv()

client = OpenAI()

qdrant_client = QdrantClient(
    url=os.getenv("QDRANT_API_URL"),
    api_key=os.getenv("QDRANT_API_SECRET"),
)

def generate_embeddings(query_text):
    text = query_text.replace("\n", " ")
    return client.embeddings.create(input=[text], model="text-embedding-ada-002").data[0].embedding

def query_qdrant(embeddings, qdrant_client, collection_name="vectors"):
    search_result = qdrant_client.search(
        collection_name=collection_name,
        query_vector=embeddings,
        limit=3
    )
    return search_result

prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are a lawyer. You understand their {input_text} and help people with understanding, clarifying or need assistance with Singapore laws.",
        ),
        ("human", "{input}"),
    ]
)

llm = ChatOpenAI(
    model="gpt-3.5-turbo",
    temperature=0.4,
    max_tokens=100,
    timeout=100,
    max_retries=3,
    api_key=os.getenv("OPENAI_API_KEY")
)

output_parser = StrOutputParser()

model = (
    prompt | llm | output_parser
)

def generate_response(query):
    with concurrent.futures.ThreadPoolExecutor() as executor:
        embeddings_future = executor.submit(generate_embeddings, query)
        embeddings = embeddings_future.result()
        search_result = query_qdrant(embeddings, qdrant_client)
    
    best_payload = max(search_result, key=lambda x: x.score).payload['text']
    
    input_data = {
        "input_text": best_payload,
        "input": query
    }
    
    response_text = ""
    for chunk in model.stream(input_data):
        response_text += chunk
        print(chunk, end="", flush=True)
    
    return response_text

def recommend_questions(query): 
    response = (query)
    return response


def get_history():
    return []