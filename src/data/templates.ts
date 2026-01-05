/**
 * Production Template Registry
 *
 * Contains 15 fully-hydrated, production-ready templates.
 * Each template renders immediately without user configuration.
 */

import type {
    Template,
    Section,
    SectionType,
    HeroSection,
    AboutSection,
    TechStackSection,
    GitHubStatsSection,
    ProjectsSection,
    SocialsSection,
    TechCategory,
    SocialPlatform,
    ProjectStatus,
    GitHubStatsCardType,
} from "@/types";

import {
    createTemplateId,
    createSectionId,
    createGitHubUsername,
    createUrlString,
    createISODateString,
    createHexColor,
    DEFAULT_SECTION_CONFIG,
    DEFAULT_TEMPLATE_CAPABILITIES,
} from "@/types";

// ============================================================================
// TEMPLATE REGISTRY TYPES
// ============================================================================

export interface TemplateRegistryItem {
    id: string;
    slug: string;
    name: string;
    description: string;
    category: "professional" | "creative" | "developer" | "minimal" | "academic" | "data-driven" | "animated" | "portfolio";
    persona: string;
    previewImage: string;
    featured: boolean;
    animationLevel: "none" | "subtle" | "animated";
    template: Template;
}

// ============================================================================
// SECTION ID GENERATOR
// ============================================================================

let sectionIdCounter = 0;
const generateSectionId = (type: string): string => {
    sectionIdCounter++;
    return createSectionId(`${type}-${sectionIdCounter.toString().padStart(4, "0")}`) as unknown as string;
};

// Reset counter for consistent IDs
const resetSectionIdCounter = () => {
    sectionIdCounter = 0;
};

// ============================================================================
// SHARED SECTION BUILDERS
// ============================================================================

const createHeroSection = (
    headline: string,
    subheadline: string | undefined,
    typingTexts: readonly string[] | undefined,
    order: number = 0
): HeroSection => ({
    id: createSectionId(generateSectionId("hero")),
    type: "hero",
    enabled: true,
    order,
    config: {
        ...DEFAULT_SECTION_CONFIG,
        layout: typingTexts ? "animated" : "centered",
        headlineSize: "xl",
        animateOnLoad: !!typingTexts,
        typingSpeed: 80,
        typingDeleteSpeed: 40,
        typingPauseTime: 1500,
    },
    data: {
        headline,
        subheadline,
        typingTexts,
        showWaveAnimation: true,
    },
});

const createAboutSection = (
    content: string,
    highlights: readonly string[],
    currentFocus?: string,
    order: number = 1
): AboutSection => ({
    id: createSectionId(generateSectionId("about")),
    type: "about",
    enabled: true,
    order,
    title: "About Me",
    config: {
        ...DEFAULT_SECTION_CONFIG,
        showAvatar: false,
        avatarPosition: "left",
        avatarSize: "md",
        showHighlightsAsBullets: true,
    },
    data: {
        content,
        highlights,
        currentFocus,
    },
});

const createTechStackSection = (
    items: Array<{ name: string; category: TechCategory }>,
    order: number = 2
): TechStackSection => ({
    id: createSectionId(generateSectionId("tech")),
    type: "tech-stack",
    enabled: true,
    order,
    title: "Tech Stack",
    config: {
        ...DEFAULT_SECTION_CONFIG,
        displayStyle: "badges",
        columns: 4,
        showProficiency: false,
        showCategoryHeaders: false,
        iconSize: "md",
        badgeStyle: "for-the-badge",
        animateOnHover: true,
    },
    data: {
        items: items.map((item) => ({
            name: item.name,
            category: item.category,
            proficiency: "advanced" as const,
        })),
        groupByCategory: false,
    },
});

const createGitHubStatsSection = (
    cards: readonly GitHubStatsCardType[],
    order: number = 3
): GitHubStatsSection => ({
    id: createSectionId(generateSectionId("stats")),
    type: "github-stats",
    enabled: true,
    order,
    title: "GitHub Stats",
    config: {
        ...DEFAULT_SECTION_CONFIG,
        theme: "github",
        showIcons: true,
        includeAllCommits: true,
        countPrivateContributions: true,
        hideBorder: false,
        cardLayout: "row",
        cardSize: "md",
    },
    data: {
        username: createGitHubUsername("your-github-username"),
        cards,
    },
});

const createProjectsSection = (
    items: Array<{
        name: string;
        description: string;
        techStack: readonly string[];
        type: string;
    }>,
    order: number = 4
): ProjectsSection => ({
    id: createSectionId(generateSectionId("projects")),
    type: "projects",
    enabled: true,
    order,
    title: "Featured Projects",
    config: {
        ...DEFAULT_SECTION_CONFIG,
        displayStyle: "cards",
        columns: 2,
        showTechStack: true,
        showStatus: false,
        showStats: false,
        showImage: false,
        imagePosition: "top",
        maxProjects: 4,
    },
    data: {
        items: items.map((item) => ({
            name: item.name,
            description: item.description,
            techStack: item.techStack,
            status: "active" as ProjectStatus,
            featured: true,
        })),
        showFeaturedOnly: false,
    },
});

const createSocialsSection = (
    platforms: readonly SocialPlatform[],
    order: number = 5
): SocialsSection => ({
    id: createSectionId(generateSectionId("socials")),
    type: "socials",
    enabled: true,
    order,
    title: "Connect With Me",
    config: {
        ...DEFAULT_SECTION_CONFIG,
        displayStyle: "badges",
        iconSize: "md",
        showLabels: true,
        colorMode: "brand",
        hoverEffect: "lift",
    },
    data: {
        links: platforms.map((platform) => ({
            platform,
            url: createUrlString(
                platform === "email"
                    ? "mailto:hello@example.com"
                    : platform === "github"
                        ? "https://github.com/your-username"
                        : platform === "linkedin"
                            ? "https://linkedin.com/in/your-username"
                            : platform === "twitter"
                                ? "https://twitter.com/your-username"
                                : `https://${platform}.com/your-username`
            ),
        })),
    },
});

// ============================================================================
// TEMPLATE BUILDER
// ============================================================================

const createTemplate = (
    id: string,
    name: string,
    description: string,
    category: "developer" | "minimal" | "creative" | "professional" | "academic" | "data-driven" | "animated" | "portfolio",
    sections: Section[],
    supportedSections: SectionType[],
    animationsEnabled: boolean = true
): Template => ({
    metadata: {
        id: createTemplateId(id),
        name,
        description,
        category: category as "minimal" | "professional" | "creative" | "developer" | "animated" | "data-driven" | "portfolio" | "academic",
        tags: [category, "github-profile", "readme"],
        author: { name: "GitHub Profile Studio" },
        version: { major: 1, minor: 0, patch: 0 },
        featured: true,
        premium: false,
        complexity: category === "minimal" ? "beginner" : "intermediate",
        estimatedSetupTime: 5,
        thumbnail: createUrlString(`/templates/${id}.png`),
        timestamps: {
            createdAt: createISODateString("2025-01-01T00:00:00Z"),
            updatedAt: createISODateString("2025-01-04T00:00:00Z"),
        },
    },
    layout: {
        direction: "vertical",
        slots: sections.map((s, i) => ({
            sectionId: s.id as unknown as string,
            required: i < 3,
            order: i,
        })),
        maxWidth: "lg",
        containerStyle: "centered",
        headerPosition: "none",
        footerEnabled: false,
    },
    styles: {
        fonts: {
            heading: { family: "Inter", fallback: "system-ui, sans-serif", weights: [600, 700] },
            body: { family: "Inter", fallback: "system-ui, sans-serif", weights: [400, 500] },
            mono: { family: "JetBrains Mono", fallback: "monospace", weights: [400, 500] },
        },
        themes: {
            light: {
                mode: "light",
                colors: {
                    primary: createHexColor("#0969da"),
                    secondary: createHexColor("#6e7781"),
                    accent: createHexColor("#8250df"),
                    background: createHexColor("#ffffff"),
                    surface: createHexColor("#f6f8fa"),
                    text: createHexColor("#1f2328"),
                    textMuted: createHexColor("#656d76"),
                    border: createHexColor("#d0d7de"),
                    success: createHexColor("#1a7f37"),
                    warning: createHexColor("#9a6700"),
                    error: createHexColor("#cf222e"),
                },
            },
            dark: {
                mode: "dark",
                colors: {
                    primary: createHexColor("#2f81f7"),
                    secondary: createHexColor("#8b949e"),
                    accent: createHexColor("#a371f7"),
                    background: createHexColor("#0d1117"),
                    surface: createHexColor("#161b22"),
                    text: createHexColor("#e6edf3"),
                    textMuted: createHexColor("#8b949e"),
                    border: createHexColor("#30363d"),
                    success: createHexColor("#3fb950"),
                    warning: createHexColor("#d29922"),
                    error: createHexColor("#f85149"),
                },
            },
        },
        defaultTheme: "system",
        spacing: { sectionGap: "6", contentPadding: "4" },
        borders: { radius: "md", width: 1, style: "solid" },
        shadows: { enabled: true, intensity: "subtle" },
        animations: {
            enabled: animationsEnabled,
            reducedMotion: true,
            defaultDuration: 300,
        },
    },
    capabilities: {
        ...DEFAULT_TEMPLATE_CAPABILITIES,
        supportsAnimations: animationsEnabled,
        supportedSections,
        maxSections: 12,
        allowCustomSections: true,
        supportsGitHubStats: true,
        supportsDarkMode: true,
    },
    defaults: {
        sectionOrder: sections.map((s) => s.type),
        defaultEnabledSections: sections.map((s) => s.type),
        sectionConfigs: {},
    },
    sections,
});

// ============================================================================
// TEMPLATE 1: STUDENT BEGINNER
// ============================================================================

resetSectionIdCounter();
const studentBeginnerTemplate: TemplateRegistryItem = {
    id: "student-beginner",
    slug: "student-beginner",
    name: "Student Starter",
    description: "Welcoming template for CS students and bootcamp grads showcasing learning journey",
    category: "developer",
    persona: "Student / Beginner",
    previewImage: "/templates/student-beginner.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "student-beginner",
        "Student Starter",
        "Perfect for students beginning their development journey",
        "developer",
        [
            createHeroSection(
                "Hi there! 👋 I'm a CS Student",
                "Aspiring Software Developer",
                ["Learning to code", "Building cool projects", "Open to opportunities"]
            ),
            createAboutSection(
                "Third-year Computer Science student passionate about web development and machine learning. Currently building projects to strengthen my full-stack skills. Active member of the university coding club and always looking to collaborate on beginner-friendly open source.",
                [
                    "🎓 Computer Science Major",
                    "💻 Learning full-stack development",
                    "🌱 Growing through open source",
                    "🤝 Looking for internship opportunities",
                ]
            ),
            createTechStackSection([
                { name: "JavaScript", category: "language" },
                { name: "Python", category: "language" },
                { name: "HTML", category: "frontend" },
                { name: "CSS", category: "frontend" },
                { name: "React", category: "frontend" },
                { name: "Node.js", category: "backend" },
                { name: "Git", category: "tools" },
                { name: "MongoDB", category: "database" },
            ]),
            createGitHubStatsSection(["stats", "streak"]),
            createProjectsSection([
                {
                    name: "Task Tracker",
                    description: "A React-based todo app with drag-and-drop and local storage",
                    techStack: ["React", "CSS", "LocalStorage"],
                    type: "Web App",
                },
                {
                    name: "Weather Dashboard",
                    description: "Real-time weather app using OpenWeather API",
                    techStack: ["JavaScript", "API", "HTML"],
                    type: "Web App",
                },
                {
                    name: "Study Timer",
                    description: "Pomodoro timer with productivity statistics",
                    techStack: ["React", "TypeScript"],
                    type: "Web App",
                },
            ]),
            createSocialsSection(["github", "linkedin", "email"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 2: FRONTEND DEVELOPER
// ============================================================================

resetSectionIdCounter();
const frontendDeveloperTemplate: TemplateRegistryItem = {
    id: "frontend-developer",
    slug: "frontend-developer",
    name: "Frontend Pro",
    description: "Modern UI-focused template with design system showcase and animations",
    category: "professional",
    persona: "Frontend Developer",
    previewImage: "/templates/frontend-developer.png",
    featured: true,
    animationLevel: "animated",
    template: createTemplate(
        "frontend-developer",
        "Frontend Pro",
        "Showcase your UI/UX skills with this modern template",
        "developer",
        [
            createHeroSection(
                "Frontend Developer",
                "React & TypeScript Specialist",
                ["Crafting pixel-perfect UIs", "React & TypeScript enthusiast", "Design system architect"]
            ),
            createAboutSection(
                "Frontend developer with 5 years of experience building responsive, accessible web applications. I specialize in React, TypeScript, and modern CSS. Passionate about design systems, performance optimization, and creating delightful user experiences.",
                [
                    "⚡ Performance optimization expert",
                    "🎨 Strong design sensibility",
                    "♿ Accessibility advocate",
                    "📱 Mobile-first approach",
                ],
                "Exploring Next.js 14 and server components"
            ),
            createTechStackSection([
                { name: "TypeScript", category: "language" },
                { name: "JavaScript", category: "language" },
                { name: "React", category: "frontend" },
                { name: "Next.js", category: "frontend" },
                { name: "Vue", category: "frontend" },
                { name: "Tailwind CSS", category: "frontend" },
                { name: "Framer Motion", category: "frontend" },
                { name: "Figma", category: "tools" },
                { name: "Storybook", category: "tools" },
                { name: "Jest", category: "testing" },
            ]),
            createGitHubStatsSection(["stats", "top-langs", "streak"]),
            createProjectsSection([
                {
                    name: "Component Library",
                    description: "Production-ready React component library with 50+ components",
                    techStack: ["React", "TypeScript", "Storybook"],
                    type: "Design System",
                },
                {
                    name: "E-Commerce Storefront",
                    description: "High-performance Next.js storefront with 98 Lighthouse score",
                    techStack: ["Next.js", "Tailwind", "Stripe"],
                    type: "Web App",
                },
                {
                    name: "Dashboard Template",
                    description: "Admin dashboard with real-time charts and dark mode",
                    techStack: ["React", "Chart.js", "Tailwind"],
                    type: "Template",
                },
            ]),
            createSocialsSection(["github", "linkedin", "twitter", "dribbble"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 3: BACKEND DEVELOPER
// ============================================================================

resetSectionIdCounter();
const backendDeveloperTemplate: TemplateRegistryItem = {
    id: "backend-developer",
    slug: "backend-developer",
    name: "Backend Engineer",
    description: "Clean, API-centric layout with system architecture emphasis",
    category: "professional",
    persona: "Backend Developer",
    previewImage: "/templates/backend-developer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "backend-developer",
        "Backend Engineer",
        "For backend engineers building scalable systems",
        "developer",
        [
            createHeroSection(
                "Backend Engineer",
                "Building scalable systems and robust APIs",
                undefined
            ),
            createAboutSection(
                "Backend engineer focused on distributed systems, API design, and database optimization. 6 years of experience building high-throughput services handling millions of requests. Strong advocate for clean architecture, comprehensive testing, and infrastructure as code.",
                [
                    "🔧 Distributed systems specialist",
                    "📊 Database optimization expert",
                    "🏗️ Clean architecture advocate",
                    "✅ Test-driven development",
                ]
            ),
            createTechStackSection([
                { name: "Go", category: "language" },
                { name: "Python", category: "language" },
                { name: "Node.js", category: "backend" },
                { name: "Rust", category: "language" },
                { name: "PostgreSQL", category: "database" },
                { name: "Redis", category: "database" },
                { name: "Docker", category: "devops" },
                { name: "Kubernetes", category: "devops" },
                { name: "AWS", category: "cloud" },
                { name: "gRPC", category: "backend" },
            ]),
            createGitHubStatsSection(["stats", "streak"]),
            createProjectsSection([
                {
                    name: "Payment Gateway",
                    description: "High-availability payment processing service handling 10K TPS",
                    techStack: ["Go", "PostgreSQL", "Redis"],
                    type: "Microservice",
                },
                {
                    name: "Queue Manager",
                    description: "Distributed task queue with dead-letter handling and retries",
                    techStack: ["Rust", "RabbitMQ", "Docker"],
                    type: "Library",
                },
                {
                    name: "API Gateway",
                    description: "Rate-limited API gateway with JWT auth and request validation",
                    techStack: ["Go", "Redis", "Kubernetes"],
                    type: "Infrastructure",
                },
            ]),
            createSocialsSection(["github", "linkedin", "email"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        false
    ),
};

// ============================================================================
// TEMPLATE 4: FULLSTACK DEVELOPER
// ============================================================================

resetSectionIdCounter();
const fullstackDeveloperTemplate: TemplateRegistryItem = {
    id: "fullstack-developer",
    slug: "fullstack-developer",
    name: "Fullstack Dev",
    description: "Balanced template showcasing both frontend and backend expertise",
    category: "professional",
    persona: "Fullstack Developer",
    previewImage: "/templates/fullstack-developer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "fullstack-developer",
        "Fullstack Dev",
        "Complete template for full-stack developers",
        "developer",
        [
            createHeroSection(
                "Fullstack Developer",
                "From database to deployment",
                ["Full-stack developer", "From database to deployment", "Building end-to-end solutions"]
            ),
            createAboutSection(
                "Full-stack developer with expertise across the entire web stack. I build complete applications from database design to deployment pipelines. Comfortable with React frontends, Node/Go backends, and cloud infrastructure. Love shipping features that users actually use.",
                [
                    "🔄 End-to-end development",
                    "☁️ Cloud-native applications",
                    "🚀 CI/CD automation",
                    "📦 Shipping production code daily",
                ]
            ),
            createTechStackSection([
                { name: "TypeScript", category: "language" },
                { name: "Go", category: "language" },
                { name: "Python", category: "language" },
                { name: "React", category: "frontend" },
                { name: "Next.js", category: "frontend" },
                { name: "Node.js", category: "backend" },
                { name: "PostgreSQL", category: "database" },
                { name: "Redis", category: "database" },
                { name: "Docker", category: "devops" },
                { name: "AWS", category: "cloud" },
            ]),
            createGitHubStatsSection(["stats", "top-langs", "streak"]),
            createProjectsSection([
                {
                    name: "SaaS Starter Kit",
                    description: "Full-stack boilerplate with auth, billing, and admin dashboard",
                    techStack: ["Next.js", "Prisma", "Stripe"],
                    type: "Template",
                },
                {
                    name: "Real-time Collaboration",
                    description: "Google Docs-style editor with operational transforms",
                    techStack: ["React", "Node.js", "WebSocket"],
                    type: "Web App",
                },
                {
                    name: "Analytics Platform",
                    description: "Self-hosted analytics with custom dashboards and event tracking",
                    techStack: ["Go", "ClickHouse", "React"],
                    type: "Web App",
                },
            ]),
            createSocialsSection(["github", "linkedin", "twitter", "email"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 5: CYBERSECURITY ENGINEER
// ============================================================================

resetSectionIdCounter();
const cybersecurityEngineerTemplate: TemplateRegistryItem = {
    id: "cybersecurity-engineer",
    slug: "cybersecurity-engineer",
    name: "Security Sentinel",
    description: "Dark-themed template with CTF stats, certifications, and security tools",
    category: "developer",
    persona: "Cybersecurity / Security Engineer",
    previewImage: "/templates/cybersecurity-engineer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "cybersecurity-engineer",
        "Security Sentinel",
        "For security professionals and ethical hackers",
        "developer",
        [
            createHeroSection(
                "Security Engineer",
                "Breaking things to make them stronger",
                undefined
            ),
            createAboutSection(
                "Security engineer specializing in penetration testing, vulnerability research, and secure architecture. OSCP and CEH certified. Active CTF player and bug bounty hunter. I help organizations find and fix security vulnerabilities before attackers do.",
                [
                    "🔐 Penetration testing specialist",
                    "🏆 CTF player & bug bounty hunter",
                    "📜 OSCP & CEH certified",
                    "🛡️ Secure architecture design",
                ]
            ),
            createTechStackSection([
                { name: "Python", category: "language" },
                { name: "Bash", category: "language" },
                { name: "Go", category: "language" },
                { name: "Burp Suite", category: "tools" },
                { name: "Metasploit", category: "tools" },
                { name: "Wireshark", category: "tools" },
                { name: "Nmap", category: "tools" },
                { name: "Docker", category: "devops" },
                { name: "Linux", category: "tools" },
                { name: "AWS", category: "cloud" },
            ]),
            createGitHubStatsSection(["stats"]),
            createProjectsSection([
                {
                    name: "Vuln Scanner",
                    description: "Automated vulnerability scanner for web applications",
                    techStack: ["Python", "SQLMap", "Nmap"],
                    type: "Security Tool",
                },
                {
                    name: "CTF Writeups",
                    description: "Collection of 50+ capture-the-flag challenge solutions",
                    techStack: ["Markdown", "Python"],
                    type: "Documentation",
                },
                {
                    name: "Secure Auth Library",
                    description: "OWASP-compliant authentication library for Node.js",
                    techStack: ["Node.js", "TypeScript", "JWT"],
                    type: "Library",
                },
            ]),
            createSocialsSection(["github", "linkedin", "twitter"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        false
    ),
};

// ============================================================================
// TEMPLATE 6: DATA/ML ENGINEER
// ============================================================================

resetSectionIdCounter();
const dataMlEngineerTemplate: TemplateRegistryItem = {
    id: "data-ml-engineer",
    slug: "data-ml-engineer",
    name: "Data Scientist",
    description: "Analytics-focused with ML frameworks, research papers, and Kaggle stats",
    category: "data-driven",
    persona: "Data / ML Engineer",
    previewImage: "/templates/data-ml-engineer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "data-ml-engineer",
        "Data Scientist",
        "For data scientists and ML engineers",
        "data-driven",
        [
            createHeroSection(
                "Data Scientist & ML Engineer",
                "Building intelligent systems",
                ["Turning data into insights", "Machine learning engineer", "Building intelligent systems"]
            ),
            createAboutSection(
                "Data scientist and ML engineer with focus on NLP and computer vision. Published researcher with experience deploying models at scale. I build end-to-end ML pipelines from data collection to production inference. Strong believer in reproducible research and MLOps best practices.",
                [
                    "🤖 NLP & Computer Vision specialist",
                    "📝 Published researcher",
                    "🔬 End-to-end ML pipelines",
                    "📊 MLOps best practices",
                ]
            ),
            createTechStackSection([
                { name: "Python", category: "language" },
                { name: "SQL", category: "language" },
                { name: "R", category: "language" },
                { name: "PyTorch", category: "tools" },
                { name: "TensorFlow", category: "tools" },
                { name: "scikit-learn", category: "tools" },
                { name: "Pandas", category: "tools" },
                { name: "Hugging Face", category: "tools" },
                { name: "MLflow", category: "devops" },
                { name: "Spark", category: "database" },
            ]),
            createGitHubStatsSection(["stats", "streak"]),
            createProjectsSection([
                {
                    name: "Sentiment Analyzer",
                    description: "BERT-based sentiment analysis API with 94% accuracy",
                    techStack: ["PyTorch", "Transformers", "FastAPI"],
                    type: "ML Model",
                },
                {
                    name: "Recommendation Engine",
                    description: "Collaborative filtering system serving 1M+ users",
                    techStack: ["Python", "Spark", "Redis"],
                    type: "ML Pipeline",
                },
                {
                    name: "AutoML Framework",
                    description: "Automated hyperparameter tuning and model selection",
                    techStack: ["Python", "Optuna", "MLflow"],
                    type: "Library",
                },
            ]),
            createSocialsSection(["github", "linkedin", "kaggle"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 7: CREATIVE DESIGNER
// ============================================================================

resetSectionIdCounter();
const creativeDesignerTemplate: TemplateRegistryItem = {
    id: "creative-designer",
    slug: "creative-designer",
    name: "Creative Canvas",
    description: "Artistic layout with portfolio showcase and design tool highlights",
    category: "creative",
    persona: "Creative / Designer",
    previewImage: "/templates/creative-designer.png",
    featured: true,
    animationLevel: "animated",
    template: createTemplate(
        "creative-designer",
        "Creative Canvas",
        "For designers who code",
        "creative",
        [
            createHeroSection(
                "Creative Developer",
                "Bringing ideas to life",
                ["Designer who codes", "Bringing ideas to life", "Pixels meet purpose"]
            ),
            createAboutSection(
                "Creative developer and UI/UX designer bridging design and development. I create visually stunning, functional interfaces with attention to micro-interactions and motion design. Former agency designer turned developer who believes great products need both beautiful design and solid engineering.",
                [
                    "🎨 UI/UX design specialist",
                    "✨ Motion design enthusiast",
                    "🖼️ Pixel-perfect implementations",
                    "🌈 Creative coding explorer",
                ]
            ),
            createTechStackSection([
                { name: "Figma", category: "tools" },
                { name: "Sketch", category: "tools" },
                { name: "Adobe Creative Suite", category: "tools" },
                { name: "HTML", category: "frontend" },
                { name: "CSS", category: "frontend" },
                { name: "JavaScript", category: "language" },
                { name: "React", category: "frontend" },
                { name: "Framer Motion", category: "frontend" },
                { name: "Three.js", category: "frontend" },
                { name: "After Effects", category: "tools" },
            ]),
            createGitHubStatsSection(["stats", "top-langs"]),
            createProjectsSection([
                {
                    name: "Portfolio Generator",
                    description: "Interactive portfolio builder with custom themes and animations",
                    techStack: ["React", "Framer Motion", "MDX"],
                    type: "Web App",
                },
                {
                    name: "Motion Library",
                    description: "Collection of reusable React animation components",
                    techStack: ["React", "Framer Motion", "TypeScript"],
                    type: "Library",
                },
                {
                    name: "3D Product Viewer",
                    description: "WebGL-based 360° product visualization tool",
                    techStack: ["Three.js", "React", "GSAP"],
                    type: "Web App",
                },
            ]),
            createSocialsSection(["github", "dribbble", "behance", "linkedin"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 8: MINIMAL PROFESSIONAL
// ============================================================================

resetSectionIdCounter();
const minimalProfessionalTemplate: TemplateRegistryItem = {
    id: "minimal-professional",
    slug: "minimal-professional",
    name: "Minimal Pro",
    description: "Clean, distraction-free profile with essential information only",
    category: "professional",
    persona: "Minimal Professional",
    previewImage: "/templates/minimal-professional.png",
    featured: false,
    animationLevel: "none",
    template: createTemplate(
        "minimal-professional",
        "Minimal Pro",
        "Clean and professional",
        "minimal",
        [
            createHeroSection(
                "Software Engineer",
                "Building reliable software",
                undefined
            ),
            createAboutSection(
                "Software engineer focused on writing clean, maintainable code. I value simplicity, thorough testing, and clear documentation. Currently working on distributed systems at scale.",
                [
                    "💻 Clean code advocate",
                    "✅ Test-driven development",
                    "📚 Documentation enthusiast",
                ]
            ),
            createTechStackSection([
                { name: "Java", category: "language" },
                { name: "Python", category: "language" },
                { name: "Go", category: "language" },
                { name: "Spring Boot", category: "backend" },
                { name: "PostgreSQL", category: "database" },
                { name: "AWS", category: "cloud" },
                { name: "Docker", category: "devops" },
                { name: "Git", category: "tools" },
            ]),
            createGitHubStatsSection(["stats"]),
            createProjectsSection([
                {
                    name: "Config Manager",
                    description: "Centralized configuration management service",
                    techStack: ["Go", "etcd", "gRPC"],
                    type: "Microservice",
                },
                {
                    name: "Log Aggregator",
                    description: "Lightweight log collection and search tool",
                    techStack: ["Rust", "Elasticsearch", "Docker"],
                    type: "Tool",
                },
            ]),
            createSocialsSection(["github", "linkedin"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        false
    ),
};

// ============================================================================
// TEMPLATE 9: ANIMATED CREATIVE
// ============================================================================

resetSectionIdCounter();
const animatedCreativeTemplate: TemplateRegistryItem = {
    id: "animated-creative",
    slug: "animated-creative",
    name: "Motion Master",
    description: "Dynamic profile with typing effects, snake graph, and animated badges",
    category: "creative",
    persona: "Animated Creative",
    previewImage: "/templates/animated-creative.png",
    featured: true,
    animationLevel: "animated",
    template: createTemplate(
        "animated-creative",
        "Motion Master",
        "For animation enthusiasts",
        "creative",
        [
            createHeroSection(
                "Creative Developer",
                "Making the web come alive",
                ["Creative developer", "Animation enthusiast", "Making the web come alive", "Shipping pixels with personality"]
            ),
            createAboutSection(
                "Creative developer obsessed with web animations and interactive experiences. I build websites that move, react, and delight. From subtle micro-interactions to full-page transitions, I believe motion is a fundamental part of great UX. Let's make something that moves.",
                [
                    "🎬 Animation obsessed",
                    "✨ Interactive experiences",
                    "🎮 Gamification expert",
                    "🌟 Easter egg enthusiast",
                ]
            ),
            createTechStackSection([
                { name: "JavaScript", category: "language" },
                { name: "TypeScript", category: "language" },
                { name: "React", category: "frontend" },
                { name: "Svelte", category: "frontend" },
                { name: "GSAP", category: "frontend" },
                { name: "Framer Motion", category: "frontend" },
                { name: "Three.js", category: "frontend" },
                { name: "CSS Animations", category: "frontend" },
                { name: "WebGL", category: "frontend" },
                { name: "Canvas API", category: "frontend" },
            ]),
            createGitHubStatsSection(["stats", "top-langs", "streak"]),
            createProjectsSection([
                {
                    name: "Scroll Animations",
                    description: "Smooth scroll-triggered animation library with zero dependencies",
                    techStack: ["JavaScript", "IntersectionObserver"],
                    type: "Library",
                },
                {
                    name: "Interactive Resume",
                    description: "Gamified portfolio with Easter eggs and achievements",
                    techStack: ["React", "GSAP", "Canvas"],
                    type: "Web App",
                },
                {
                    name: "Particle System",
                    description: "Configurable WebGL particle effects for any website",
                    techStack: ["Three.js", "WebGL", "TypeScript"],
                    type: "Library",
                },
            ]),
            createSocialsSection(["github", "twitter", "codepen", "linkedin"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials", "contributions"],
        true
    ),
};

// ============================================================================
// TEMPLATE 10: OPEN SOURCE MAINTAINER
// ============================================================================

resetSectionIdCounter();
const openSourceMaintainerTemplate: TemplateRegistryItem = {
    id: "open-source-maintainer",
    slug: "open-source-maintainer",
    name: "OSS Maintainer",
    description: "Contribution-focused with repo highlights and community stats",
    category: "developer",
    persona: "Open Source Maintainer",
    previewImage: "/templates/open-source-maintainer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "open-source-maintainer",
        "OSS Maintainer",
        "For open source contributors and maintainers",
        "developer",
        [
            createHeroSection(
                "Open Source Maintainer",
                "Building tools developers love",
                undefined
            ),
            createAboutSection(
                "Open source maintainer and contributor. Creator of tools used by thousands of developers daily. I believe in building in public, clear documentation, and inclusive communities. Core contributor to several major projects and passionate about making software accessible to everyone.",
                [
                    "🌍 Building in public",
                    "📖 Documentation advocate",
                    "🤝 Community builder",
                    "⭐ 10K+ GitHub stars",
                ]
            ),
            createTechStackSection([
                { name: "TypeScript", category: "language" },
                { name: "Rust", category: "language" },
                { name: "Go", category: "language" },
                { name: "Node.js", category: "backend" },
                { name: "Deno", category: "backend" },
                { name: "GitHub Actions", category: "devops" },
                { name: "npm", category: "tools" },
                { name: "Jest", category: "testing" },
                { name: "Vitest", category: "testing" },
                { name: "MDX", category: "tools" },
            ]),
            createGitHubStatsSection(["stats", "top-langs", "streak"]),
            createProjectsSection([
                {
                    name: "CLI Framework",
                    description: "Zero-config CLI builder with 5K+ GitHub stars",
                    techStack: ["TypeScript", "Node.js", "Chalk"],
                    type: "Library",
                },
                {
                    name: "Doc Generator",
                    description: "Automated API documentation from TypeScript types",
                    techStack: ["TypeScript", "MDX", "Vite"],
                    type: "Tool",
                },
                {
                    name: "Monorepo Toolkit",
                    description: "Tools for managing large-scale monorepos efficiently",
                    techStack: ["Rust", "TypeScript", "npm"],
                    type: "Developer Tool",
                },
            ]),
            createSocialsSection(["github", "twitter", "discord"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials", "contributions"],
        true
    ),
};

// ============================================================================
// TEMPLATE 11: MOBILE DEVELOPER
// ============================================================================

resetSectionIdCounter();
const mobileDeveloperTemplate: TemplateRegistryItem = {
    id: "mobile-developer",
    slug: "mobile-developer",
    name: "Mobile Dev",
    description: "iOS/Android focused with app showcase and mobile tech stack",
    category: "professional",
    persona: "Mobile Developer",
    previewImage: "/templates/mobile-developer.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "mobile-developer",
        "Mobile Dev",
        "For iOS and Android developers",
        "developer",
        [
            createHeroSection(
                "Mobile Developer",
                "iOS & Android",
                ["Mobile developer", "iOS & Android", "Shipping apps to millions"]
            ),
            createAboutSection(
                "Mobile developer building native and cross-platform applications. 4 years of experience shipping apps with millions of downloads. Focused on performance, smooth animations, and offline-first architecture. I care deeply about mobile UX patterns and platform conventions.",
                [
                    "📱 Native iOS & Android",
                    "🔄 Cross-platform expertise",
                    "⚡ Performance optimization",
                    "📴 Offline-first architecture",
                ]
            ),
            createTechStackSection([
                { name: "Swift", category: "language" },
                { name: "Kotlin", category: "language" },
                { name: "Dart", category: "language" },
                { name: "SwiftUI", category: "mobile" },
                { name: "Jetpack Compose", category: "mobile" },
                { name: "React Native", category: "mobile" },
                { name: "Flutter", category: "mobile" },
                { name: "Firebase", category: "cloud" },
                { name: "SQLite", category: "database" },
                { name: "Xcode", category: "tools" },
            ]),
            createGitHubStatsSection(["stats", "streak"]),
            createProjectsSection([
                {
                    name: "Fitness Tracker",
                    description: "Health tracking app with Apple Watch integration",
                    techStack: ["Swift", "SwiftUI", "HealthKit"],
                    type: "iOS App",
                },
                {
                    name: "Expense Manager",
                    description: "Cross-platform expense tracker built with Flutter",
                    techStack: ["Flutter", "Dart", "SQLite"],
                    type: "Mobile App",
                },
                {
                    name: "Offline Notes",
                    description: "Markdown notes app with cloud sync and offline support",
                    techStack: ["Kotlin", "Room", "Firebase"],
                    type: "Android App",
                },
            ]),
            createSocialsSection(["github", "linkedin", "twitter"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 12: DEVOPS/CLOUD
// ============================================================================

resetSectionIdCounter();
const devopsCloudTemplate: TemplateRegistryItem = {
    id: "devops-cloud",
    slug: "devops-cloud",
    name: "Cloud Architect",
    description: "Infrastructure-focused with CI/CD, cloud certs, and deployment tools",
    category: "developer",
    persona: "DevOps / Cloud",
    previewImage: "/templates/devops-cloud.png",
    featured: true,
    animationLevel: "subtle",
    template: createTemplate(
        "devops-cloud",
        "Cloud Architect",
        "For DevOps engineers and cloud architects",
        "developer",
        [
            createHeroSection(
                "DevOps Engineer",
                "Automating everything, scaling anything",
                undefined
            ),
            createAboutSection(
                "DevOps engineer and cloud architect specializing in AWS and Kubernetes. I build reliable infrastructure, CI/CD pipelines, and observability stacks. Certified AWS Solutions Architect and CKA. Strong focus on infrastructure as code, GitOps, and platform engineering.",
                [
                    "☁️ AWS Solutions Architect",
                    "⎈ Certified Kubernetes Administrator",
                    "🔄 GitOps practitioner",
                    "📊 Observability expert",
                ]
            ),
            createTechStackSection([
                { name: "Terraform", category: "devops" },
                { name: "Pulumi", category: "devops" },
                { name: "Kubernetes", category: "devops" },
                { name: "Docker", category: "devops" },
                { name: "Helm", category: "devops" },
                { name: "AWS", category: "cloud" },
                { name: "GCP", category: "cloud" },
                { name: "GitHub Actions", category: "devops" },
                { name: "Prometheus", category: "tools" },
                { name: "Grafana", category: "tools" },
            ]),
            createGitHubStatsSection(["stats"]),
            createProjectsSection([
                {
                    name: "K8s Cluster Manager",
                    description: "Terraform modules for production-ready EKS clusters",
                    techStack: ["Terraform", "AWS", "Kubernetes"],
                    type: "Infrastructure",
                },
                {
                    name: "CI/CD Templates",
                    description: "Reusable GitHub Actions workflows for common patterns",
                    techStack: ["GitHub Actions", "YAML", "Docker"],
                    type: "Templates",
                },
                {
                    name: "Monitoring Stack",
                    description: "Complete observability setup with dashboards and alerts",
                    techStack: ["Prometheus", "Grafana", "Alertmanager"],
                    type: "Infrastructure",
                },
            ]),
            createSocialsSection(["github", "linkedin", "email"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        false
    ),
};

// ============================================================================
// TEMPLATE 13: STARTUP FOUNDER
// ============================================================================

resetSectionIdCounter();
const startupFounderTemplate: TemplateRegistryItem = {
    id: "startup-founder",
    slug: "startup-founder",
    name: "Founder Mode",
    description: "Product-focused layout with venture highlights and leadership emphasis",
    category: "professional",
    persona: "Startup / Entrepreneur",
    previewImage: "/templates/startup-founder.png",
    featured: false,
    animationLevel: "subtle",
    template: createTemplate(
        "startup-founder",
        "Founder Mode",
        "For technical founders and entrepreneurs",
        "developer",
        [
            createHeroSection(
                "Technical Founder",
                "Building products people want",
                undefined
            ),
            createAboutSection(
                "Technical founder and product engineer. Previously founded and exited a developer tools startup. I build MVPs fast, iterate based on feedback, and scale what works. Focused on product-market fit, user experience, and sustainable growth. Currently building in the AI/developer tools space.",
                [
                    "🚀 Startup founder & builder",
                    "📈 0 to 1 specialist",
                    "🎯 Product-market fit focused",
                    "💡 AI/DevTools enthusiast",
                ]
            ),
            createTechStackSection([
                { name: "TypeScript", category: "language" },
                { name: "Python", category: "language" },
                { name: "Next.js", category: "frontend" },
                { name: "React", category: "frontend" },
                { name: "Node.js", category: "backend" },
                { name: "PostgreSQL", category: "database" },
                { name: "Stripe", category: "tools" },
                { name: "Vercel", category: "cloud" },
                { name: "AWS", category: "cloud" },
                { name: "OpenAI", category: "tools" },
            ]),
            createGitHubStatsSection(["stats"]),
            createProjectsSection([
                {
                    name: "LaunchKit",
                    description: "Weekend to launch SaaS boilerplate with payments and auth",
                    techStack: ["Next.js", "Stripe", "Supabase"],
                    type: "Template",
                },
                {
                    name: "Feedback Widget",
                    description: "Embeddable user feedback collection tool for any website",
                    techStack: ["React", "Node.js", "PostgreSQL"],
                    type: "SaaS Product",
                },
                {
                    name: "Landing Page Builder",
                    description: "AI-powered landing page generator for startups",
                    techStack: ["Next.js", "OpenAI", "Tailwind"],
                    type: "Web App",
                },
            ]),
            createSocialsSection(["github", "linkedin", "twitter"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 14: GAME DEVELOPER
// ============================================================================

resetSectionIdCounter();
const gameDeveloperTemplate: TemplateRegistryItem = {
    id: "game-developer",
    slug: "game-developer",
    name: "Game Dev",
    description: "Gaming-themed with engine showcase and game project cards",
    category: "creative",
    persona: "Game Developer",
    previewImage: "/templates/game-developer.png",
    featured: true,
    animationLevel: "animated",
    template: createTemplate(
        "game-developer",
        "Game Dev",
        "For indie game developers and graphics programmers",
        "creative",
        [
            createHeroSection(
                "Game Developer",
                "Building virtual worlds",
                ["Game developer", "Building virtual worlds", "Player of games, maker of games"]
            ),
            createAboutSection(
                "Indie game developer and graphics programmer. I build games, game engines, and tools for other developers. Passionate about procedural generation, shader programming, and emergent gameplay. Currently working on a roguelike with procedurally generated dungeons.",
                [
                    "🎮 Indie game developer",
                    "🖼️ Graphics programmer",
                    "🎲 Procedural generation",
                    "🕹️ Roguelike enthusiast",
                ]
            ),
            createTechStackSection([
                { name: "C++", category: "language" },
                { name: "C#", category: "language" },
                { name: "Rust", category: "language" },
                { name: "Unity", category: "tools" },
                { name: "Unreal Engine", category: "tools" },
                { name: "Godot", category: "tools" },
                { name: "OpenGL", category: "tools" },
                { name: "Vulkan", category: "tools" },
                { name: "Blender", category: "tools" },
                { name: "Aseprite", category: "tools" },
            ]),
            createGitHubStatsSection(["stats", "top-langs", "streak"]),
            createProjectsSection([
                {
                    name: "Dungeon Generator",
                    description: "Procedural dungeon generation with graph-based layouts",
                    techStack: ["C#", "Unity", "Algorithms"],
                    type: "Game Tool",
                },
                {
                    name: "Shader Collection",
                    description: "30+ custom shaders for Unity and Unreal Engine",
                    techStack: ["HLSL", "GLSL", "ShaderLab"],
                    type: "Library",
                },
                {
                    name: "Pixel Roguelike",
                    description: "Turn-based roguelike with permadeath and crafting",
                    techStack: ["Godot", "GDScript", "Aseprite"],
                    type: "Game",
                },
            ]),
            createSocialsSection(["github", "twitter", "discord"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        true
    ),
};

// ============================================================================
// TEMPLATE 15: ACADEMIC RESEARCHER
// ============================================================================

resetSectionIdCounter();
const academicResearcherTemplate: TemplateRegistryItem = {
    id: "academic-researcher",
    slug: "academic-researcher",
    name: "Researcher",
    description: "Publication-focused with citations, research areas, and institution",
    category: "academic",
    persona: "Academic / Researcher",
    previewImage: "/templates/academic-researcher.png",
    featured: false,
    animationLevel: "none",
    template: createTemplate(
        "academic-researcher",
        "Researcher",
        "For PhD students and academic researchers",
        "academic",
        [
            createHeroSection(
                "Research Scientist",
                "Advancing the state of the art",
                undefined
            ),
            createAboutSection(
                "PhD researcher in Computer Science focusing on distributed systems and formal verification. Published in top-tier venues including SOSP and OSDI. I build tools that help prove systems correct. Open source contributor and teaching assistant for graduate systems courses.",
                [
                    "🎓 PhD Candidate in CS",
                    "📄 Published at SOSP, OSDI",
                    "🔬 Formal verification research",
                    "👨‍🏫 Graduate TA",
                ]
            ),
            createTechStackSection([
                { name: "Python", category: "language" },
                { name: "OCaml", category: "language" },
                { name: "Coq", category: "language" },
                { name: "LaTeX", category: "tools" },
                { name: "Jupyter", category: "tools" },
                { name: "TLA+", category: "tools" },
                { name: "Linux", category: "tools" },
                { name: "Git", category: "tools" },
            ]),
            createGitHubStatsSection(["stats"]),
            createProjectsSection([
                {
                    name: "Verification Framework",
                    description: "Formal verification toolkit for distributed protocols",
                    techStack: ["Coq", "OCaml", "TLA+"],
                    type: "Research Tool",
                },
                {
                    name: "Benchmark Suite",
                    description: "Reproducible benchmarks for consensus algorithms",
                    techStack: ["Python", "Docker", "Jupyter"],
                    type: "Research",
                },
                {
                    name: "Course Materials",
                    description: "Graduate distributed systems course with hands-on labs",
                    techStack: ["Markdown", "Python", "Docker"],
                    type: "Education",
                },
            ]),
            createSocialsSection(["github", "linkedin", "email"]),
        ],
        ["hero", "about", "tech-stack", "github-stats", "projects", "socials"],
        false
    ),
};

// ============================================================================
// TEMPLATE REGISTRY
// ============================================================================

export const TEMPLATE_REGISTRY: readonly TemplateRegistryItem[] = [
    studentBeginnerTemplate,
    frontendDeveloperTemplate,
    backendDeveloperTemplate,
    fullstackDeveloperTemplate,
    cybersecurityEngineerTemplate,
    dataMlEngineerTemplate,
    creativeDesignerTemplate,
    minimalProfessionalTemplate,
    animatedCreativeTemplate,
    openSourceMaintainerTemplate,
    mobileDeveloperTemplate,
    devopsCloudTemplate,
    startupFounderTemplate,
    gameDeveloperTemplate,
    academicResearcherTemplate,
] as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get a template by its slug
 */
export const getTemplateBySlug = (slug: string): TemplateRegistryItem | undefined =>
    TEMPLATE_REGISTRY.find((t) => t.slug === slug);

/**
 * Get a template by its ID
 */
export const getTemplateById = (id: string): TemplateRegistryItem | undefined =>
    TEMPLATE_REGISTRY.find((t) => t.id === id);

/**
 * Get all templates in a category
 */
export const getTemplatesByCategory = (
    category: TemplateRegistryItem["category"]
): readonly TemplateRegistryItem[] =>
    TEMPLATE_REGISTRY.filter((t) => t.category === category);

/**
 * Get all featured templates
 */
export const getFeaturedTemplates = (): readonly TemplateRegistryItem[] =>
    TEMPLATE_REGISTRY.filter((t) => t.featured);

/**
 * Get templates by animation level
 */
export const getTemplatesByAnimation = (
    level: TemplateRegistryItem["animationLevel"]
): readonly TemplateRegistryItem[] =>
    TEMPLATE_REGISTRY.filter((t) => t.animationLevel === level);

// ============================================================================
// LEGACY EXPORTS (for backward compatibility)
// ============================================================================

export const DEVELOPER_PRO_TEMPLATE = fullstackDeveloperTemplate.template;
export const MINIMAL_TEMPLATE = minimalProfessionalTemplate.template;
