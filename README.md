# Joel Laggui Jr - Portfolio Website

A modern, VSCode-themed portfolio website showcasing my skills, projects, and experience as a Full-Stack Developer and Data Analyst.

## 🚀 Live Demo

Visit the live portfolio: [https://joellaggui-portfolio.vercel.app](https://joellaggui-portfolio.vercel.app)

## 📋 About

This portfolio website is designed to mimic the Visual Studio Code interface, providing a unique and familiar experience for developers and tech enthusiasts. It features an interactive AI assistant powered by OpenAI that can answer questions about my skills, experience, and projects.

## ✨ Features

- **VSCode-themed Interface**: Authentic Visual Studio Code design with explorer panel, tabs, and status bar
- **AI Assistant**: Interactive chatbot powered by OpenAI that provides information about my skills and experience
- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Theme**: Toggle between different VSCode themes
- **Interactive Projects**: Detailed project showcases with live demos and source code
- **Contact Form**: Functional contact form with EmailJS integration
- **Modern Tech Stack**: Built with React, TypeScript, and Chakra UI

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Chakra UI
- **Build Tool**: Vite
- **Deployment**: Vercel
- **AI Integration**: OpenAI API via OpenRouter
- **Email Service**: EmailJS
- **Icons**: React Icons
- **Styling**: CSS3, Chakra UI

## 🎯 Key Sections

### Home
- Professional introduction
- Quick overview of skills and experience
- Call-to-action buttons

### About
- Detailed professional background
- Skills and certifications
- Education and experience timeline

### Projects
- Featured project showcases
- Technology stacks used
- Live demos and source code links

### Contact
- Interactive contact form
- Professional contact information
- Social media links

### AI Assistant
- VSCode Copilot-style chatbot
- Answers questions about skills and experience
- Positioned in the bottom status bar like VSCode

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/GITLAGGUI/Official-Portfolio.git
cd Official-Portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment variables:
```bash
cp .env.example .env.local
```

4. Add your environment variables:
```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_OPENAI_API_KEY=your_openai_api_key
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Contact/        # Contact form components
│   ├── Projects/       # Project showcase components
│   ├── ActivityBar.tsx # VSCode activity bar
│   ├── ChatBot.tsx     # AI assistant component
│   ├── Explorer.tsx    # File explorer panel
│   └── ...
├── pages/              # Main page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Theme.tsx
├── utils/              # Utility functions
│   ├── sendEmail.ts    # Email handling
│   └── validation.ts   # Form validation
└── theme.ts            # Chakra UI theme configuration
```

## 🎨 Customization

### Themes
The portfolio supports multiple VSCode themes. You can customize themes in `src/theme.ts`:

```typescript
export const themes = {
  light: {
    // Light theme colors
  },
  dark: {
    // Dark theme colors
  }
};
```

### AI Assistant
The AI assistant can be customized by modifying the system prompt in `src/components/ChatBot.tsx`:

```typescript
const systemPrompt = `
  You are an AI assistant for Joel Laggui Jr's portfolio...
  // Customize the assistant's knowledge and behavior
`;
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `dist` folder to your hosting provider

## 📧 Contact

- **Email**: jlaggui47@gmail.com
- **Phone**: +63 915 368 3496
- **GitHub**: [@GITLAGGUI](https://github.com/GITLAGGUI)
- **LinkedIn**: [Joel Laggui Jr](https://linkedin.com/in/joel-laggui-jr)

## 🏆 Certifications

- **SPUP Innovation & Transformation Certificate** (March 2025)
- **Huawei Algorithm & Program Design Certificate** (February 2025)

## 💼 Skills

### Frontend Development
- JavaScript (ES6+), TypeScript
- React.js, Next.js, Vue.js
- HTML5, CSS3, Sass
- Chakra UI, Material-UI, Tailwind CSS

### Backend Development
- Node.js, Express.js
- Python, Django, FastAPI
- PHP, Laravel
- RESTful APIs, GraphQL

### Database & Cloud
- MongoDB, PostgreSQL, MySQL
- Firebase, AWS, Google Cloud
- Docker, Kubernetes

### Data Analysis
- Python (Pandas, NumPy)
- R, SQL
- Power BI, Tableau
- Machine Learning (Scikit-learn, TensorFlow)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Visual Studio Code interface
- Built with modern web technologies
- AI assistance powered by OpenAI

---

**Joel Laggui Jr** - Full-Stack Developer & Data Analyst  
*Building innovative digital solutions with modern technologies*