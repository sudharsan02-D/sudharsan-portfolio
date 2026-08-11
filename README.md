# Sudharsan M - Personal Portfolio Website

A premium dark-themed personal portfolio website **Sudharsan M **, a Computer Science and Engineering student.

## Features

- Modern futuristic UI with dark navy/black background (#0f172a)
- Neon cyan glow effects (#00e5ff) throughout the website
- Glassmorphism navigation bar with smooth hover animations
- Full-screen hero section with typing animation
- Responsive design for desktop, tablet, and mobile
- Smooth scroll reveal animations using Framer Motion
- Interactive project cards with hover effects
- Contact form with validation
- Timeline-based experience section

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons

## Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── About.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   ├── Experience.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── Navigation.tsx
│   ├── Projects.tsx
│   └── Skills.tsx
├── public/
│   └── profile.jpg
├── next.config.js
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Sections

- **Hero**: Introduction with typing animation and profile image
- **About**: Professional introduction with education and statistics
- **Skills**: Categorized skills with glowing cards
- **Projects**: Premium project cards with tech stack and links
- **Experience**: Timeline-based experience section
- **Achievements**: Key achievements and accomplishments
- **Contact**: Contact form with social links

## Customization

- Update profile image in `public/profile.jpg`
- Modify social links in components
- Update project details in `components/Projects.tsx`
- Customize colors in `tailwind.config.ts`

## License

© 2026 Sudharsan M. All rights reserved.
