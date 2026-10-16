# Portfolioo

Build a modern, dynamic, and professional personal CV portfolio for Mahmoud Ali targeting Data Entry Specialist / MIS Graduate roles.

Key Requirements:
1. Dual-Version System with persistent/controlled default:
   - UAE Version:
     * Location: Ajman - United Arab Emirates
     * Phone & Direct WhatsApp: +971565410751 (clicking redirects to WhatsApp chat: https://wa.me/971565410751)
     * UAE Residency: Visa valid until 18-12-2026
     * Email: Mahmoud.ali01245@gmail.com
   - Egypt Version:
     * Location: Alexandria - Egypt
     * Phone & Direct WhatsApp: +201097831301 (clicking redirects to WhatsApp chat: https://wa.me/201097831301)
     * Remove UAE residency availability completely
     * Include: Valid Driving License, Military Service: Exempt
     * Email: Mahmoud.ali01245@gmail.com

2. Hidden Admin Switcher (/login):
   - A hidden login page/modal accessible via `/login` or secret shortcut.
   - Enter a passcode (default passcode e.g., 2026 or customizable) to log into a sleek admin dashboard.
   - In the admin panel, Mahmoud can select which version (UAE or Egypt) is the active default shown on the root URL for all public visitors.
   - Also allow query parameter overrides like `/?version=uae` or `/?version=egypt` so links can be shared directly with recruiters in either country.

3. Visual Design & Aesthetics:
   - Modern, dynamic, dark-mode futuristic look with subtle mesh gradients, glassmorphism, floating 3D icons (Three.js / CSS 3D floating badges representing Data, Excel, Fast Typing 100+ WPM, MIS, Analytics).
   - High-impact Hero section with name Mahmoud Ali, targeting Data Entry & Information Systems, quick stats counter (100+ WPM typing speed, 99.8% accuracy, 4+ years multi-role experience).
   - Primary action buttons: Chat on WhatsApp (opens direct chat with country-specific number), Email, and Download ATS CV.
   - Sections:
     * About / Professional Summary
     * Key Competencies & Stats (Fast Typing 100+ WPM, Data Entry & Accuracy, Microsoft Office, Database Management, HTML & CSS)
     * Interactive Work Experience timeline based on the CV (Smart Digital, Al Hamd Group, Elgendy Restaurant, Computer Store, etc.)
     * Education: Alexandria University, Bachelor's in Management Information Systems (2019-2023)
     * Languages: Arabic (Native), English (Intermediate B1/B2)
     * Contact section with fast WhatsApp button and email copy.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mahmoudali96505.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eabce8e2-14a2-4528-9aa6-a7fcfc4d7f58).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
