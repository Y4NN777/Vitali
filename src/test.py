# test_openrouter.py
import os
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()

def test_openrouter():
  

    api_key = os.getenv("OPENROUTER_API_KEY")
    chat_model = ChatOpenAI(
        model_name="qwen/qwen3-30b-a3b:free",
        openai_api_key=api_key,
        openai_api_base="https://openrouter.ai",
        streaming=False,
    )

    response = chat_model.invoke([{"role": "user", "content": "Hello"}])
    print(response)

if __name__ == "__main__":
    test_openrouter()
