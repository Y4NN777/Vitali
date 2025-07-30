import os
import requests

api_key = os.getenv("OPENROUTER_API_KEY")
headers = {"Authorization": f"Bearer {api_key}"}
response = requests.get("https://openrouter.ai/api/v1/models", headers=headers)
print(response.status_code)
print(response.json())