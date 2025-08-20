// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add animation class
    themeToggle.classList.add('theme-switching');
    setTimeout(() => {
        themeToggle.classList.remove('theme-switching');
    }, 300);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.project-card, .skill-tag, .about-bio, .contact-message');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Typing Animation Enhancement
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Enhanced typing effect for hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title .typing-text');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description p');
    
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 500);
    }
});

// Parallax Effect for Floating Elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill Tag Animation
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.6s ease-in-out';
    });
    
    tag.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .nav-link.active {
        color: var(--text-primary) !important;
        text-shadow: 0 0 10px var(--glow-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .theme-switching {
        animation: themeSwitch 0.3s ease-in-out;
    }
    
    @keyframes themeSwitch {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.2) rotate(180deg); }
        100% { transform: scale(1) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Cursor Trail Effect
class CursorTrail {
    constructor() {
        this.cursors = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }
    
    init() {
        // Create cursor trail elements
        for (let i = 0; i < 5; i++) {
            const cursor = document.createElement('div');
            cursor.className = 'cursor-trail';
            cursor.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: rgba(255, 255, 255, ${0.3 - i * 0.05});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: all 0.1s ease;
            `;
            document.body.appendChild(cursor);
            this.cursors.push(cursor);
        }
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
        
        // Animate cursor trail
        this.animate();
    }
    
    animate() {
        this.cursors.forEach((cursor, index) => {
            const delay = index * 2;
            setTimeout(() => {
                cursor.style.left = this.mouseX + 'px';
                cursor.style.top = this.mouseY + 'px';
            }, delay);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize cursor trail (optional - can be disabled for performance)
// new CursorTrail();

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Particle Background Effect (Optional)
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        
        this.init();
    }
    
    init() {
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
        `;
        document.body.appendChild(this.canvas);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background (optional - can be disabled for performance)
// new ParticleBackground();

// Project Info Modal Functionality
const modal = document.getElementById('projectModal');
const modalContent = document.getElementById('modalContent');
const closeBtn = document.querySelector('.close');

// Project information database
const projectInfo = {
    'life-number': {
        title: 'Life Number Calculator',
        description: 'A fascinating project exploring numerical patterns and life calculations based on numerology principles.',
        features: [
            'Interactive life number calculation based on birth date',
            'Personality analysis and characteristics',
            'Life path number interpretation',
            'Beautiful and intuitive user interface'
        ],
        techStack: ['Python', 'Streamlit', 'Numerology', 'Data Analysis'],
        challenges: 'Implementing accurate numerology algorithms and creating an engaging user experience.',
        solutions: 'Used mathematical formulas for life number calculations and Streamlit for a responsive web interface.'
    },
    'snake': {
        title: 'Snake Game',
        description: 'A classic snake game implementation with modern web technologies and enhanced gameplay features.',
        features: [
            'Classic snake gameplay mechanics',
            'Score tracking and high score system',
            'Responsive design for all devices',
            'Smooth animations and controls'
        ],
        techStack: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
        challenges: 'Implementing smooth snake movement and collision detection.',
        solutions: 'Used canvas for rendering and implemented efficient collision detection algorithms.'
    },
    'sorting': {
        title: 'Sorting Algorithm Visualizer',
        description: 'An educational tool that visualizes various sorting algorithms in real-time with step-by-step animations.',
        features: [
            'Multiple sorting algorithms (Bubble, Quick, Merge, etc.)',
            'Real-time visualization with adjustable speed',
            'Step-by-step algorithm explanation',
            'Performance comparison between algorithms'
        ],
        techStack: ['Python', 'Streamlit', 'Matplotlib', 'Algorithms'],
        challenges: 'Creating smooth animations and explaining complex algorithms visually.',
        solutions: 'Used Streamlit for the interface and implemented custom animation functions for each algorithm.'
    },
    'timetable': {
    title: 'Class Timetable Generator',
    description: 'An automated scheduling tool that generates conflict-free class timetables optimized for teachers and students.',
    features: [
        'Generates clash-free schedules automatically',
        'Custom input for subjects, teachers, and slots',
        'Optimizes class distribution and workload',
        'Exportable timetables for easy use'
    ],
    techStack: ['Python', 'Streamlit', 'Pandas', 'Algorithms'],
    challenges: 'Designing an algorithm that balances teacher availability, subject constraints, and time slots without conflicts.',
    solutions: 'Implemented constraint-based scheduling logic using Python and Pandas, integrated with Streamlit for an interactive interface.'
    },
    'rock-paper-scissors': {
    title: 'Flying Rock Paper Scissors',
    description: 'A browser-based simulation where rock, paper, and scissors emojis float around the screen, collide, and convert each other until one type dominates.',
    features: [
        'Floating rock, paper, and scissors entities',
        'Collision detection and battle resolution',
        'Dynamic statistics and percentage display',
        'Win detection with auto-restart',
        'Speed control (fast/slow) and restart button'
    ],
    techStack: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    challenges: 'Managing smooth animation and accurate collision detection for many entities.',
    solutions: 'Used Canvas for rendering, randomized velocities with boundary checks for natural floating motion, and simple distance-based collision logic to resolve fights.'
    },


    'gesture': {
        title: 'Gesture-based Cursor Control',
        description: 'A computer vision system that enables users to control their mouse cursor using hand gestures, designed especially for accessibility.',
        features: [
            'Real-time hand tracking and gesture recognition',
            'Customizable gesture mappings',
            'Smooth cursor movement',
            'Accessibility-focused design'
        ],
        techStack: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Computer Vision'],
        challenges: 'Achieving accurate and responsive gesture recognition.',
        solutions: 'Implemented advanced hand tracking algorithms and optimized for real-time performance.'
    },
    'face-cursor': {
        title: 'Face Cursor Movement',
        description: 'A system that controls cursor movement using facial expressions and head tracking for hands-free computer interaction.',
        features: [
            'Facial landmark detection',
            'Head pose estimation',
            'Real-time cursor control',
            'Customizable sensitivity settings'
        ],
        techStack: ['Python', 'OpenCV', 'dlib', 'Facial Recognition'],
        challenges: 'Accurate head pose estimation and smooth cursor mapping.',
        solutions: 'Used dlib for facial landmark detection and implemented mathematical transformations for cursor mapping.'
    },
    'weather': {
        title: 'Weather Application',
        description: 'A comprehensive weather application that provides real-time weather data and forecasts with a beautiful user interface.',
        features: [
            'Real-time weather data from multiple APIs',
            '5-day weather forecast',
            'Location-based weather information',
            'Beautiful and responsive UI'
        ],
        techStack: ['Python', 'Weather API', 'HTML/CSS', 'JavaScript'],
        challenges: 'Integrating multiple weather APIs and creating an intuitive interface.',
        solutions: 'Used RESTful APIs for weather data and implemented a responsive design.'
    },
    'sspl': {
        title: 'SSPL Image/Video Filter App',
        description: 'A comprehensive PyQt application developed for DRDO with advanced image and video processing capabilities.',
        features: [
            'Advanced image and video filtering',
            'Deep learning-based denoising',
            'Pattern recognition algorithms',
            'Professional GUI interface'
        ],
        techStack: ['Python', 'PyQt', 'OpenCV', 'MATLAB', 'PyTorch'],
        challenges: 'Integrating multiple technologies and ensuring real-time performance.',
        solutions: 'Used multithreading for performance and modular architecture for maintainability.'
    },
    'rotation': {
        title: 'Point Rotation Visualizer',
        description: 'An interactive tool that demonstrates mathematical concepts of point rotation using trigonometric calculations.',
        features: [
            'Interactive point manipulation',
            'Real-time rotation calculations',
            'Mathematical formula display',
            'Educational visualizations'
        ],
        techStack: ['Python', 'Tkinter', 'Mathematics', 'Trigonometry'],
        challenges: 'Implementing smooth animations and accurate mathematical calculations.',
        solutions: 'Used Tkinter for the interface and implemented precise trigonometric functions.'
    },
    'mouse-gesture': {
        title: 'Mouse Gesture Recognition',
        description: 'An advanced system that recognizes mouse gestures and executes corresponding commands for enhanced productivity.',
        features: [
            'Custom gesture recognition',
            'Command execution system',
            'Gesture learning capabilities',
            'Productivity enhancement tools'
        ],
        techStack: ['Python', 'Computer Vision', 'Gesture Recognition', 'Automation'],
        challenges: 'Accurate gesture recognition and command mapping.',
        solutions: 'Implemented machine learning algorithms for gesture classification.'
    },
    'tumor': {
        title: 'Brain Tumor Detection with GradCAM',
        description: 'A medical AI application that classifies brain MRI scans and provides visual explanations using GradCAM technology.',
        features: [
            'Brain tumor classification (Glioma, Meningioma, Pituitary, No Tumor)',
            'GradCAM and GradCAM++ visualizations',
            'Pre-trained DenseNet121 model',
            'Medical-grade accuracy'
        ],
        techStack: ['Python', 'PyTorch', 'Tkinter', 'Medical Imaging', 'GradCAM'],
        challenges: 'Achieving high accuracy in medical diagnosis and implementing explainable AI.',
        solutions: 'Used transfer learning with DenseNet121 and implemented GradCAM for model interpretability.'
    },
    'clipperboard': {
        title: 'Clipperboard',
        description: 'An advanced clipboard management tool that enhances text processing and productivity.',
        features: [
            'Advanced clipboard management',
            'Text processing capabilities',
            'Multiple clipboard support',
            'Productivity tools'
        ],
        techStack: ['Python', 'Clipboard Management', 'Text Processing'],
        challenges: 'Efficient clipboard handling and text processing.',
        solutions: 'Implemented optimized algorithms for clipboard operations.'
    },
    'lan': {
        title: 'LAN Transfer',
        description: 'A fast and secure file transfer application designed for local network environments.',
        features: [
            'High-speed file transfer',
            'Secure data transmission',
            'Network discovery',
            'Cross-platform compatibility'
        ],
        techStack: ['Python', 'Networking', 'File Transfer', 'Security'],
        challenges: 'Ensuring fast and secure file transfer over local networks.',
        solutions: 'Implemented efficient networking protocols and encryption.'
    },
    'neural': {
        title: 'Custom C++ Neural Network',
        description: 'A from-scratch implementation of neural networks in C++ for educational and research purposes.',
        features: [
            'Complete neural network implementation',
            'Backpropagation algorithm',
            'Multiple layer support',
            'Educational codebase'
        ],
        techStack: ['C++', 'Neural Networks', 'Machine Learning', 'Mathematics'],
        challenges: 'Implementing complex neural network algorithms from scratch.',
        solutions: 'Used efficient C++ programming and mathematical optimization.'
    },
    'progress': {
        title: 'Progress Tracker',
        description: 'A personal progress tracking and goal management system for personal development.',
        features: [
            'Goal setting and tracking',
            'Progress visualization',
            'Personal development tools',
            'Data analytics'
        ],
        techStack: ['Python', 'Data Analysis', 'Visualization', 'Productivity'],
        challenges: 'Creating an intuitive interface for progress tracking.',
        solutions: 'Implemented user-friendly design and comprehensive analytics.'
    }
};

function showProjectInfo(projectId) {
    const project = projectInfo[projectId];
    if (!project) return;

    modalContent.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <button class="close">&times;</button>
        </div>
        <div class="modal-body">
            <div class="modal-left">
                <div class="modal-section">
                    <h3>Project Overview</h3>
                    <p class="modal-description">${project.description}</p>
                </div>
                
                <div class="modal-section">
                    <h3>Key Features</h3>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="modal-right">
                <div class="modal-section">
                    <h3>Technology Stack</h3>
                    <div class="tech-stack">
                        ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="modal-section">
                    <h3>Challenges & Solutions</h3>
                    <p><strong>Challenges:</strong></p>
                    <p>${project.challenges}</p>
                    <br>
                    <p><strong>Solutions:</strong></p>
                    <p>${project.solutions}</p>
                </div>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Re-attach close button event listener
    const newCloseBtn = modalContent.querySelector('.close');
    if (newCloseBtn) {
        newCloseBtn.addEventListener('click', closeModal);
    }
}

// Close modal when clicking the X button
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Global close modal function
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Console Welcome Message
console.log(`
%cWelcome to Amit Verma's Portfolio! 🤖
%cML Engineer & AI Enthusiast
%cBuilding, Running & Fine-tuning Machine Learning Models

%cCheck out my projects at: https://github.com/lord230
`, 
'color: #ffffff; font-size: 20px; font-weight: bold; font-family: "Orbitron", monospace;',
'color: #cccccc; font-size: 14px; font-family: "Orbitron", monospace;',
'color: #999999; font-size: 12px; font-family: "Orbitron", monospace;',
'color: #ffffff; font-size: 12px; font-family: "Orbitron", monospace;'
);
