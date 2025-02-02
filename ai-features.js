import config from './config.js';

class AIFeatures {
    constructor() {
        this.init();
        this.setupVoiceControl();
        this.setupChatSupport();
    }

    async init() {
        await this.generateAIBio();
        await this.generateSkillRecommendations();
        this.setupSentimentAnalysis();
        this.setupProjectRecommendations();
    }

    async generateAIBio() {
        const bioElement = document.getElementById('ai-bio');
        // Simulate AI-generated bio for now
        const bio = `Innovative Full-Stack Developer with a passion for AI and emerging technologies. 
                    Specialized in creating intelligent web applications that push the boundaries of user experience.`;
        bioElement.textContent = bio;
        this.animateText(bioElement);
    }

    async generateSkillRecommendations() {
        const skillsContainer = document.getElementById('ai-skill-recommendations');
        const skills = [
            'Machine Learning',
            'React Native',
            'Cloud Architecture',
            'WebGL',
            'Blockchain'
        ];

        skills.forEach(skill => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-recommendation';
            skillElement.innerHTML = \`
                <span>\${skill}</span>
                <div class="confidence-meter" style="--confidence: \${Math.random() * 100}%"></div>
            \`;
            skillsContainer.appendChild(skillElement);
        });
    }

    setupSentimentAnalysis() {
        const messageInput = document.querySelector('textarea[name="message"]');
        const sentimentIndicator = document.getElementById('sentiment-indicator');

        messageInput.addEventListener('input', async (e) => {
            const text = e.target.value;
            if (text.length > 10) {
                // Simulate sentiment analysis
                const sentiments = ['positive', 'neutral', 'negative'];
                const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
                sentimentIndicator.textContent = sentiment;
                sentimentIndicator.className = \`sentiment-\${sentiment}\`;
            }
        });
    }

    setupVoiceControl() {
        const voiceButton = document.getElementById('voice-control');
        let isListening = false;

        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                this.handleVoiceCommand(command);
            };

            voiceButton.addEventListener('click', () => {
                if (!isListening) {
                    recognition.start();
                    voiceButton.classList.add('listening');
                } else {
                    recognition.stop();
                    voiceButton.classList.remove('listening');
                }
                isListening = !isListening;
            });
        }
    }

    handleVoiceCommand(command) {
        const commands = {
            'go to projects': () => document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' }),
            'go to contact': () => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' }),
            'toggle theme': () => document.getElementById('theme-toggle').click()
        };

        for (const [key, action] of Object.entries(commands)) {
            if (command.includes(key)) {
                action();
                break;
            }
        }
    }

    setupChatSupport() {
        const chatInput = document.getElementById('chat-input');
        const chatMessages = document.getElementById('chat-messages');

        chatInput.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter' && chatInput.value.trim()) {
                const userMessage = chatInput.value.trim();
                this.addChatMessage('user', userMessage);
                chatInput.value = '';

                // Simulate AI response
                const response = await this.getAIResponse(userMessage);
                this.addChatMessage('ai', response);
            }
        });
    }

    addChatMessage(type, message) {
        const chatMessages = document.getElementById('chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = \`chat-message \${type}-message\`;
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    async getAIResponse(message) {
        // Simulate AI response
        const responses = [
            "I'd be happy to help you with that!",
            "That's an interesting project idea.",
            "Let me show you some relevant examples.",
            "I can guide you through the process."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }

    animateText(element) {
        gsap.from(element, {
            duration: 1,
            opacity: 0,
            y: 20,
            ease: "power2.out"
        });
    }

    setupProjectRecommendations() {
        const projectsGrid = document.getElementById('dynamic-projects');
        const projects = [
            {
                title: 'AI Chat Application',
                description: 'Real-time chat app with AI-powered responses',
                tags: ['ai', 'web'],
                image: 'project1.jpg'
            },
            {
                title: 'Portfolio Generator',
                description: 'AI-driven portfolio website generator',
                tags: ['web', 'ai'],
                image: 'project2.jpg'
            },
            {
                title: 'Mobile Analytics',
                description: 'Advanced analytics dashboard for mobile apps',
                tags: ['mobile', 'web'],
                image: 'project3.jpg'
            }
        ];

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-card glass-effect';
            projectElement.dataset.tags = project.tags.join(' ');
            
            projectElement.innerHTML = \`
                <div class="project-image"></div>
                <h3>\${project.title}</h3>
                <p>\${project.description}</p>
                <div class="project-tags">
                    \${project.tags.map(tag => \`<span class="tag">\${tag}</span>\`).join('')}
                </div>
                <div class="project-links">
                    <a href="#" class="project-link">View Live</a>
                    <a href="#" class="project-link">Source Code</a>
                </div>
            \`;
            
            projectsGrid.appendChild(projectElement);
        });

        // Setup project filtering
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;
                this.filterProjects(filter);
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    filterProjects(filter) {
        const projects = document.querySelectorAll('.project-card');
        projects.forEach(project => {
            const tags = project.dataset.tags.split(' ');
            if (filter === 'all' || tags.includes(filter)) {
                project.style.display = 'block';
                gsap.from(project, {
                    duration: 0.5,
                    opacity: 0,
                    y: 20,
                    ease: "power2.out"
                });
            } else {
                project.style.display = 'none';
            }
        });
    }
}

// Initialize AI features
const aiFeatures = new AIFeatures();
