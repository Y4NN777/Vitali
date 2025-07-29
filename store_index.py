from dotenv import load_dotenv
import os
from src.helper import load_pdf_files, text_split, filter_to_minimal_docs, downloads_embeddings
from pinecone import Pinecone
from pinecone import ServerlessSpec
from langchain_pinecone import PineconeVectorStore

load_dotenv()

PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")
OPENROUTER_API_KEY = os.environ.get("OPENROUTER_API_KEY")


os.environ["OPENROUTER_API_KEY"] = OPENROUTER_API_KEY
os.environ["PINECONE_API_KEY"] = PINECONE_API_KEY


extracted_data = load_pdf_files(data_dir='data/')
filtered_data = filter_to_minimal_docs(extracted_data)
text_chunks = text_split(filtered_data)


embeddings = downloads_embeddings()


pinecone_api_key = PINECONE_API_KEY
pc = Pinecone(api_key=pinecone_api_key)

index_name = "vitali-index"

if not pc.has_index(index_name):
    pc.create_index(
        name=index_name,
        dimension=384,
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
    
input = pc.Index(index_name)


docsearch = PineconeVectorStore.from_documents(
    documents=text_chunks,
    index_name=index_name,
    embedding=embeddings,
)

