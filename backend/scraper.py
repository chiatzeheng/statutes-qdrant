
import requests
from bs4 import BeautifulSoup
import os
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
import json
import time
from fake_useragent import UserAgent


def preprocess_text(text):
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'\n+', '\n', text)
    return text

def fetch_and_save(link, base_url, cache_file, retries=3):
    href = link.get('href')
    title = link.text.strip()
    filename = f"acts_texts/{title.replace(' ', '_').replace('/', '_')}.txt"
    url = base_url + href
    ua = UserAgent()



    if os.path.exists(filename):
        print(f"{filename} already exists. Skipping.")
        return

    for attempt in range(retries):
        try:
            response = requests.get(url, headers={'User-Agent': ua.random})
            response.raise_for_status()
            page_soup = BeautifulSoup(response.content, 'html.parser')
            text_content = preprocess_text(page_soup.get_text(separator='\n'))
            time.sleep(1)


            with open(filename, 'w', encoding='utf-8') as text_file:
                text_file.write(text_content)

            print(f"Saved: {filename}")
            return
        except requests.RequestException as e:
            wait_time = 2 ** attempt  # Exponential backoff
            print(f"Failed to retrieve: {url}. Attempt {attempt + 1} of {retries}. Retrying in {wait_time} seconds. Error: {e}")
            time.sleep(wait_time)

    # If failed after retries, save to cache
    with open(cache_file, 'a', encoding='utf-8') as f:
        f.write(json.dumps({'href': href, 'title': title}) + '\n')

def load_cache(cache_file):
    if os.path.exists(cache_file):
        with open(cache_file, 'r', encoding='utf-8') as f:
            return [json.loads(line) for line in f]
    return []

def process_cached_links(cached_links, base_url, cache_file):
    for link in cached_links:
        href = link['href']
        title = link['title']
        filename = f"acts_texts/{title.replace(' ', '_').replace('/', '_')}.txt"
        url = base_url + href

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            page_soup = BeautifulSoup(response.content, 'html.parser')
            text_content = preprocess_text(page_soup.get_text(separator='\n'))

            with open(filename, 'w', encoding='utf-8') as text_file:
                text_file.write(text_content)

            print(f"Saved from cache: {filename}")
        except requests.RequestException as e:
            print(f"Failed to retrieve from cache: {url}. Error: {e}")

# Load the HTML file
with open('All?PageSize=500', 'r', encoding='utf-8') as file:
    content = file.read()

# Parse the HTML content with BeautifulSoup
soup = BeautifulSoup(content, 'html.parser')

# Find all non-ajax a tags inside table elements
table_links = soup.select('table a.non-ajax')

# Create a directory to store the text files
os.makedirs('acts_texts', exist_ok=True)

# Base URL for the links
base_url = 'https://sso.agc.gov.sg'

# Cache file for unfinished downloads
cache_file = 'unfinished_downloads.jsonl'

# Load unfinished downloads from cache
cached_links = load_cache(cache_file)

# Process cached links first
if cached_links:
    print("Processing cached links...")
    process_cached_links(cached_links, base_url, cache_file)

# Create a ThreadPoolExecutor to download links concurrently
with ThreadPoolExecutor(max_workers=5) as executor:
    futures = [executor.submit(fetch_and_save, link, base_url, cache_file) for link in table_links]

    for future in as_completed(futures):
        try:
            future.result()
        except Exception as e:
            print(f"Error occurred: {e}")

print("All files have been processed and saved.")
