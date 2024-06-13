from fastapi import FastAPI, HTTPException, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import traceback
import uvicorn
from querying import generate_response 
from fastapi.middleware.cors import CORSMiddleware

class QueryRequest(BaseModel):
    query: str

app = FastAPI()

@app.middleware("http")
async def catch_exceptions_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        # Log the full stack trace for debugging
        traceback.print_exc()
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={"detail": str(e)}
        )

@app.post("/ask")
async def ask(query_request: QueryRequest):
    query = query_request.query
    try:
        return StreamingResponse(generate_response(query), media_type='text/event-stream')
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@app.post("/recommend")
async def recommend(query_request: QueryRequest):
    query = query_request.query
    try:
        response = generate_response(query)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run(app, host="127.0.0.1", port=5000)
