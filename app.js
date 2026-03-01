/* =========================================================================
   Smart Decision Lab Pro - Core Engine & Logic
   ========================================================================= */

// --- STATE MANAGEMENT (LocalStorage) ---
const STORAGE_KEY = 'sdl_history_v2';
const ONGOING_KEY = 'sdl_ongoing_v2';

function getHistory() { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
function saveHistory(data) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); }

function getOngoing() { return JSON.parse(localStorage.getItem(ONGOING_KEY)) || null; }
function saveOngoing(data) { localStorage.setItem(ONGOING_KEY, JSON.stringify(data)); }
function clearOngoing() { localStorage.removeItem(ONGOING_KEY); }

let state = {
    currentToolId: null,
    currentNode: null,
    answers: [],
    historyView: false
};

// --- DECISION LOGIC ENGINE (Advanced Node/Branching System) ---
const decisionGraph = {
    career: {
        id: "career", title: "Career Pathfinder", icon: "briefcase",
        startNode: "c1",
        nodes: {
            c1: {
                text: "Select your core area of interest:",
                subtext: "This filters the industry trajectory for your roadmap.",
                options: [
                    { label: "IT & Software Engineering", next: "c2_tech", val: 'tech' },
                    { label: "Business, Strategy & Management", next: "c2_biz", val: 'biz' },
                    { label: "Design & Creative Arts", next: "c2_des", val: 'des' },
                    { label: "Artificial Intelligence & Data", next: "c2_tech", val: 'ai' },
                    { label: "Finance & Economics", next: "c2_biz", val: 'fin' },
                    { label: "Marketing & Growth", next: "c2_biz", val: 'mkt' }
                ]
            },
            c2_tech: {
                text: "Which technical sector excites you most?",
                subtext: "Frontend, scalable backends, or intelligent systems?",
                options: [
                    { label: "Visual Interfaces (Frontend)", next: "c3", val: 'front' },
                    { label: "System Architecture (Backend)", next: "c3", val: 'back' },
                    { label: "Data Pipelines & AI Models", next: "c3", val: 'data' }
                ]
            },
            c2_biz: {
                text: "What drives you in a corporate environment?",
                subtext: "Leadership, scaling, or numbers?",
                options: [
                    { label: "Leading Teams & Strategy", next: "c3", val: 'lead' },
                    { label: "Growth & Customer Acquisition", next: "c3", val: 'growth' },
                    { label: "Financial Modeling & Analytics", next: "c3", val: 'analy' }
                ]
            },
            c2_des: {
                text: "What kind of visual problems do you like solving?",
                subtext: "UI/UX, Branding, or 3D?",
                options: [
                    { label: "Product & User Experience (UX/UI)", next: "c3", val: 'ux' },
                    { label: "Brand Identity & Graphic Design", next: "c3", val: 'brand' },
                    { label: "Motion Graphics & 3D", next: "c3", val: '3d' }
                ]
            },
            c3: {
                text: "What is your current skill level?",
                subtext: "Honesty ensures the most accurate roadmap.",
                options: [
                    { label: "Absolute Beginner", next: "c4", val: 'beg' },
                    { label: "Intermediate (Portfolio built)", next: "c4", val: 'int' },
                    { label: "Advanced Professional", next: "c4", val: 'adv' }
                ]
            },
            c4: {
                text: "What is your preferred work environment?",
                subtext: "Where do you thrive?",
                options: [
                    { label: "100% Remote / Async", next: "c5", val: 'rem' },
                    { label: "Hybrid (Mix of office and home)", next: "c5", val: 'hyb' },
                    { label: "On-site / Corporate Office", next: "c5", val: 'off' },
                    { label: "Independent Freelance", next: "c5", val: 'free' }
                ]
            },
            c5: {
                text: "How much time can you dedicate to learning?",
                subtext: "This defines the intensity of your roadmap.",
                options: [
                    { label: "1 - 3 Months (Crash Course)", next: "result", val: 'short' },
                    { label: "3 - 6 Months (Dedicated Phase)", next: "result", val: 'med' },
                    { label: "1+ Year (Deep Mastery)", next: "result", val: 'long' }
                ]
            }
        },
        calculateResult: (answers) => {
            const ind = answers[0]?.val;
            const sub = answers[1]?.val;
            const lvl = answers[2]?.val;
            const env = answers[3]?.val;

            let title = "Operations Professional";
            let desc = "A balanced path customized to your logical approach.";
            let roadmap = [];
            let score = Math.floor(Math.random() * 15) + 80; // 80-95%

            if (ind === 'tech' || ind === 'ai') {
                if (sub === 'front') { title = "Frontend Platform Engineer"; roadmap = ["Master React & Next.js", "Study Advanced CSS & Animations", "Build accessible component libraries"]; }
                else if (sub === 'data') { title = "AI / Data Engineer"; roadmap = ["Deep dive into Python & SQL", "Understand Machine Learning basics", "Deploy an AI-wrapper micro-SaaS"]; }
                else { title = "Backend Systems Architect"; roadmap = ["Learn Go, Rust, or Node.js", "Master Cloud Infra (AWS/GCP)", "Understand distributed system design"]; }
            } else if (ind === 'des') {
                title = "Senior Product Designer";
                roadmap = ["Master Figma & Prototyping", "Study behavioral psychology in UX", "Build 3 massive case studies"];
            } else {
                title = "Strategic Growth Manager";
                roadmap = ["Learn cross-functional Agile methods", "Master analytical software (GA4, Mixpanel)", "Optimize team communication flows"];
            }

            if (lvl === 'beg') roadmap.unshift("Start with structured fundamental courses (Udemy/Coursera).");
            desc = `Based on your preference for ${env === 'rem' ? 'remote' : 'structured'} work environments, the role of ${title} aligns perfectly with your goals.`;

            return { title, desc, roadmap, score };
        }
    },
    skill: {
        id: "skill", title: "Skill Architecture", icon: "code-block",
        startNode: "s1",
        nodes: {
            s1: {
                text: "Which supercategory do you want to learn?",
                options: [
                    { label: "Deep Technology (Code, Cloud)", next: "s2", val: 'tech' },
                    { label: "Creative Media (Design, Video, 3D)", next: "s2", val: 'art' },
                    { label: "Business & Sales (Marketing)", next: "s2", val: 'biz' },
                    { label: "Soft Skills & Negotiation", next: "s2", val: 'soft' }
                ]
            },
            s2: {
                text: "How much time can you invest weekly?",
                options: [
                    { label: "1 - 5 hours (Weekend hustle)", next: "s3", val: 'low' },
                    { label: "5 - 15 hours (Consistent part-time)", next: "s3", val: 'med' },
                    { label: "20+ hours (Full immersion)", next: "s3", val: 'high' }
                ]
            },
            s3: {
                text: "What is your preferred method of learning?",
                options: [
                    { label: "100% Online (Self-paced, YouTube, Docs)", next: "result", val: 'online' },
                    { label: "Offline (In-person, Workshops)", next: "result", val: 'offline' },
                    { label: "Hybrid / Live Cohort-based Learning", next: "result", val: 'cohort' }
                ]
            }
        },
        calculateResult: (answers) => {
            const cat = answers[0]?.val;
            const time = answers[1]?.val;
            const score = Math.floor(Math.random() * 10) + 85;

            let title = "High-Income Skill Acquisition";
            let roadmap = [];

            if (cat === 'tech') { title = "Full-Stack Development Sprint"; roadmap = ["Learn terminal basics and Git", "Build 5 functional MVPs", "Contribute to open source"]; }
            if (cat === 'art') { title = "Advanced Visual Design"; roadmap = ["Learn design fundamentals via books", "Copy top Dribbble shots daily", "Build an interactive portfolio"]; }
            if (cat === 'biz') { title = "B2B Sales Architecture"; roadmap = ["Learn cold email frameworks", "Master CRM software", "Practice objection handling patterns"]; }

            if (time === 'high') roadmap.push("Given your high availability, aim to ship a project every 2 weeks.");

            return { title, desc: "A structural approach to mastering your selected vertical. Speed requires consistency.", roadmap, score };
        }
    },
    business: {
        id: "business", title: "Startup Simulator", icon: "rocket-launch",
        startNode: "b1",
        nodes: {
            b1: {
                text: "What is your accessible starting budget?",
                options: [
                    { label: "$0 (Pure Bootstrap / Sweat Equity)", next: "b2", val: '0' },
                    { label: "$100 - $1,000 (Lean MVP)", next: "b2", val: 'low' },
                    { label: "$1,000 - $10,000 (Setup & Ads)", next: "b2", val: 'med' },
                    { label: "$10,000+ (Aggressive Scaling)", next: "b2", val: 'high' }
                ]
            },
            b2: {
                text: "Where do you want to operate?",
                options: [
                    { label: "100% Online / Digital Products / SaaS", next: "b3", val: 'online' },
                    { label: "Local Market / Physical Services", next: "b3", val: 'local' },
                    { label: "Hybrid (Local physical / Global digital)", next: "b3", val: 'hyb' }
                ]
            },
            b3: {
                text: "What is the ultimate ambition?",
                options: [
                    { label: "Automated Side Income ($1k-$3k/mo)", next: "result", val: 'side' },
                    { label: "Replace Full-time Job ($5k-$10k/mo)", next: "result", val: 'job' },
                    { label: "Highly Scalable Startup (Exit potential)", next: "result", val: 'scale' }
                ]
            }
        },
        calculateResult: (answers) => {
            const bud = answers[0]?.val;
            const op = answers[1]?.val;
            const amb = answers[2]?.val;
            let score = Math.floor(Math.random() * 20) + 75; // 75-95%

            let title = "Hybrid Service Business";
            let roadmap = ["Create a landing page", "Run local ads", "Hire contractors"];

            if (op === 'online') {
                if (amb === 'scale') { title = "Micro-SaaS & AI Tool Hub"; roadmap = ["Find a niche B2B problem", "Build a wrapped AI solution (MVP)", "Launch on Product Hunt", "Utilize subscription pricing"]; }
                else { title = "Digital Agency / Info-Product"; roadmap = ["Create high-ticket digital guides", "Build an automated funnel", "Offer done-for-you services"]; }
            } else if (op === 'local') {
                title = "Local High-Margin Service Arbitrage";
                roadmap = ["Launch modern booking site", "Hire verified contractors", "Run localized FB/Google Ads"];
            }
            if (bud === '0') roadmap.unshift("Rely entirely on cold-outreach and organic content marketing.");

            return { title, desc: "This business model fits your budget constraints and operational preferences safely.", roadmap, score };
        }
    },
    study: {
        id: "study", title: "Study Protocol", icon: "book-open-text",
        startNode: "st1",
        nodes: {
            st1: {
                text: "What is your primary study objective?",
                options: [
                    { label: "Daily Routine Maintenance", next: "st2", val: 'daily' },
                    { label: "Intense Exam Prep Mode", next: "st2", val: 'exam' },
                    { label: "Deep Focus Session Planner", next: "st2", val: 'focus' },
                    { label: "Long-term Goal Tracking", next: "st2", val: 'goal' }
                ]
            },
            st2: {
                text: "How do you prefer segmenting focus time?",
                options: [
                    { label: "Short bursts (Pomodoro 25m/5m)", next: "st3", val: 'pom' },
                    { label: "Deep continuous chunks (90m-120m)", next: "st3", val: 'deep' },
                    { label: "Flexible, outcome-based blocks", next: "st3", val: 'flex' }
                ]
            },
            st3: {
                text: "Identify your biological prime time:",
                options: [
                    { label: "Early Bird (5 AM - 9 AM)", next: "result", val: 'morn' },
                    { label: "Afternoon Hustler (1 PM - 5 PM)", next: "result", val: 'aft' },
                    { label: "Night Owl (10 PM Onwards)", next: "result", val: 'night' }
                ]
            }
        },
        calculateResult: (answers) => {
            const obj = answers[0]?.val;
            let score = Math.floor(Math.random() * 15) + 85;
            let title = "The Balanced Flow Routine";
            let roadmap = ["Block heavy tasks for your prime time", "Use outcome-based targets", "Review progress weekly"];

            if (obj === 'exam') { title = "High-Intensity Exam Sprint"; roadmap = ["Use active recall and spaced repetition", "Block 4 hours per day minimum", "Take raw mock tests under constraints"]; }
            if (obj === 'focus') { title = "Monastic Focus Protocol"; roadmap = ["Disable all UX notifications via blockers", "Define 1 specific outcome pre-session", "Use binaural beats / white noise"]; }
            if (obj === 'goal') { title = "Milestone Tracker Architecture"; roadmap = ["Break macro goal into 12-week micro-sprints", "Review metrics every Sunday", "Never skip two days rule"]; }

            return { title, desc: "A neuroscience-backed approach to restructuring your attention and memory retention.", roadmap, score };
        }
    }
};

// --- DOM ELEMENTS ---
const elements = {
    // Navigation
    navItems: document.querySelectorAll('.nav-item'),
    screens: document.querySelectorAll('.screen'),
    sidebar: document.querySelector('.sidebar'),
    logo: document.querySelector('.logo'),

    // Tools UI
    toolCards: document.querySelectorAll('.tool-card'),
    btnFlowBack: document.getElementById('btn-flow-back'),
    btnSaveLater: document.getElementById('btn-save-later'),

    // Flow Engine UI
    stepCounter: document.getElementById('step-counter'),
    progressBar: document.getElementById('flow-progress'),
    questionContainer: document.getElementById('question-container'),
    questionText: document.getElementById('question-text'),
    questionSubtext: document.getElementById('question-subtext'),
    optionsGrid: document.getElementById('options-grid'),

    // Result UI
    btnResultBack: document.getElementById('btn-result-back'),
    btnSaveResult: document.getElementById('btn-save-result'),
    btnRestart: document.getElementById('btn-restart-tool'),
    btnExplore: document.getElementById('btn-explore-others'),
    resultBadge: document.getElementById('result-badge-tag'),
    resultTitle: document.getElementById('result-title'),
    resultContent: document.getElementById('result-content'),
    resultScoreText: document.getElementById('result-score-text'),
    resultScoreCircle: document.getElementById('result-score-circle'),
    roadmapSteps: document.getElementById('roadmap-steps'),

    // Dashboard / History / Tracker
    dashScores: document.getElementById('dashboard-scores'),
    dashRecentList: document.getElementById('dashboard-recent-list'),
    continueWidget: document.getElementById('continue-widget'),
    continueText: document.getElementById('continue-text'),
    btnResume: document.getElementById('btn-resume'),
    btnViewAllHistory: document.getElementById('btn-view-all-history'),
    historyGrid: document.getElementById('history-grid'),
    growthTimeline: document.getElementById('growth-timeline'),
    btnClearHistory: document.getElementById('btn-clear-history'),

    // Search & Theme
    themeToggle: document.getElementById('theme-toggle'),
    searchInput: document.getElementById('global-search'),
    searchResults: document.getElementById('search-results')
};

let currentResultTemp = null; // Holds the result before saving

// --- NAVIGATION LOGIC ---
function switchScreen(targetId) {
    elements.screens.forEach(s => {
        s.classList.remove('active');
        s.style.opacity = '0';
        s.style.transform = 'translateY(20px)';
        s.style.pointerEvents = 'none';

        // Only remove 'active' from nav buttons if transitioning to a standard screen
        if (document.querySelector(`.nav-item[data-target="${targetId}"]`)) {
            elements.navItems.forEach(n => n.classList.remove('active'));
        }
    });

    setTimeout(() => {
        const targetScreen = document.getElementById(targetId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            targetScreen.style.opacity = '1';
            targetScreen.style.transform = 'translateY(0)';
            targetScreen.style.pointerEvents = 'auto';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Activate corresponding nav item
        const navBtn = document.querySelector(`.nav-item[data-target="${targetId}"]`);
        if (navBtn) navBtn.classList.add('active');

        // Refresh Data if Dashboard, History, Tracker
        if (targetId === 'screen-dashboard') loadDashboard();
        if (targetId === 'screen-history') loadHistory();
        if (targetId === 'screen-tracker') loadTracker();

    }, 300);
}

elements.navItems.forEach(item => {
    item.addEventListener('click', () => {
        const target = item.getAttribute('data-target');
        switchScreen(target);
    });
});
elements.logo.addEventListener('click', () => switchScreen('screen-dashboard'));

// --- THEME & SEARCH ---
elements.themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    document.documentElement.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});

elements.searchInput.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length === 0) {
        elements.searchResults.classList.add('hidden');
        return;
    }

    elements.searchResults.innerHTML = '';
    const items = [
        { name: 'Career Pathfinder', icon: 'briefcase', action: () => forceStartTool('career') },
        { name: 'Skill Architecture', icon: 'code-block', action: () => forceStartTool('skill') },
        { name: 'Startup Simulator', icon: 'rocket-launch', action: () => forceStartTool('business') },
        { name: 'Study Protocol', icon: 'book-open-text', action: () => forceStartTool('study') }
    ];

    const matches = items.filter(i => i.name.toLowerCase().includes(q));

    if (matches.length === 0) {
        elements.searchResults.innerHTML = '<div class="empty-state">No matches found.</div>';
    } else {
        matches.forEach(m => {
            const div = document.createElement('div');
            div.className = 'search-item';
            div.innerHTML = `<i class="ph ph-${m.icon}"></i> <span>${m.name}</span>`;
            div.onclick = () => {
                elements.searchResults.classList.add('hidden');
                elements.searchInput.value = '';
                m.action();
            };
            elements.searchResults.appendChild(div);
        });
    }
    elements.searchResults.classList.remove('hidden');
});

document.addEventListener('click', (e) => {
    if (!elements.searchInput.contains(e.target) && !elements.searchResults.contains(e.target)) {
        elements.searchResults.classList.add('hidden');
    }
});

// --- TOOL ENGINE LOGIC ---
function forceStartTool(id) {
    if (!decisionGraph[id]) return;
    initFlow(id, decisionGraph[id].startNode, []);
}

elements.toolCards.forEach(card => {
    card.addEventListener('click', () => {
        const toolId = card.getAttribute('data-tool');
        initFlow(toolId, decisionGraph[toolId].startNode, []);
    });
});

function initFlow(toolId, nodeId, answersArr) {
    state.currentToolId = toolId;
    state.currentNode = nodeId;
    state.answers = answersArr;

    // Initialize UI
    elements.progressBar.style.width = '0%';
    elements.btnSaveLater.classList.remove('hidden');

    renderNode();
    switchScreen('screen-flow');
}

function renderNode() {
    const tool = decisionGraph[state.currentToolId];

    // Check if result
    if (state.currentNode === 'result') {
        processResult();
        return;
    }

    const node = tool.nodes[state.currentNode];

    elements.questionContainer.classList.remove('fade-in');
    elements.questionContainer.classList.add('fade-out');

    setTimeout(() => {
        // Compute pseudo progress based on answer length relative to expected length (avg 3-5)
        let percent = Math.min((state.answers.length / 4) * 100, 95);
        elements.progressBar.style.width = `${percent}%`;
        elements.stepCounter.textContent = `${Math.floor(percent)}% Complete`;

        elements.questionText.textContent = node.text;
        elements.questionSubtext.textContent = node.subtext || "Select the most accurate option.";

        elements.optionsGrid.innerHTML = '';
        node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = `<span>${opt.label}</span> <i class="ph ph-arrow-right"></i>`;

            btn.addEventListener('click', () => {
                btn.style.borderColor = 'var(--neon-purple)';
                btn.style.boxShadow = '0 10px 25px rgba(157, 0, 255, 0.2)';
                btn.style.transform = 'scale(1.02) translateX(8px)';

                setTimeout(() => handleOptionSelect(opt), 300);
            });
            elements.optionsGrid.appendChild(btn);
        });

        elements.questionContainer.classList.remove('fade-out');
        elements.questionContainer.classList.add('fade-in');
    }, 300);
}

function handleOptionSelect(option) {
    // Save answer payload
    state.answers.push({ val: option.val, label: option.label });
    state.currentNode = option.next;

    // Auto-save ongoing transparently
    saveOngoing({
        toolId: state.currentToolId,
        nodeId: state.currentNode,
        answers: state.answers,
        timestamp: new Date().getTime()
    });

    renderNode();
}

// Result Compilation
function processResult() {
    clearOngoing(); // Completed flow
    elements.progressBar.style.width = '100%';
    elements.stepCounter.textContent = "Processing Insights...";

    const tool = decisionGraph[state.currentToolId];
    setTimeout(() => {
        const resultDict = tool.calculateResult(state.answers);

        currentResultTemp = {
            id: Date.now().toString(),
            toolId: state.currentToolId,
            toolName: tool.title,
            title: resultDict.title,
            desc: resultDict.desc,
            roadmap: resultDict.roadmap,
            score: resultDict.score,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };

        // Render Result UI
        elements.resultBadge.textContent = tool.title + " Analysis";
        elements.resultTitle.textContent = currentResultTemp.title;
        elements.resultContent.innerHTML = `<h3 style="margin-bottom:10px;"><i class="ph ph-brain"></i> Context </h3><p>${currentResultTemp.desc}</p>`;

        // Build Roadmap
        elements.roadmapSteps.innerHTML = '';
        currentResultTemp.roadmap.forEach((step, index) => {
            const div = document.createElement('div');
            div.className = 'road-step';
            div.innerHTML = `<div class="step-num">${index + 1}</div><div class="step-desc">${step}</div>`;
            elements.roadmapSteps.appendChild(div);
        });

        // Animate Circle Score
        elements.resultScoreText.textContent = "0%";
        elements.resultScoreCircle.style.strokeDasharray = `0, 100`;

        // Reset Buttons
        elements.btnSaveResult.classList.remove('hidden');
        elements.btnSaveResult.innerHTML = '<i class="ph ph-bookmark-simple"></i> Save to Tracker';
        elements.btnSaveResult.disabled = false;

        switchScreen('screen-result');

        // Delay score animation
        setTimeout(() => {
            elements.resultScoreCircle.style.strokeDasharray = `${currentResultTemp.score}, 100`;
            animateCounter(elements.resultScoreText, currentResultTemp.score, "%");
        }, 500);

    }, 800);
}

// Save & Continue Action
elements.btnSaveLater.addEventListener('click', () => {
    saveOngoing({
        toolId: state.currentToolId,
        nodeId: state.currentNode,
        answers: state.answers,
        timestamp: new Date().getTime()
    });
    switchScreen('screen-dashboard');
});

elements.btnResume.addEventListener('click', () => {
    const ongoing = getOngoing();
    if (ongoing) initFlow(ongoing.toolId, ongoing.nodeId, ongoing.answers);
});

// Action Handlers
elements.btnFlowBack.addEventListener('click', () => switchScreen('screen-tools'));
elements.btnResultBack.addEventListener('click', () => switchScreen('screen-dashboard'));
elements.btnExplore.addEventListener('click', () => switchScreen('screen-tools'));
elements.btnRestart.addEventListener('click', () => forceStartTool(state.currentToolId));

elements.btnSaveResult.addEventListener('click', () => {
    if (!currentResultTemp) return;
    const history = getHistory();
    history.unshift(currentResultTemp);
    saveHistory(history);

    // UI Feedback
    elements.btnSaveResult.innerHTML = '<i class="ph ph-check-circle"></i> Saved!';
    elements.btnSaveResult.disabled = true;
});


// --- DASHBOARD, TRACKER & HISTORY POPULATION ---

function loadDashboard() {
    const history = getHistory();
    const ongoing = getOngoing();

    // Ongoing Widget
    if (ongoing && ongoing.nodeId !== 'result') {
        const t = decisionGraph[ongoing.toolId];
        elements.continueText.innerHTML = `You have an active session in <strong>${t?.title}</strong>.`;
        elements.btnResume.classList.remove('hidden');
    } else {
        elements.continueText.textContent = "No active sessions. Start a new tool.";
        elements.btnResume.classList.add('hidden');
    }

    // Recent Widget
    elements.dashRecentList.innerHTML = '';
    if (history.length === 0) {
        elements.dashRecentList.innerHTML = '<p class="empty-state">Complete a tool to generate AI insights.</p>';
    } else {
        history.slice(0, 3).forEach(item => {
            const div = document.createElement('div');
            div.className = 'recent-item';
            div.innerHTML = `
                <div class="recent-info">
                    <h4>${item.title}</h4>
                    <p>${item.toolName} • ${item.date}</p>
                </div>
                <div class="score-pill">${item.score}% Match</div>
            `;
            elements.dashRecentList.appendChild(div);
        });
    }

    // Calculate core scores
    if (history.length > 0) {
        let careerScore = 0, careerCount = 0;
        let prodScore = 0, prodCount = 0;

        history.forEach(item => {
            if (item.toolId === 'career' || item.toolId === 'business') { careerScore += item.score; careerCount++; }
            if (item.toolId === 'study' || item.toolId === 'skill') { prodScore += item.score; prodCount++; }
        });

        const cAvg = careerCount > 0 ? Math.round(careerScore / careerCount) : 0;
        const pAvg = prodCount > 0 ? Math.round(prodScore / prodCount) : 0;

        document.querySelector('.cyan .circle').style.strokeDasharray = `${cAvg}, 100`;
        document.querySelector('.cyan .percentage').textContent = `${cAvg}%`;

        document.querySelector('.purple .circle').style.strokeDasharray = `${pAvg}, 100`;
        document.querySelector('.purple .percentage').textContent = `${pAvg}%`;
    } else {
        document.querySelector('.cyan .circle').style.strokeDasharray = `0, 100`;
        document.querySelector('.cyan .percentage').textContent = `0%`;
        document.querySelector('.purple .circle').style.strokeDasharray = `0, 100`;
        document.querySelector('.purple .percentage').textContent = `0%`;
    }
}

function loadHistory() {
    const history = getHistory();
    elements.historyGrid.innerHTML = '';

    if (history.length === 0) {
        elements.historyGrid.innerHTML = '<div class="empty-state">Archive is empty. Save results to view them here.</div>';
        return;
    }

    history.forEach(item => {
        const card = document.createElement('div');
        card.className = 'history-card glass-panel hover-glow';
        card.innerHTML = `
            <div class="hist-tool">${item.toolName}</div>
            <div class="hist-title">${item.title}</div>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${item.date}</p>
            <div class="hist-score">${item.score}%</div>
        `;
        // Attach click to purely view roadmap
        card.onclick = () => {
            currentResultTemp = item;
            // Reuse result screen visually but hide save button
            elements.resultBadge.textContent = "Archived Result";
            elements.resultTitle.textContent = item.title;
            elements.resultContent.innerHTML = `<h3 style="margin-bottom:10px;"><i class="ph ph-brain"></i> Context </h3><p>${item.desc}</p>`;
            elements.roadmapSteps.innerHTML = '';
            item.roadmap.forEach((step, index) => {
                const div = document.createElement('div');
                div.className = 'road-step';
                div.innerHTML = `<div class="step-num">${index + 1}</div><div class="step-desc">${step}</div>`;
                elements.roadmapSteps.appendChild(div);
            });
            elements.resultScoreCircle.style.strokeDasharray = `${item.score}, 100`;
            elements.resultScoreText.textContent = `${item.score}%`;
            elements.btnSaveResult.classList.add('hidden');
            switchScreen('screen-result');
        };
        elements.historyGrid.appendChild(card);
    });
}

function loadTracker() {
    const history = getHistory();
    elements.growthTimeline.innerHTML = '';

    if (history.length === 0) {
        elements.growthTimeline.innerHTML = '<div class="empty-state">Your timeline is empty. Make a decision to kickstart growth.</div>';
        return;
    }

    history.forEach(item => {
        const node = document.createElement('div');
        node.className = 'time-node';
        node.innerHTML = `
            <div class="time-dot"></div>
            <div class="time-content glass-panel">
                <div class="time-date">${item.date}</div>
                <div class="time-title">${item.title} Tracker Init</div>
                <div class="time-desc">Milestones defined for: ${item.toolName.toLowerCase()}. Score optimized at ${item.score}%.</div>
            </div>
        `;
        elements.growthTimeline.appendChild(node);
    });
}

elements.btnClearHistory.addEventListener('click', () => {
    if (confirm("Are you sure you want to delete all historical tracking data?")) {
        localStorage.removeItem(STORAGE_KEY);
        loadHistory();
        loadTracker();
        loadDashboard();
    }
});
elements.btnViewAllHistory.addEventListener('click', () => switchScreen('screen-history'));

// Utils
function animateCounter(element, target, suffixStr) {
    let start = 0;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / target)) || 10;

    let timer = setInterval(() => {
        start += 1;
        element.textContent = start + suffixStr;
        if (start >= target) clearInterval(timer);
    }, stepTime);
}

// Initializer
document.addEventListener('DOMContentLoaded', () => {
    const activeScreen = document.querySelector('.screen.active');
    if (activeScreen) {
        activeScreen.style.opacity = '1';
        activeScreen.style.transform = 'translateY(0)';
        activeScreen.style.pointerEvents = 'auto';
    }
    loadDashboard();
});
