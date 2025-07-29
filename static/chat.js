// State management
let isTyping = false;
let isDarkMode = false;

// DOM elements
let chatMessages, messageInput, sendBtn, typingIndicator, themeToggle, emergencyBtn, attachBtn, fileInput, voiceBtn, exportChat;

// Initialize the chat application
function initChat() {
    // Get DOM elements
    chatMessages = document.getElementById('chatMessages');
    messageInput = document.getElementById('messageInput');
    sendBtn = document.getElementById('sendBtn');
    typingIndicator = document.getElementById('typingIndicator');
    themeToggle = document.getElementById('themeToggle');
    emergencyBtn = document.getElementById('emergencyBtn');
    attachBtn = document.getElementById('attachBtn');
    fileInput = document.getElementById('fileInput');
    voiceBtn = document.getElementById('voiceBtn');
    exportChat = document.getElementById('exportChat');

    // Auto-resize textarea
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        
        // Enable/disable send button
        sendBtn.disabled = !this.value.trim();
    });

    // Event listeners
    sendBtn.addEventListener('click', () => sendMessage());
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Quick action buttons
    document.querySelectorAll('.quick-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.getAttribute('data-text');
            sendMessage(text);
        });
    });

    // Copy functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.copy-btn')) {
            const text = e.target.closest('.copy-btn').getAttribute('data-text');
            navigator.clipboard.writeText(text).then(() => {
                const icon = e.target.closest('.copy-btn').querySelector('i');
                icon.className = 'fas fa-check';
                setTimeout(() => {
                    icon.className = 'fas fa-copy';
                }, 2000);
            });
        }
    });

    // Like/dislike functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.like-btn')) {
            e.target.closest('.like-btn').classList.toggle('text-success-500');
        }
        if (e.target.closest('.dislike-btn')) {
            e.target.closest('.dislike-btn').classList.toggle('text-danger-500');
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        isDarkMode = !isDarkMode;
        document.documentElement.classList.toggle('dark', isDarkMode);
        const icon = themeToggle.querySelector('i');
        icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    });

    // Emergency button
    emergencyBtn.addEventListener('click', () => {
        if (confirm('This will provide emergency contact information. Continue?')) {
            addMessage('For immediate medical emergencies, please call:\n• Emergency Services: 911 (US)\n• Poison Control: 1-800-222-1222\n• Crisis Text Line: Text HOME to 741741\n\nAlways call emergency services for life-threatening situations.', 'bot');
        }
    });

    // File attachment
    attachBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            addMessage(`📎 Attached file: ${fileName}`, 'user');
            setTimeout(() => {
                addMessage('I can see you\'ve attached a file. Please note that I can provide general information about medical documents, but cannot replace professional medical analysis.', 'bot');
            }, 1000);
        }
    });

    // Voice input
    voiceBtn.addEventListener('click', () => {
        voiceBtn.classList.toggle('bg-danger-100');
        voiceBtn.classList.toggle('text-danger-600');
        
        if (voiceBtn.classList.contains('bg-danger-100')) {
            addMessage('🎤 Voice recording started (simulated)', 'user');
            setTimeout(() => {
                voiceBtn.classList.remove('bg-danger-100', 'text-danger-600');
                voiceBtn.classList.add('bg-gray-100');
                addMessage('Voice input would be processed here in a real implementation.', 'bot');
            }, 3000);
        }
    });

    // Export chat
    exportChat.addEventListener('click', () => {
        const messages = Array.from(chatMessages.children).map(msg => {
            const text = msg.querySelector('p').textContent;
            const isUser = msg.innerHTML.includes('fa-user');
            return `${isUser ? 'User' : 'Vitali'}: ${text}`;
        }).join('\n\n');
        
        const blob = new Blob([messages], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vitali-chat-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    });

    // Initialize
    sendBtn.disabled = true;
}

// Send message function
function sendMessage(text = null) {
    const message = text || messageInput.value.trim();
    if (!message || isTyping) return;

    // Add user message
    addMessage(message, 'user');
    
    // Clear input
    if (!text) {
        messageInput.value = '';
        messageInput.style.height = 'auto';
        sendBtn.disabled = true;
    }

    // Show typing indicator
    showTypingIndicator();

    // Send message to backend
    fetch('/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `msg=${encodeURIComponent(message)}`
    })
    .then(response => response.text())
    .then(data => {
        hideTypingIndicator();
        addMessage(data, 'bot');
    })
    .catch(error => {
        hideTypingIndicator();
        addMessage('Sorry, I encountered an error processing your request. Please try again.', 'bot');
        console.error('Error:', error);
    });
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'flex items-start space-x-3 message-fade-in';
    
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    if (sender === 'user') {
        messageDiv.innerHTML = `
            <div class="flex-1"></div>
            <div class="flex-shrink-0 max-w-xs lg:max-w-md">
                <div class="bg-gradient-to-r from-medical-500 to-medical-600 text-white rounded-2xl rounded-tr-md p-4 shadow-lg">
                    <p>${text}</p>
                </div>
                <div class="flex justify-end items-center mt-2 space-x-2">
                    <p class="text-xs text-gray-500 dark:text-gray-400">${time}</p>
                    <button class="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 copy-btn" data-text="${text}">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            </div>
            <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-gradient-to-r from-medical-500 to-medical-600 rounded-xl flex items-center justify-center">
                    <i class="fas fa-stethoscope text-white text-sm"></i>
                </div>
            </div>
            <div class="flex-1">
                <div class="bg-gradient-to-r from-medical-50 to-medical-100 dark:from-gray-700 dark:to-gray-800 rounded-2xl rounded-tl-md p-4 shadow-sm border border-medical-200 dark:border-gray-600 max-w-xs lg:max-w-md">
                    <p class="text-white-800 dark:text-white-200">${text}</p>
                </div>
                <div class="flex items-center mt-2 space-x-2">
                    <p class="text-xs text-gray-500 dark:text-gray-400 ml-1">${time}</p>
                    <button class="text-xs text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 copy-btn" data-text="${text}">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="text-xs text-gray-400 hover:text-success-500 dark:text-gray-400 dark:hover:text-success-400 like-btn">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                    <button class="text-xs text-gray-400 hover:text-danger-500 dark:text-gray-400 dark:hover:text-danger-400 dislike-btn">
                        <i class="fas fa-thumbs-down"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show/hide typing indicator
function showTypingIndicator() {
    isTyping = true;
    typingIndicator.classList.remove('hidden');
}

function hideTypingIndicator() {
    isTyping = false;
    typingIndicator.classList.add('hidden');
}

// Initialize the chat when the DOM is loaded
document.addEventListener('DOMContentLoaded', initChat);