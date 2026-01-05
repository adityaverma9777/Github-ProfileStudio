<div align="center">

# 🎨 GitHub Profile Studio

**Create stunning GitHub profile READMEs in minutes — no coding required.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

[Live Demo](https://githubprofilestudio.vercel.app) · [Report Bug](https://github.com/yourusername/githubprofilestudio/issues) · [Request Feature](https://github.com/yourusername/githubprofilestudio/issues)

</div>

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🎭 **15+ Templates** | Professional templates for developers, students, data scientists, and more |
| ⌨️ **Typing Animations** | Add dynamic typing effects to your hero section |
| 📊 **GitHub Stats** | Auto-generate stats cards, streak counters, and contribution graphs |
| 🛠️ **Tech Stack Badges** | 100+ technology badges with automatic icon matching |
| 👁️ **Live Preview** | Real-time preview as you build — WYSIWYG experience |
| 📦 **One-Click Export** | Export clean markdown ready for your GitHub profile |
| 🌓 **Dark/Light Mode** | Preview how your README looks in both themes |
| 🔒 **No Sign-up Required** | Start building immediately, completely free |

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/githubprofilestudio.git

# Navigate to the project
cd githubprofilestudio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── builder/              # Profile builder
│   │   ├── custom/           # Custom editor with Inspector
│   │   ├── panels/           # Left & Preview panels
│   │   └── state/            # Zustand stores
│   ├── templates/            # Template showcase pages
│   └── page.tsx              # Homepage
├── components/               # Reusable UI components
│   ├── preview/              # Markdown preview renderers
│   └── layout/               # Header, Footer
├── data/
│   └── templates.ts          # 15 production-ready templates
├── lib/
│   ├── template-engine/      # Core rendering pipeline
│   ├── canvas-lib/           # Tech catalog & serialization
│   ├── asset-engine/         # Dynamic asset generation
│   └── exporter/             # Markdown export utilities
└── types/                    # TypeScript definitions
```

---

## 🎯 How It Works

1. **Choose a Template** — Browse 15+ professionally designed templates
2. **Customize** — Edit text, add badges, configure GitHub stats
3. **Preview** — See real-time changes in the live preview
4. **Export** — Copy the generated markdown to your GitHub profile README

---

## 📸 Screenshots

<div align="center">

| Homepage | Template Browser |
|----------|------------------|
| ![Homepage](public/screenshots/homepage.png) | ![Builder](public/screenshots/builder.png) |

| Editor with Inspector | Preview |
|-----------------------|---------|
| ![Editor](public/screenshots/editor.png) | ![Preview](public/screenshots/preview.png) |

</div>

---

## 🧩 Available Sections

| Section | Description |
|---------|-------------|
| **Hero** | Eye-catching intro with typing animations |
| **About** | Bio with highlights and current focus |
| **Tech Stack** | Categorized technology badges |
| **GitHub Stats** | Stats cards, streaks, top languages |
| **Projects** | Showcase featured repositories |
| **Social Links** | Connect with LinkedIn, Twitter, etc. |
| **Custom Markdown** | Add any custom content |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **Markdown:** [React Markdown](https://remarkjs.github.io/react-markdown/) + [remark-gfm](https://github.com/remarkjs/remark-gfm)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 💖 Support

If you find this project helpful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- ☕ [Buying me a coffee](https://buymeacoffee.com/yourusername)

---

<div align="center">

**Made with ❤️ for the developer community**

[⬆ Back to Top](#-github-profile-studio)

</div>
