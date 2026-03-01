/* =========================================================================
   Smart Decision Lab v2 - High-Interactive Engine
   ========================================================================= */

// --- Theme Management ---
const themeToggleBtn = document.getElementById('theme-toggle');
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
});

// --- Data Structures for Advanced Decision Tools ---
const decisionData = {
    career: {
        id: "career",
        title: "Career Decision Helper",
        questions: [
            {
                text: "Which industry defines your primary interest?",
                subtext: "Choose the domain you are naturally drawn to.",
                options: [
                    { id: "it", label: "Information Technology & Software" },
                    { id: "business", label: "Business, Strategy & Management" },
                    { id: "marketing", label: "Marketing & Digital Growth" },
                    { id: "design", label: "Design & Creative Arts" },
                    { id: "ai", label: "Artificial Intelligence & Data" },
                    { id: "finance", label: "Finance & Economics" }
                ]
            },
            {
                text: "What is your current skill level?",
                subtext: "Be honest to get the most accurate roadmap.",
                options: [
                    { id: "beginner", label: "Beginner (Just starting out)" },
                    { id: "intermediate", label: "Intermediate (Some experience/projects)" },
                    { id: "advanced", label: "Advanced (Highly skilled professional)" }
                ]
            },
            {
                text: "What is your preferred work environment?",
                subtext: "Where do you thrive?",
                options: [
                    { id: "remote", label: "100% Remote / Work from anywhere" },
                    { id: "office", label: "On-site / Corporate Office" },
                    { id: "hybrid", label: "Hybrid (Mix of office and home)" },
                    { id: "freelance", label: "Freelance / Independent Contractor" }
                ]
            },
            {
                text: "What is your Expected Salary Range (Annual)?",
                subtext: "Based on global tech standards.",
                options: [
                    { id: "low", label: "$30,000 - $50,000 (Entry Level / Junior)" },
                    { id: "med", label: "$50,000 - $100,000 (Mid-Level)" },
                    { id: "high", label: "$100,000+ (Senior / Expert / Founder)" }
                ]
            },
            {
                text: "How much time can you dedicate to learning/upskilling?",
                subtext: "Your realistic timeframe for growth.",
                options: [
                    { id: "short", label: "1 - 3 Months (Crash course/Bootcamp)" },
                    { id: "medium", label: "3 - 6 Months (Dedicated half-year)" },
                    { id: "long", label: "1+ Year (Deep mastery/Degree equivalent)" }
                ]
            }
        ],
        getResult: (answers) => {
            const [ind, level, env, sal, dur] = answers;
            let title = "";
            let desc = "";
            let list = [];

            if (ind === 'it') {
                title = level === 'advanced' ? "Lead Systems Architect" : "Full-Stack Developer";
                desc = `Based on your ${dur} timeline and ${env} preference, focusing on full-stack architecture will reach your ${sal} salary expectations.`;
                list = ["Master modern JS (React/Next.js)", "Learn scalable cloud deployment", "Contribute to enterprise open-source"];
            } else if (ind === 'ai') {
                title = "AI Solutions Engineer / Prompt Architect";
                desc = `The AI landscape fits your ${env} style perfectly. With a ${dur} learning plan, you can secure a ${sal} bracket role.`;
                list = ["Deep dive into LLM APIs and Python", "Understand RAG pipelines", "Build AI micro-SaaS projects"];
            } else if (ind === 'design') {
                title = "UX/UI Product Designer";
                desc = `A highly visual role. Tailor your upskilling over ${dur} for maximum portfolio impact.`;
                list = ["Master Figma & advanced prototyping", "Study behavioral psychology", "Build 3 massive case studies"];
            } else if (ind === 'finance') {
                title = "FinTech Analyst / Quantitative Developer";
                desc = `Your ${level} skills in finance can be leveraged in hybrid tech spaces.`;
                list = ["Learn Python for financial modeling", "Study decentralized finance (DeFi)", "Focus on algorithmic logic"];
            } else if (ind === 'marketing') {
                title = "Growth Hacker / Performance Marketer";
                desc = `Driving metrics while working ${env}. Fits your intense ${dur} learning phase.`;
                list = ["Master data analytics tools (GA4)", "Learn conversion rate optimization", "Understand consumer psychology and ad buying"];
            } else {
                title = "Strategic Operations Manager";
                desc = `Leverage your business acumen in a ${env} setup to hit the ${sal} range.`;
                list = ["Study Agile and project management", "Enhance cross-functional communication", "Master structural scaling strategies"];
            }

            return { title, desc, list };
        }
    },
    skill: {
        id: "skill",
        title: "Skill Learning Advisor",
        questions: [
            {
                text: "Which category do you want to master?",
                subtext: "Select the vertical for your next skill.",
                options: [
                    { id: "tech", label: "Technology (Coding, Cloud, AI)" },
                    { id: "creative", label: "Creative Arts (Design, Video, 3D)" },
                    { id: "business", label: "Business & Sales (Marketing, Growth)" },
                    { id: "freelancing", label: "Freelancing & Soft Skills (Negotiation, Pitching)" }
                ]
            },
            {
                text: "What is your current proficiency level?",
                subtext: "Where are you starting from?",
                options: [
                    { id: "beginner", label: "Beginner (Zero to little knowledge)" },
                    { id: "intermediate", label: "Intermediate (Can build simple things)" },
                    { id: "advanced", label: "Advanced (Looking for deep specialization)" }
                ]
            },
            {
                text: "How much time can you invest weekly?",
                subtext: "Realistic hours per week.",
                options: [
                    { id: "low", label: "1 - 5 hours (Weekend hustle)" },
                    { id: "med", label: "5 - 15 hours (Consistent part-time)" },
                    { id: "high", label: "20+ hours (Full immersion)" }
                ]
            },
            {
                text: "What is your preferred method of learning?",
                subtext: "How do you digest information best?",
                options: [
                    { id: "online", label: "100% Online (Self-paced, YouTube, Courses)" },
                    { id: "offline", label: "Offline (In-person classes, Workshops)" },
                    { id: "cohort", label: "Hybrid / Live Cohort-based Learning" }
                ]
            }
        ],
        getResult: (answers) => {
            const [cat, level, time, method] = answers;

            let title = "";
            let desc = `Starting as a ${level}, your ${time} weekly commitment via ${method} learning creates a solid foundation.`;
            let list = [];

            if (cat === 'tech') {
                title = "Full-Stack Cloud Engineering";
                list = ["Start with freeCodeCamp or Udemy", "Build 5 functional MVP projects", "Read technical documentation daily"];
            } else if (cat === 'creative') {
                title = "Advanced Motion & 3D Design";
                list = ["Learn Blender and After Effects", "Mimic top-tier Dribbble/Awwwards designs", "Build a visual reel"];
            } else if (cat === 'business') {
                title = "B2B Sales & Growth Strategy";
                list = ["Learn cold-email architecture", "Understand CRM tools like HubSpot", "Practice objection handling frameworks"];
            } else {
                title = "Elite Freelance Consultation";
                list = ["Optimize your Upwork/Fiverr presence", "Learn value-based pricing strategy", "Build a high-converting personal website"];
            }

            return { title, desc, list };
        }
    },
    business: {
        id: "business",
        title: "Business Idea Selector",
        questions: [
            {
                text: "What is your initial budget range?",
                subtext: "Capital available to start right now.",
                options: [
                    { id: "zero", label: "$0 (Pure Bootstrap / Sweat Equity)" },
                    { id: "low", label: "$100 - $1,000 (Lean MVP)" },
                    { id: "med", label: "$1,000 - $10,000 (Proper Setup & Ads)" },
                    { id: "high", label: "$10,000+ (Aggressive Scaling)" }
                ]
            },
            {
                text: "Where do you want to operate?",
                subtext: "Determine your primary market.",
                options: [
                    { id: "online", label: "100% Online / Digital Products / SaaS" },
                    { id: "local", label: "Local Market / Brick & Mortar / Local Services" },
                    { id: "hybrid", label: "Hybrid (Local physical / Global digital)" }
                ]
            },
            {
                text: "What is your main ambition for this business?",
                subtext: "Your long-term exit or lifestyle goal.",
                options: [
                    { id: "side", label: "Automated Side Income ($1k-$3k/mo)" },
                    { id: "job", label: "Replace My Full-time Job ($5k-$10k/mo)" },
                    { id: "scale", label: "Highly Scalable Startup (Multi-million exit)" }
                ]
            }
        ],
        getResult: (answers) => {
            const [budget, op, amb] = answers;

            let title = "";
            let desc = `With a budget of ${budget} and aiming to operate ${op}, your ambition for a ${amb} outcome drives these strategic recommendations.`;
            let list = [];

            if (op === 'online') {
                if (amb === 'scale') {
                    title = "Micro-SaaS & AI Tool Hub";
                    list = ["Find a niche B2B problem and build a wrapped AI solution", "Launch on Product Hunt", "Utilize subscription pricing models"];
                } else {
                    title = "Digital Agency / Info-Product Business";
                    list = ["Create high-ticket digital guides or templates", "Start a niche newsletters", "Offer done-for-you (DFY) digital services"];
                }
            } else if (op === 'local') {
                title = "High-Margin Local Service Arbitrage";
                list = ["Launch a modern cleaning/lawn-care booking site", "Hire contractors to do the physical work", "Run localized Facebook and Google Ads"];
            } else {
                title = "E-Commerce / Direct-to-Consumer Brand";
                list = ["Source a unique physical product", "Build a massive TikTok/Reels audience locally and globally", "Set up efficient logistics flows"];
            }

            return { title, desc, list };
        }
    },
    study: {
        id: "study",
        title: "Study Planner Tool",
        questions: [
            {
                text: "What is your primary study objective?",
                subtext: "Select the mode you need most right now.",
                options: [
                    { id: "daily", label: "Daily Schedule Builder (Routine creation)" },
                    { id: "exam", label: "Exam Preparation Mode (High intensity)" },
                    { id: "focus", label: "Deep Focus Session Planner (Skill acquisition)" },
                    { id: "goal", label: "Long-term Goal Tracking (Degrees/Certifications)" }
                ]
            },
            {
                text: "How do you prefer to segment your study sessions?",
                subtext: "How does your brain maintain attention?",
                options: [
                    { id: "pomodoro", label: "Short bursts (Pomodoro 25m/5m)" },
                    { id: "deep", label: "Deep continuous focus (90m - 120m chunks)" },
                    { id: "flex", label: "Flexible, outcome-based blocks" }
                ]
            },
            {
                text: "What time of day are you most productive?",
                subtext: "Leveraging your natural circadian rhythm.",
                options: [
                    { id: "morning", label: "Early Bird (5 AM - 9 AM)" },
                    { id: "afternoon", label: "Afternoon Hustler (1 PM - 5 PM)" },
                    { id: "night", label: "Night Owl (10 PM Onwards)" }
                ]
            }
        ],
        getResult: (answers) => {
            const [obj, seg, time] = answers;

            let title = "";
            let desc = `Since your prime time is ${time}, implementing a ${seg} format will drastically accelerate your ${obj} objectives.`;
            let list = [];

            if (obj === 'exam') {
                title = "The High-Intensity Exam Sprint";
                list = ["Use focused active recall and spaced repetition", "Block out 4 hours per day minimum during your prime time", "Take mock tests under real constraints"];
            } else if (obj === 'focus') {
                title = "The Monastic Focus Protocol";
                list = ["Disable all notifications during deep chunks", "Have a predefined outcome before starting the timer", "Use binaural beats or white noise"];
            } else if (obj === 'daily') {
                title = "The Sustainable 3-Block System";
                list = ["Block 1: Urgent & Hard Tasks", "Block 2: Light review and admin tasks", "Block 3: Pre-planning for the next day"];
            } else {
                title = "The Milestone Tracker Architecture";
                list = ["Break the macro goal into 12-week micro-sprints", "Review progress rigorously every Sunday", "Never skip two days in a row"];
            }

            return { title, desc, list };
        }
    }
};

// --- App State ---
let state = {
    currentTool: null,
    currentStep: 0,
    answers: []
};

// --- DOM Elements ---
const screens = {
    home: document.getElementById('screen-home'),
    flow: document.getElementById('screen-flow'),
    result: document.getElementById('screen-result')
};

const elements = {
    toolCards: document.querySelectorAll('.tool-card'),
    btnHome: document.getElementById('btn-home'),
    logoTrigger: document.getElementById('logo-trigger'),
    btnFlowBack: document.getElementById('btn-flow-back'),
    btnResultBack: document.getElementById('btn-result-back'),
    btnRestart: document.getElementById('btn-restart-tool'),
    btnExplore: document.getElementById('btn-explore-others'),

    // Flow UI
    stepCounter: document.getElementById('step-counter'),
    progressBar: document.getElementById('flow-progress'),
    questionContainer: document.getElementById('question-container'),
    questionText: document.getElementById('question-text'),
    questionSubtext: document.getElementById('question-subtext'),
    optionsGrid: document.getElementById('options-grid'),

    // Result UI
    resultTitle: document.getElementById('result-title'),
    resultContent: document.getElementById('result-content')
};

// --- Functions ---

// Smoothly transition screens
function switchScreen(targetScreenId) {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen && activeScreen.id === targetScreenId) return;

    if (activeScreen) {
        activeScreen.classList.remove('active');
        activeScreen.style.opacity = '0';
        activeScreen.style.transform = 'translateY(30px)';
        activeScreen.style.pointerEvents = 'none';

        setTimeout(() => {
            const targetScreen = document.getElementById(targetScreenId);
            targetScreen.classList.add('active');
            targetScreen.style.opacity = '1';
            targetScreen.style.transform = 'translateY(0)';
            targetScreen.style.pointerEvents = 'auto';
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top for long screens
        }, 350);
    } else {
        const targetScreen = document.getElementById(targetScreenId);
        targetScreen.classList.add('active');
        targetScreen.style.opacity = '1';
        targetScreen.style.transform = 'translateY(0)';
        targetScreen.style.pointerEvents = 'auto';
    }
}

// Start specific tool
function startToolFlow(toolId) {
    state.currentTool = decisionData[toolId];
    state.currentStep = 0;
    state.answers = [];

    // Pre-reset progress bar to zero
    elements.progressBar.style.width = '0%';

    renderQuestion();
    switchScreen('screen-flow');
}

// Render dynamic question
function renderQuestion() {
    const tool = state.currentTool;
    const step = state.currentStep;

    if (step >= tool.questions.length) {
        triggerResultProcess();
        return;
    }

    const question = tool.questions[step];

    // Fade out out-going question
    elements.questionContainer.classList.remove('fade-in');
    elements.questionContainer.classList.add('fade-out');

    setTimeout(() => {
        // Update Step Counter & Progress
        const currentStepHuman = step + 1;
        const totalSteps = tool.questions.length;
        elements.stepCounter.textContent = `Step ${currentStepHuman} of ${totalSteps}`;

        const progressPercentage = (step / totalSteps) * 100;
        elements.progressBar.style.width = `${progressPercentage}%`;

        // Update Text
        elements.questionText.textContent = question.text;
        elements.questionSubtext.textContent = question.subtext;

        // Render Options
        elements.optionsGrid.innerHTML = '';
        question.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span>${opt.label}</span>`;

            btn.addEventListener('click', () => {
                // UI feedback
                btn.style.borderColor = 'var(--neon-purple)';
                btn.style.boxShadow = '0 10px 25px rgba(157, 0, 255, 0.2)';
                btn.style.transform = 'scale(1.03) translateX(10px)';

                // Processing Delay
                setTimeout(() => handleOptionClick(opt.id), 350);
            });

            elements.optionsGrid.appendChild(btn);
        });

        // Fade in new question
        elements.questionContainer.classList.remove('fade-out');
        elements.questionContainer.classList.add('fade-in');
    }, 300);
}

function handleOptionClick(optionId) {
    state.answers.push(optionId);
    state.currentStep++;
    renderQuestion();
}

function triggerResultProcess() {
    const tool = state.currentTool;
    // Push progress to 100%
    elements.progressBar.style.width = '100%';
    elements.stepCounter.textContent = "Processing Results...";

    setTimeout(() => {
        const result = tool.getResult(state.answers);

        elements.resultTitle.textContent = result.title;

        let contentHTML = `
            <h3>Action Strategy</h3>
            <p>${result.desc}</p>
            <h3>Execution Steps</h3>
            <ul>
        `;
        result.list.forEach(item => { contentHTML += `<li>${item}</li>`; });
        contentHTML += `</ul>`;

        elements.resultContent.innerHTML = contentHTML;

        switchScreen('screen-result');
    }, 600); // 600ms fake loading simulation
}

function resetToHome() {
    state.currentTool = null;
    state.currentStep = 0;
    state.answers = [];
    switchScreen('screen-home');
}

// --- Event Listeners ---

// Tool Cards Setup
elements.toolCards.forEach(card => {
    card.addEventListener('click', () => {
        const toolId = card.getAttribute('data-tool');
        startToolFlow(toolId);
    });
});

// Routing Overrides
elements.btnHome.addEventListener('click', resetToHome);
elements.logoTrigger.addEventListener('click', resetToHome);
elements.btnFlowBack.addEventListener('click', resetToHome);
elements.btnResultBack.addEventListener('click', resetToHome);
elements.btnExplore.addEventListener('click', resetToHome);

elements.btnRestart.addEventListener('click', () => {
    if (state.currentTool) {
        startToolFlow(state.currentTool.id);
    } else {
        resetToHome();
    }
});

// Engine Initializer
const activeScreen = document.querySelector('.screen.active');
if (activeScreen) {
    activeScreen.style.opacity = '1';
    activeScreen.style.transform = 'translateY(0)';
    activeScreen.style.pointerEvents = 'auto';
}
