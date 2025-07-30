# Vitali - Medical Chatbot

**An advanced RAG-powered medical chatbot delivering accurate health information through intelligent retrieval-augmented generation.**

[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
[![LangChain](https://img.shields.io/badge/LangChain-Framework-green.svg)](https://langchain.com)
[![Pinecone](https://img.shields.io/badge/Pinecone-Vector%20DB-purple.svg)](https://pinecone.io)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active%20Development-orange.svg)](https://github.com/Y4NN777/vitali-medical-chatbot)

## Overview
<img width="404" height="988" alt="image" src="https://github.com/user-attachments/assets/18b59ca5-e8ec-4cab-a767-e4e860fda59c" />
<img width="404" height="988" alt="image" src="https://github.com/user-attachments/assets/15573b98-88aa-415e-97bd-a4e716cece95" />


Vitali is a sophisticated medical information system built on **Retrieval-Augmented Generation (RAG)** architecture. By combining large language models with a comprehensive medical knowledge base through vector similarity search, Vitali provides accurate, contextual responses to health-related queries while maintaining information reliability and safety standards.

The system leverages advanced natural language processing and semantic search capabilities to retrieve relevant medical information from its knowledge base before generating responses, ensuring both accuracy and relevance in medical guidance.

> **⚠️ Medical Disclaimer**: This system provides educational health information only and does not constitute medical advice, diagnosis, or treatment recommendations. Always consult qualified healthcare professionals for medical concerns.

## Key Features

### Core RAG Architecture

- **🔍 Semantic Search**: Vector-based retrieval using Pinecone for precise information matching
- **📚 Knowledge Base Integration**: Comprehensive medical database with embedded representations
- **🤖 Intelligent Generation**: Context-aware response generation using retrieved medical knowledge
- **⚡ Real-time Processing**: Efficient query processing with optimized retrieval pipelines

#### System Capabilities

- **Natural Language Understanding**: Advanced query interpretation for medical contexts
- **Contextual Response Generation**: RAG-enhanced answers with source attribution
- **Scalable Vector Operations**: High-performance similarity search across medical documents
- **Multi-modal Knowledge Retrieval**: Text-based medical information processing
- **Production-Ready Architecture**: Enterprise-grade deployment configuration

## Technical Architecture

### RAG Implementation Stack

#### Core Framework

- **Python 3.12+**: Primary development language
- **LangChain**: RAG orchestration and LLM integration framework
- **OpenRouter API**: Multi-model LLM access layer
- **dolphin-mistral-24b-venice-edition**: State-of-the-art language models

#### Knowledge & Retrieval

- **Pinecone**: Production vector database for semantic search
- **Vector Embeddings**: High-dimensional medical knowledge representations
- **Similarity Search**: Cosine similarity-based document retrieval
- **Knowledge Base**: Curated medical information corpus

### 🌐 Application Layer

- **Flask**: RESTful API backend services
- **HTML5/Tailwind CSS/JavaScript**: Responsive web interface with modern styling
- **Modular Design**: Separation of concerns architecture

### ☁️ Infrastructure & Deployment

- **AWS EC2**: Cloud computing platform
- **CI/CD Pipeline**: Automated deployment workflow
- **Environment Management**: Anaconda/Conda integration
- **Version Control**: Git-based development workflow

## RAG Workflow

```text
User Query → Query Processing → Vector Search → Knowledge Retrieval → Context Augmentation → LLM Generation → Response
     ↓              ↓               ↓               ↓                 ↓                ↓              ↓
 "What are      Embedding      Pinecone         Relevant         Context +         LLM with        Final
 symptoms of    Generation     Vector DB        Medical Docs     Query            Medical Context  Response
 diabetes?"                                                                        
```

## Project Structure

```text
vitali/
├── src/
│   ├── __init__.py
│   ├── helper.py              # RAG utility functions and vector operations
│   └── prompt.py              # Prompt engineering and context management
├── research/
│   └── trials.ipynb           # RAG experimentation and model evaluation
├── app.py                     # Flask application with RAG endpoints
├── setup.py                   # Package configuration
├── requirements.txt           # Python dependencies
├── .env                       # Environment variables and API keys
├── .gitignore                # Version control exclusions
├── LICENSE                   # MIT license
└── README.md                 # Project documentation
```

## Installation & Configuration

### Prerequisites

- Python 3.12 or higher
- Anaconda/Miniconda environment manager
- Git version control
- Pinecone account with API access
- OpenRouter API credentials

#### Setup Instructions

##### 1. Repository Setup

```bash
git clone https://github.com/yourusername/vitali-medical-chatbot.git
cd vitali-medical-chatbot
```

##### 2. Environment Creation

```bash
conda create -n vitali python=3.12
conda activate vitali
```

##### 3. Dependency Installation

```bash
pip install -r requirements.txt
```

##### 4. Environment Configuration

Create `.env` file with required API credentials:

```env
# LLM Configuration
OPENROUTER_API_KEY=your_openrouter_api_key

# Vector Database Configuration
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_ENVIRONMENT=your_pinecone_environment
PINECONE_INDEX_NAME=medical-knowledge-base

# Application Configuration
FLASK_SECRET_KEY=your_secure_secret_key
FLASK_ENV=development
```

##### 5. Knowledge Base Initialization

```bash
# Initialize vector database with medical knowledge
python -c "from src.helper import initialize_knowledge_base; initialize_knowledge_base()"
```

##### 6. Application Launch

```bash
python app.py
```

Access the application at `http://localhost:5000`

## RAG System Usage

### Query Processing Flow

1. **Input Processing**: User submits medical query through web interface
2. **Vector Encoding**: Query converted to high-dimensional embedding
3. **Semantic Retrieval**: Pinecone searches for relevant medical documents
4. **Context Augmentation**: Retrieved documents enhance query context
5. **Response Generation**: LLM generates response using retrieved knowledge
6. **Output Delivery**: Contextual response returned to user

### Example Interactions

**Query**: "What are the early warning signs of cardiovascular disease?"

**RAG Process**:

- Retrieves relevant cardiology documentation
- Identifies symptom patterns and risk factors
- Generates comprehensive response with medical context

**Response**: Detailed information about cardiovascular warning signs based on retrieved medical literature

## Development & Research

### RAG Experimentation

```bash
# Access research notebook for RAG optimization
jupyter notebook research/trials.ipynb
```

### Core Components

**📄 helper.py**: RAG Implementation

- Vector embedding generation
- Pinecone database operations
- Document retrieval and ranking
- Context preparation utilities

**📝 prompt.py**: Context Management

- Medical prompt templates
- Context window optimization
- Response formatting
- Safety constraint implementation

**🌐 app.py**: API Integration

- Flask route definitions
- RAG pipeline orchestration
- Request/response handling
- Error management

## Production Deployment

### AWS EC2 Configuration

#### Infrastructure Setup

```bash
# EC2 instance preparation
sudo apt update && sudo apt upgrade -y
sudo apt install python3.13 python3-pip nginx -y

# Application deployment
git clone https://github.com/yourusername/vitali-medical-chatbot.git
cd vitali-medical-chatbot
pip install -r requirements.txt
```

#### Environment Variables

```bash
export OPENROUTER_API_KEY="production_api_key"
export PINECONE_API_KEY="production_pinecone_key"
export PINECONE_ENVIRONMENT="production"
export FLASK_ENV="production"
```

#### Process Management

```bash
# Using systemd for service management
sudo systemctl enable vitali-chatbot
sudo systemctl start vitali-chatbot
```

## Performance Optimization

### RAG Efficiency Measures

- **Vector Caching**: Frequently accessed embeddings cached in memory
- **Batch Processing**: Multiple queries processed simultaneously
- **Index Optimization**: Pinecone index tuned for medical domain
- **Context Pruning**: Intelligent context window management

### Monitoring & Analytics

- Response accuracy tracking
- Query processing latency measurement
- Vector search performance metrics
- Knowledge base coverage analysis

## Contributing Guidelines

### Development Standards

- **Code Quality**: PEP 8 compliance with type hints
- **RAG Testing**: Vector retrieval accuracy validation
- **Documentation**: Comprehensive function documentation
- **Medical Safety**: Content accuracy verification

### Contribution Process

1. Fork repository and create feature branch
2. Implement RAG improvements or features
3. Add unit tests for vector operations
4. Update documentation and examples
5. Submit pull request with detailed description

## License & Attribution

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for complete terms.

## Project Maintainer

**Ragnang Newende Yanis Axel DABO**  
📧 Email: <axeldaboworkplace@gmail.com>  
🔗 linkedin: [Ragnang Newende Yanis Axel](https://www.linkedin.com/in/y4nnthedev777)

## Acknowledgments

### Technology Partners

- **OpenRouter**: Multi-model LLM API platform
- **Pinecone**: Production vector database services
- **LangChain**: RAG framework and LLM orchestration
- **Qwen Research**: Advanced language model development

### Medical Domain Expertise

- Healthcare professionals providing domain validation
- Medical literature and knowledge base contributors
- Open-source medical information initiatives

## Support & Documentation

**📋 Issues**: [GitHub Issues Tracker](https://github.com/yourusername/vitali-medical-chatbot/issues)  
**📖 Documentation**: Comprehensive guides in `/docs` directory  
**💬 Community**: Developer discussions and Q&A  
**🔧 API Reference**: Complete endpoint documentation

## Roadmap & Future Development

### Planned RAG Enhancements

- [ ] **Multi-modal RAG**: Integration of medical images and documents
- [ ] **Specialized Embeddings**: Domain-specific medical embeddings
- [ ] **Dynamic Knowledge Updates**: Real-time medical literature integration
- [ ] **Federated RAG**: Distributed knowledge base architecture
- [ ] **Explainable Retrieval**: Source attribution and confidence scoring

### System Expansion

- [ ] **Multi-language Support**: Localized medical knowledge bases
- [ ] **API Ecosystem**: Developer-friendly REST API
- [ ] **Mobile Applications**: Native iOS/Android implementations
- [ ] **Healthcare Integration**: EHR and clinical system connectivity
- [ ] **Regulatory Compliance**: HIPAA and medical data standards

---

**⚕️ Healthcare Technology Disclaimer**: Vitali employs advanced RAG technology to provide medical information for educational purposes. This system enhances information retrieval accuracy but does not replace professional medical consultation, diagnosis, or treatment decisions.
