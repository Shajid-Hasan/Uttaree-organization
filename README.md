# Uttaree Business Portfolio

A professional, animated business portfolio built with the MERN stack showcasing Uttaree's founding members, shareholders, and business projects.

## Features

- ✨ Elegant animated hero section with gradient backgrounds
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- 🚀 Smooth animations using Framer Motion
- 💼 Project showcase (Running & Upcoming)
- 👥 Member directory (20 Founders + 22 Shareholders)
- 🔄 RESTful API with MongoDB

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Routing**: React Router DOM

## Projects Showcased

1. **Paddy Project** - Sustainable agriculture
2. **Uttaree Electronics** - Electronics retail & service
3. **Mango Carret** - Food processing
4. **Uttaree Art School** - Art education (Upcoming)

## Installation

### Prerequisites
- Node.js (v18+)
- MongoDB

### Setup

1. Install dependencies:
```bash
npm run install-all
```

2. Create `.env` file in root:
```
MONGODB_URI=mongodb://localhost:27017/uttaree
PORT=5000
```

3. Start MongoDB:
```bash
mongod
```

4. Run the application:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and backend on `http://localhost:5000`

## Project Structure

```
uttaree-portfolio/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Members.jsx
│   │   │   └── Footer.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── server/                # Express backend
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js
└── package.json

```

## API Endpoints

- `GET /api/members` - Get all members
- `POST /api/members` - Add new member
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Add new project

## Customization

- Update colors in `client/tailwind.config.js`
- Modify animations in component files
- Add more projects/members through the API

## Team

- 20 Founding Members
- 22 Shareholders
- Total: 42 Team Members

---

Built with ❤️ for Uttaree
