from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_huggingface import HuggingFaceEmbeddings # Official up to date class
from langchain.text_splitter import RecursiveCharacterTextSplitter
from typing import List
from langchain.schema import Document


def load_pdf_files(data_dir):
    """
    Load PDF files from the specified directory

    Args:
        data_dir (_type_): _description_
    """
    
    loader = DirectoryLoader(
        data_dir,
        glob="**/*.pdf",
        loader_cls=PyPDFLoader
    )
    
    documents = loader.load()
    return documents



def filter_to_minimal_docs(documents: List[Document], min_length: int = 1000) -> List[Document]:
    """
    Filter documents to ensure they are above a minimum length.

    Args:
        documents (List[Document]): List of documents to filter.
        min_length (int): Minimum length for documents to be included.

    Returns:
        List[Document]: Filtered list of documents.
    """
    minimals_docs = []
    for doc in documents:
        src = doc.metadata.get("source")
        minimals_docs.append(
            Document(
                page_content=doc.page_content,
                metadata={"source": src}
            )
        )

    return minimals_docs
    
    
def text_split(extracted_data):
    """
    Split the text into smaller chunks for processing using RecursiveCharacterTextSplitter.

    Args:
        minimal_docs (_type_): _description_
    """
    
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=200,
    )
    
    text_chunks = text_splitter.split_documents(extracted_data)
    
    return text_chunks



def download_embeddings():
    """
    Download and return the HugginFace embedding model
    """
    embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return embeddings
    
    
