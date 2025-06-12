# 🖥️ APCSP Practice Hub

Welcome to the **AP Computer Science Principles Practice Hub** – a fully interactive website designed to help students master APCSP concepts through hands-on coding, quizzes, simulators, and cybersecurity challenges. Built with learners in mind, this platform combines engaging tools, visualizations, and real-world scenarios to make computer science accessible and fun.

![Website Banner](images/banner.png) <!-- Replace with actual image path -->

---

## 🎯 Purpose

This site supports APCSP students by offering:

- **Python coding practice** (inspired by CodingBat)
- **Cipher tools and quizzes** (Caesar & Vigenère)
- **Logic gate simulator** with truth table generator
- **Cybersecurity scenario quiz** and threat learning
- **RGB and HEX value practice**
- **Digital footprint and internet safety education**
- And much more to help prepare for the AP exam and real-world programming.

---

## 🚀 Features

### ✅ Python Practice
- Structured by APCSP units and topics
- Practice problems for variables, conditionals, loops, lists, procedures, and more
- Live editor + output view

### 🔐 Cipher Lab
- Switch between Caesar and Vigenère ciphers
- Encode, decode, and take timed quizzes on cipher logic

### 🔢 Logic Simulator
- Build and test logic circuits using AND, OR, NOT, NAND, NOR gates
- Auto-generates truth tables for combinations
- Helpful for Unit 3 Algorithm & Logic topics

### 🛡️ Cybersecurity Threat Quiz
- Interactive scenario-based quiz on:
  - Phishing
  - DDoS
  - Malware & Ransomware
  - Brute Force Attacks
  - Man-in-the-Middle (MITM)
  - DNS Spoofing
- Definitions, real-world examples, and defense strategies included

### 🌐 Digital Safety & Internet
- Learn how the internet works, including IP, DNS, and HTTP
- Understand your **digital footprint** and how to protect it

### 🎨 RGB/HEX Practice
- Convert between RGB and HEX color values
- Visual practice tool to understand digital color coding

---

## 🧱 Tech Stack

- **Frontend:** HTML, CSS, JavaScript, TailwindCSS
- **Backend:** [Supabase](https://supabase.com) (auth & database)
- **Authentication:** Email sign-up / login
- **Hosting:** [Vercel](https://vercel.com) or [Netlify](https://www.netlify.com)
- **Data Management:** JSON + Supabase tables

---

## 🛠️ Setup Instructions

```bash
# Clone the repo
git clone https://github.com/your-username/apcsp-practice-hub.git
cd apcsp-practice-hub

# Install dependencies
npm install

# Create .env file and set your Supabase credentials
touch .env
# Inside .env:
# NEXT_PUBLIC_SUPABASE_URL=your-url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key

# Start the development server
npm run dev
