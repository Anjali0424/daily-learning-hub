# 📚 Daily Learning Hub

Daily Learning Hub is a full-stack learning platform designed to help students develop technical skills, practice coding, explore learning resources, and track their learning journey in one place.

The platform aims to make learning more interactive, organized, and accessible through a modern user interface and a scalable backend architecture.

## 🚀 Features

- **Interactive Learning:** Access structured learning modules and educational resources.
- **YogaMaster:** Webcam-based yoga pose detection with real-time feedback using MoveNet.
- **Progress Tracking:** Track learning activities and personal progress.
- **User-Friendly Interface:** Responsive and intuitive UI built with React.
- **Scalable Architecture:** Monorepo structure for managing multiple applications and shared packages.
- **Backend API:** RESTful APIs powered by Spring Boot.
- **Future Enhancements:** Authentication, personalized learning recommendations, quizzes, and gamified learning.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| Vite | Frontend build tool |
| Java | Backend programming |
| Spring Boot | Backend framework |
| REST API | Frontend–backend communication |
| MoveNet | Yoga pose detection |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
daily-learning-hub/
│
├── apps/
│   ├── web/              # React + Vite frontend
│   ├── api/              # Spring Boot backend
│   └── admin/            # Admin application
│
├── packages/
│   ├── ui/               # Shared UI components
│   ├── types/             # Shared types and DTOs
│   ├── utils/             # Common utilities
│   └── config/            # Shared configurations
│
├── docs/                   # Project documentation
│
├── README.md
└── .gitignore
```

## ⚙️ Installation and Setup

### Prerequisites

- Node.js and npm
- Java JDK
- Maven
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd daily-learning-hub
```

### 2. Setup Frontend

```bash
cd apps/web
npm install
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

### 3. Setup Backend

Navigate to the backend directory:

```bash
cd apps/api
```

Run the Spring Boot application:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

The backend will start on its configured port.

## 🏗️ System Architecture

```text
         ┌─────────────────────────┐
         │         User           │
         └────────────┬────────────┘
                      │
                      ▼
         ┌─────────────────────────┐
         │   React + Vite (Web)   │
         └────────────┬────────────┘
                      │
                 REST APIs
                      │
                      ▼
         ┌─────────────────────────┐
         │   Spring Boot Backend  │
         └────────────┬────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
  ┌──────────────┐       ┌────────────────┐
  │  Database   │       │  AI Modules   │
  │ (Planned)    │       │  MoveNet      │
  └──────────────┘       └────────────────┘
```

## 🎯 Objectives

- Provide a centralized platform for daily learning.
- Encourage consistent skill development.
- Integrate AI-powered interactive learning experiences.
- Build a scalable and maintainable full-stack application.
- Improve student engagement through personalized learning.

## 🔮 Future Scope

- AI-powered personalized learning paths.
- Online coding practice and assessments.
- Gamification, badges, and leaderboards.
- Student dashboard with analytics.
- Authentication and role-based access control.
- Deployment using cloud infrastructure.

## 👩‍💻 Developer

**Anjali Durgam**

B.Tech Computer Science Engineering  
Vishwakarma Institute of Technology, Pune

---

⭐ If you find this project interesting, feel free to star the repository!
