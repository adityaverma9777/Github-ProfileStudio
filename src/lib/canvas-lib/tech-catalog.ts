/**
 * Technology Catalog
 * 
 * Comprehensive list of programming languages, frameworks, tools, and technologies
 * used for Badge Group and Tech Stack components.
 */

export interface TechCatalogItem {
    readonly name: string;
    readonly logo: string;  // SimpleIcons slug
    readonly color: string; // Hex color without #
    readonly category: TechCategory;
}

export type TechCategory =
    | "language"
    | "frontend"
    | "backend"
    | "database"
    | "cloud"
    | "devops"
    | "mobile"
    | "ai-ml"
    | "testing"
    | "tools"
    | "design"
    | "other";

export const TECH_CATEGORIES: Record<TechCategory, { name: string; icon: string }> = {
    language: { name: "Languages", icon: "💻" },
    frontend: { name: "Frontend", icon: "🎨" },
    backend: { name: "Backend", icon: "⚙️" },
    database: { name: "Databases", icon: "🗄️" },
    cloud: { name: "Cloud & Hosting", icon: "☁️" },
    devops: { name: "DevOps & CI/CD", icon: "🔧" },
    mobile: { name: "Mobile", icon: "📱" },
    "ai-ml": { name: "AI & ML", icon: "🤖" },
    testing: { name: "Testing", icon: "🧪" },
    tools: { name: "Tools", icon: "🛠️" },
    design: { name: "Design", icon: "🎭" },
    other: { name: "Other", icon: "📦" },
};

import {
    Code,
    Palette,
    Cog,
    Database,
    Cloud,
    Wrench,
    Smartphone,
    Bot,
    FlaskConical,
    Settings,
    PenTool,
    Package,
    type LucideIcon,
} from "lucide-react";

/** Lucide icon mapping for tech categories (UI only) */
export const TECH_CATEGORY_ICONS: Record<TechCategory, LucideIcon> = {
    language: Code,
    frontend: Palette,
    backend: Cog,
    database: Database,
    cloud: Cloud,
    devops: Wrench,
    mobile: Smartphone,
    "ai-ml": Bot,
    testing: FlaskConical,
    tools: Settings,
    design: PenTool,
    other: Package,
};

export const TECH_CATALOG: readonly TechCatalogItem[] = [
    // ============================================================================
    // PROGRAMMING LANGUAGES
    // ============================================================================
    { name: "JavaScript", logo: "javascript", color: "F7DF1E", category: "language" },
    { name: "TypeScript", logo: "typescript", color: "3178C6", category: "language" },
    { name: "Python", logo: "python", color: "3776AB", category: "language" },
    { name: "Java", logo: "openjdk", color: "ED8B00", category: "language" },
    { name: "C", logo: "c", color: "A8B9CC", category: "language" },
    { name: "C++", logo: "cplusplus", color: "00599C", category: "language" },
    { name: "C#", logo: "csharp", color: "512BD4", category: "language" },
    { name: "Go", logo: "go", color: "00ADD8", category: "language" },
    { name: "Rust", logo: "rust", color: "000000", category: "language" },
    { name: "Ruby", logo: "ruby", color: "CC342D", category: "language" },
    { name: "PHP", logo: "php", color: "777BB4", category: "language" },
    { name: "Swift", logo: "swift", color: "F05138", category: "language" },
    { name: "Kotlin", logo: "kotlin", color: "7F52FF", category: "language" },
    { name: "Scala", logo: "scala", color: "DC322F", category: "language" },
    { name: "Dart", logo: "dart", color: "0175C2", category: "language" },
    { name: "R", logo: "r", color: "276DC3", category: "language" },
    { name: "Julia", logo: "julia", color: "9558B2", category: "language" },
    { name: "Elixir", logo: "elixir", color: "4B275F", category: "language" },
    { name: "Haskell", logo: "haskell", color: "5D4F85", category: "language" },
    { name: "Clojure", logo: "clojure", color: "5881D8", category: "language" },
    { name: "Perl", logo: "perl", color: "39457E", category: "language" },
    { name: "Lua", logo: "lua", color: "2C2D72", category: "language" },
    { name: "Shell", logo: "gnubash", color: "4EAA25", category: "language" },
    { name: "PowerShell", logo: "powershell", color: "5391FE", category: "language" },
    { name: "Solidity", logo: "solidity", color: "363636", category: "language" },
    { name: "Assembly", logo: "assemblyscript", color: "007AAC", category: "language" },
    { name: "MATLAB", logo: "mathworks", color: "0076A8", category: "language" },
    { name: "Fortran", logo: "fortran", color: "734F96", category: "language" },
    { name: "Zig", logo: "zig", color: "F7A41D", category: "language" },

    // ============================================================================
    // FRONTEND FRAMEWORKS & LIBRARIES
    // ============================================================================
    { name: "React", logo: "react", color: "61DAFB", category: "frontend" },
    { name: "Vue.js", logo: "vuedotjs", color: "4FC08D", category: "frontend" },
    { name: "Angular", logo: "angular", color: "DD0031", category: "frontend" },
    { name: "Svelte", logo: "svelte", color: "FF3E00", category: "frontend" },
    { name: "Next.js", logo: "nextdotjs", color: "000000", category: "frontend" },
    { name: "Nuxt.js", logo: "nuxtdotjs", color: "00DC82", category: "frontend" },
    { name: "Gatsby", logo: "gatsby", color: "663399", category: "frontend" },
    { name: "Remix", logo: "remix", color: "000000", category: "frontend" },
    { name: "Astro", logo: "astro", color: "FF5D01", category: "frontend" },
    { name: "Solid", logo: "solid", color: "2C4F7C", category: "frontend" },
    { name: "Qwik", logo: "qwik", color: "AC7EF4", category: "frontend" },
    { name: "HTML5", logo: "html5", color: "E34F26", category: "frontend" },
    { name: "CSS3", logo: "css3", color: "1572B6", category: "frontend" },
    { name: "Sass", logo: "sass", color: "CC6699", category: "frontend" },
    { name: "Tailwind CSS", logo: "tailwindcss", color: "06B6D4", category: "frontend" },
    { name: "Bootstrap", logo: "bootstrap", color: "7952B3", category: "frontend" },
    { name: "Material UI", logo: "mui", color: "007FFF", category: "frontend" },
    { name: "Chakra UI", logo: "chakraui", color: "319795", category: "frontend" },
    { name: "Styled Components", logo: "styledcomponents", color: "DB7093", category: "frontend" },
    { name: "Emotion", logo: "emotion", color: "C43BAD", category: "frontend" },
    { name: "Redux", logo: "redux", color: "764ABC", category: "frontend" },
    { name: "Zustand", logo: "react", color: "443E38", category: "frontend" },
    { name: "Vite", logo: "vite", color: "646CFF", category: "frontend" },
    { name: "Webpack", logo: "webpack", color: "8DD6F9", category: "frontend" },
    { name: "Rollup", logo: "rollupdotjs", color: "EC4A3F", category: "frontend" },
    { name: "esbuild", logo: "esbuild", color: "FFCF00", category: "frontend" },
    { name: "Parcel", logo: "parcel", color: "21374B", category: "frontend" },
    { name: "jQuery", logo: "jquery", color: "0769AD", category: "frontend" },
    { name: "Three.js", logo: "threedotjs", color: "000000", category: "frontend" },
    { name: "D3.js", logo: "d3dotjs", color: "F9A03C", category: "frontend" },
    { name: "Framer Motion", logo: "framer", color: "0055FF", category: "frontend" },
    { name: "GSAP", logo: "greensock", color: "88CE02", category: "frontend" },

    // ============================================================================
    // BACKEND FRAMEWORKS
    // ============================================================================
    { name: "Node.js", logo: "nodedotjs", color: "339933", category: "backend" },
    { name: "Express.js", logo: "express", color: "000000", category: "backend" },
    { name: "Fastify", logo: "fastify", color: "000000", category: "backend" },
    { name: "NestJS", logo: "nestjs", color: "E0234E", category: "backend" },
    { name: "Django", logo: "django", color: "092E20", category: "backend" },
    { name: "Flask", logo: "flask", color: "000000", category: "backend" },
    { name: "FastAPI", logo: "fastapi", color: "009688", category: "backend" },
    { name: "Spring Boot", logo: "springboot", color: "6DB33F", category: "backend" },
    { name: "Rails", logo: "rubyonrails", color: "CC0000", category: "backend" },
    { name: "Laravel", logo: "laravel", color: "FF2D20", category: "backend" },
    { name: "Symfony", logo: "symfony", color: "000000", category: "backend" },
    { name: ".NET", logo: "dotnet", color: "512BD4", category: "backend" },
    { name: "ASP.NET", logo: "dotnet", color: "512BD4", category: "backend" },
    { name: "Gin", logo: "go", color: "00ADD8", category: "backend" },
    { name: "Fiber", logo: "go", color: "00ADD8", category: "backend" },
    { name: "Phoenix", logo: "phoenixframework", color: "FD4F00", category: "backend" },
    { name: "GraphQL", logo: "graphql", color: "E10098", category: "backend" },
    { name: "Apollo", logo: "apollographql", color: "311C87", category: "backend" },
    { name: "tRPC", logo: "trpc", color: "2596BE", category: "backend" },
    { name: "Prisma", logo: "prisma", color: "2D3748", category: "backend" },
    { name: "Drizzle", logo: "drizzle", color: "C5F74F", category: "backend" },
    { name: "Sequelize", logo: "sequelize", color: "52B0E7", category: "backend" },
    { name: "TypeORM", logo: "typeorm", color: "FE0803", category: "backend" },

    // ============================================================================
    // DATABASES
    // ============================================================================
    { name: "PostgreSQL", logo: "postgresql", color: "4169E1", category: "database" },
    { name: "MySQL", logo: "mysql", color: "4479A1", category: "database" },
    { name: "MongoDB", logo: "mongodb", color: "47A248", category: "database" },
    { name: "Redis", logo: "redis", color: "DC382D", category: "database" },
    { name: "SQLite", logo: "sqlite", color: "003B57", category: "database" },
    { name: "MariaDB", logo: "mariadb", color: "003545", category: "database" },
    { name: "Oracle", logo: "oracle", color: "F80000", category: "database" },
    { name: "Microsoft SQL Server", logo: "microsoftsqlserver", color: "CC2927", category: "database" },
    { name: "Cassandra", logo: "apachecassandra", color: "1287B1", category: "database" },
    { name: "DynamoDB", logo: "amazondynamodb", color: "4053D6", category: "database" },
    { name: "Firebase", logo: "firebase", color: "FFCA28", category: "database" },
    { name: "Supabase", logo: "supabase", color: "3FCF8E", category: "database" },
    { name: "Neo4j", logo: "neo4j", color: "4581C3", category: "database" },
    { name: "Elasticsearch", logo: "elasticsearch", color: "005571", category: "database" },
    { name: "InfluxDB", logo: "influxdb", color: "22ADF6", category: "database" },
    { name: "CouchDB", logo: "apachecouchdb", color: "E42528", category: "database" },
    { name: "PlanetScale", logo: "planetscale", color: "000000", category: "database" },
    { name: "Neon", logo: "neon", color: "00E599", category: "database" },
    { name: "Turso", logo: "turso", color: "4FF8D2", category: "database" },

    // ============================================================================
    // CLOUD & HOSTING
    // ============================================================================
    { name: "AWS", logo: "amazonwebservices", color: "232F3E", category: "cloud" },
    { name: "Google Cloud", logo: "googlecloud", color: "4285F4", category: "cloud" },
    { name: "Azure", logo: "microsoftazure", color: "0078D4", category: "cloud" },
    { name: "Vercel", logo: "vercel", color: "000000", category: "cloud" },
    { name: "Netlify", logo: "netlify", color: "00C7B7", category: "cloud" },
    { name: "Heroku", logo: "heroku", color: "430098", category: "cloud" },
    { name: "DigitalOcean", logo: "digitalocean", color: "0080FF", category: "cloud" },
    { name: "Cloudflare", logo: "cloudflare", color: "F38020", category: "cloud" },
    { name: "Railway", logo: "railway", color: "0B0D0E", category: "cloud" },
    { name: "Render", logo: "render", color: "46E3B7", category: "cloud" },
    { name: "Fly.io", logo: "flydotio", color: "8829FE", category: "cloud" },
    { name: "Linode", logo: "linode", color: "00A95C", category: "cloud" },
    { name: "Vultr", logo: "vultr", color: "007BFC", category: "cloud" },
    { name: "Hetzner", logo: "hetzner", color: "D50C2D", category: "cloud" },
    { name: "Oracle Cloud", logo: "oracle", color: "F80000", category: "cloud" },
    { name: "IBM Cloud", logo: "ibmcloud", color: "1261FE", category: "cloud" },
    { name: "Alibaba Cloud", logo: "alibabacloud", color: "FF6A00", category: "cloud" },

    // ============================================================================
    // DEVOPS & CI/CD
    // ============================================================================
    { name: "Docker", logo: "docker", color: "2496ED", category: "devops" },
    { name: "Kubernetes", logo: "kubernetes", color: "326CE5", category: "devops" },
    { name: "GitHub Actions", logo: "githubactions", color: "2088FF", category: "devops" },
    { name: "GitLab CI", logo: "gitlab", color: "FC6D26", category: "devops" },
    { name: "Jenkins", logo: "jenkins", color: "D24939", category: "devops" },
    { name: "CircleCI", logo: "circleci", color: "343434", category: "devops" },
    { name: "Travis CI", logo: "travisci", color: "3EAAAF", category: "devops" },
    { name: "Terraform", logo: "terraform", color: "7B42BC", category: "devops" },
    { name: "Ansible", logo: "ansible", color: "EE0000", category: "devops" },
    { name: "Pulumi", logo: "pulumi", color: "8A3391", category: "devops" },
    { name: "Helm", logo: "helm", color: "0F1689", category: "devops" },
    { name: "ArgoCD", logo: "argo", color: "EF7B4D", category: "devops" },
    { name: "Prometheus", logo: "prometheus", color: "E6522C", category: "devops" },
    { name: "Grafana", logo: "grafana", color: "F46800", category: "devops" },
    { name: "Datadog", logo: "datadog", color: "632CA6", category: "devops" },
    { name: "Sentry", logo: "sentry", color: "362D59", category: "devops" },
    { name: "New Relic", logo: "newrelic", color: "1CE783", category: "devops" },
    { name: "Nginx", logo: "nginx", color: "009639", category: "devops" },
    { name: "Apache", logo: "apache", color: "D22128", category: "devops" },
    { name: "Caddy", logo: "caddy", color: "1F88C0", category: "devops" },

    // ============================================================================
    // MOBILE
    // ============================================================================
    { name: "React Native", logo: "react", color: "61DAFB", category: "mobile" },
    { name: "Flutter", logo: "flutter", color: "02569B", category: "mobile" },
    { name: "Expo", logo: "expo", color: "000020", category: "mobile" },
    { name: "Android", logo: "android", color: "3DDC84", category: "mobile" },
    { name: "iOS", logo: "ios", color: "000000", category: "mobile" },
    { name: "Ionic", logo: "ionic", color: "3880FF", category: "mobile" },
    { name: "Capacitor", logo: "capacitor", color: "119EFF", category: "mobile" },
    { name: "Xamarin", logo: "xamarin", color: "3498DB", category: "mobile" },
    { name: "SwiftUI", logo: "swift", color: "F05138", category: "mobile" },
    { name: "Jetpack Compose", logo: "jetpackcompose", color: "4285F4", category: "mobile" },
    { name: "Tauri", logo: "tauri", color: "24C8DB", category: "mobile" },
    { name: "Electron", logo: "electron", color: "47848F", category: "mobile" },

    // ============================================================================
    // AI & ML
    // ============================================================================
    { name: "TensorFlow", logo: "tensorflow", color: "FF6F00", category: "ai-ml" },
    { name: "PyTorch", logo: "pytorch", color: "EE4C2C", category: "ai-ml" },
    { name: "Keras", logo: "keras", color: "D00000", category: "ai-ml" },
    { name: "scikit-learn", logo: "scikitlearn", color: "F7931E", category: "ai-ml" },
    { name: "OpenAI", logo: "openai", color: "412991", category: "ai-ml" },
    { name: "Hugging Face", logo: "huggingface", color: "FFD21E", category: "ai-ml" },
    { name: "LangChain", logo: "langchain", color: "1C3C3C", category: "ai-ml" },
    { name: "Pandas", logo: "pandas", color: "150458", category: "ai-ml" },
    { name: "NumPy", logo: "numpy", color: "013243", category: "ai-ml" },
    { name: "Jupyter", logo: "jupyter", color: "F37626", category: "ai-ml" },
    { name: "OpenCV", logo: "opencv", color: "5C3EE8", category: "ai-ml" },
    { name: "CUDA", logo: "nvidia", color: "76B900", category: "ai-ml" },
    { name: "MLflow", logo: "mlflow", color: "0194E2", category: "ai-ml" },
    { name: "Weights & Biases", logo: "weightsandbiases", color: "FFBE00", category: "ai-ml" },
    { name: "Ollama", logo: "ollama", color: "000000", category: "ai-ml" },

    // ============================================================================
    // TESTING
    // ============================================================================
    { name: "Jest", logo: "jest", color: "C21325", category: "testing" },
    { name: "Vitest", logo: "vitest", color: "6E9F18", category: "testing" },
    { name: "Cypress", logo: "cypress", color: "17202C", category: "testing" },
    { name: "Playwright", logo: "playwright", color: "2EAD33", category: "testing" },
    { name: "Selenium", logo: "selenium", color: "43B02A", category: "testing" },
    { name: "Puppeteer", logo: "puppeteer", color: "40B5A4", category: "testing" },
    { name: "Testing Library", logo: "testinglibrary", color: "E33332", category: "testing" },
    { name: "Mocha", logo: "mocha", color: "8D6748", category: "testing" },
    { name: "Chai", logo: "chai", color: "A30701", category: "testing" },
    { name: "Pytest", logo: "pytest", color: "0A9EDC", category: "testing" },
    { name: "JUnit", logo: "junit5", color: "25A162", category: "testing" },
    { name: "Storybook", logo: "storybook", color: "FF4785", category: "testing" },
    { name: "Postman", logo: "postman", color: "FF6C37", category: "testing" },
    { name: "Insomnia", logo: "insomnia", color: "4000BF", category: "testing" },

    // ============================================================================
    // TOOLS & UTILITIES
    // ============================================================================
    { name: "Git", logo: "git", color: "F05032", category: "tools" },
    { name: "GitHub", logo: "github", color: "181717", category: "tools" },
    { name: "GitLab", logo: "gitlab", color: "FC6D26", category: "tools" },
    { name: "Bitbucket", logo: "bitbucket", color: "0052CC", category: "tools" },
    { name: "VS Code", logo: "visualstudiocode", color: "007ACC", category: "tools" },
    { name: "Vim", logo: "vim", color: "019733", category: "tools" },
    { name: "Neovim", logo: "neovim", color: "57A143", category: "tools" },
    { name: "IntelliJ IDEA", logo: "intellijidea", color: "000000", category: "tools" },
    { name: "WebStorm", logo: "webstorm", color: "000000", category: "tools" },
    { name: "PyCharm", logo: "pycharm", color: "000000", category: "tools" },
    { name: "Sublime Text", logo: "sublimetext", color: "FF9800", category: "tools" },
    { name: "Cursor", logo: "cursor", color: "000000", category: "tools" },
    { name: "npm", logo: "npm", color: "CB3837", category: "tools" },
    { name: "Yarn", logo: "yarn", color: "2C8EBB", category: "tools" },
    { name: "pnpm", logo: "pnpm", color: "F69220", category: "tools" },
    { name: "Bun", logo: "bun", color: "000000", category: "tools" },
    { name: "ESLint", logo: "eslint", color: "4B32C3", category: "tools" },
    { name: "Prettier", logo: "prettier", color: "F7B93E", category: "tools" },
    { name: "Biome", logo: "biome", color: "60A5FA", category: "tools" },
    { name: "Linux", logo: "linux", color: "FCC624", category: "tools" },
    { name: "Ubuntu", logo: "ubuntu", color: "E95420", category: "tools" },
    { name: "macOS", logo: "macos", color: "000000", category: "tools" },
    { name: "Windows", logo: "windows", color: "0078D6", category: "tools" },
    { name: "WSL", logo: "windowsterminal", color: "4D4D4D", category: "tools" },
    { name: "Homebrew", logo: "homebrew", color: "FBB040", category: "tools" },
    { name: "Slack", logo: "slack", color: "4A154B", category: "tools" },
    { name: "Discord", logo: "discord", color: "5865F2", category: "tools" },
    { name: "Notion", logo: "notion", color: "000000", category: "tools" },
    { name: "Jira", logo: "jira", color: "0052CC", category: "tools" },
    { name: "Linear", logo: "linear", color: "5E6AD2", category: "tools" },
    { name: "Trello", logo: "trello", color: "0052CC", category: "tools" },

    // ============================================================================
    // DESIGN
    // ============================================================================
    { name: "Figma", logo: "figma", color: "F24E1E", category: "design" },
    { name: "Adobe XD", logo: "adobexd", color: "FF61F6", category: "design" },
    { name: "Sketch", logo: "sketch", color: "F7B500", category: "design" },
    { name: "Adobe Photoshop", logo: "adobephotoshop", color: "31A8FF", category: "design" },
    { name: "Adobe Illustrator", logo: "adobeillustrator", color: "FF9A00", category: "design" },
    { name: "Canva", logo: "canva", color: "00C4CC", category: "design" },
    { name: "Blender", logo: "blender", color: "F5792A", category: "design" },
    { name: "Framer", logo: "framer", color: "0055FF", category: "design" },
    { name: "Webflow", logo: "webflow", color: "4353FF", category: "design" },
    { name: "InVision", logo: "invision", color: "FF3366", category: "design" },
    { name: "Zeplin", logo: "zeplin", color: "FDBD39", category: "design" },

    // ============================================================================
    // OTHER / MISC
    // ============================================================================
    { name: "Markdown", logo: "markdown", color: "000000", category: "other" },
    { name: "JSON", logo: "json", color: "000000", category: "other" },
    { name: "YAML", logo: "yaml", color: "CB171E", category: "other" },
    { name: "XML", logo: "xml", color: "005FAD", category: "other" },
    { name: "LaTeX", logo: "latex", color: "008080", category: "other" },
    { name: "WordPress", logo: "wordpress", color: "21759B", category: "other" },
    { name: "Shopify", logo: "shopify", color: "7AB55C", category: "other" },
    { name: "Stripe", logo: "stripe", color: "008CDD", category: "other" },
    { name: "PayPal", logo: "paypal", color: "00457C", category: "other" },
    { name: "Twilio", logo: "twilio", color: "F22F46", category: "other" },
    { name: "SendGrid", logo: "sendgrid", color: "1A82E2", category: "other" },
    { name: "Auth0", logo: "auth0", color: "EB5424", category: "other" },
    { name: "Clerk", logo: "clerk", color: "6C47FF", category: "other" },
    { name: "Socket.io", logo: "socketdotio", color: "010101", category: "other" },
    { name: "RabbitMQ", logo: "rabbitmq", color: "FF6600", category: "other" },
    { name: "Apache Kafka", logo: "apachekafka", color: "231F20", category: "other" },
    { name: "Ethereum", logo: "ethereum", color: "3C3C3D", category: "other" },
    { name: "Bitcoin", logo: "bitcoin", color: "F7931A", category: "other" },
    { name: "Web3.js", logo: "web3dotjs", color: "F16822", category: "other" },
    { name: "IPFS", logo: "ipfs", color: "65C2CB", category: "other" },
] as const;

/** Get technologies by category */
export function getTechByCategory(category: TechCategory): TechCatalogItem[] {
    return TECH_CATALOG.filter((tech) => tech.category === category);
}

/** Search technologies by name */
export function searchTech(query: string): TechCatalogItem[] {
    const lower = query.toLowerCase();
    return TECH_CATALOG.filter((tech) =>
        tech.name.toLowerCase().includes(lower)
    );
}
