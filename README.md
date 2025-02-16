# Quizo - Quiz Management System

Quizo is a responsive quiz management system that allows teachers to log in, create, manage, and view their quizzes. This project is built using Next.js with TypeScript for both frontend and backend API routes, MongoDB (via Mongoose) for data storage, and ShadCN UI components with Tailwind CSS for a modern, responsive design.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

## Features

- **User Login:**
  - A simple login page with static demo credentials.
  - Form validation and error handling.
  
- **Quiz Management:**
  - Dashboard displaying all quizzes created by the teacher.
  - Create, edit, and delete quizzes via dedicated forms.
  - Basic form validations to ensure required fields are provided.

- **Responsive Design:**
  - Uses Tailwind CSS and ShadCN UI components for a clean, modern, and mobile-friendly UI.

- **Backend API:**
  - Next.js API routes for authentication and full CRUD operations for quizzes.
  - MongoDB integration using Mongoose.

## Tech Stack

- **Frontend & Backend:** Next.js, TypeScript
- **Database:** MongoDB (via Mongoose)
- **UI:** ShadCN UI components, Tailwind CSS
- **API Routes:** Next.js (App Router) API routes
- **Authentication:** Static credentials (configured in environment variables)

## Installation

1. **Clone the Repository:**

   git clone https://github.com/yourusername/quizo.git
   cd quizo
   

2. **Install Dependencies:**

   npm install
   

3. **Configure Environment Variables:**

   Create a file named `.env` in the project root and add the following:

   MONGODB_URI=
   TEACHER_USERNAME=teacher
   TEACHER_PASSWORD=123
   NEXT_PUBLIC_API_URL=http://localhost:3000


   Replace `<username>`, `<password>`, and other values with your own configuration.

4. **Run the Development Server:**

   npm run dev

   The app will start on [http://localhost:3000]

## Configuration

- **Database Connection:**  
  The connection logic is handled in `lib/dbConnect.ts` using Mongoose. Ensure your MongoDB connection string in `.env.local` is correct.

- **Static Authentication:**  
  The teacher's credentials are set via environment variables (`TEACHER_USERNAME` and `TEACHER_PASSWORD`).

## Project Structure


quizo/
├── app/
│   └── api/
│       ├── login/
│       │   └── route.ts         # Login API using static credentials
│       └── quizzes/
│           ├── route.ts         # GET (list) and POST (create) quizzes
│           └── [id]/
│               └── route.ts     # GET, PUT, DELETE a quiz by ID
├── components/
│   └── ui/                    # ShadCN UI components (Button, Input, Textarea, Card, etc.)
├── lib/
│   └── dbConnect.ts           # MongoDB connection helper
├── models/
│   └── Quiz.ts                # Mongoose model for quizzes
├── pages/
│   ├── dashboard.tsx          # Dashboard page (list quizzes)
│   ├── index.tsx              # Login page
│   └── quiz/
│       ├── new.tsx            # Create Quiz page
│       └── [id].tsx           # Edit Quiz page
├── public/
├── styles/
├── .env.local
├── package.json
├── tsconfig.json
└── README.md


## API Documentation

### Authentication API

- **POST** `/api/login`  
  **Description:** Validates teacher credentials.  
  **Request Body:**
  
  {
    "username": "teacher",
    "password": "demo123"
  }
  
  **Response:**
  - 200: `{ "message": "Login successful" }`
  - 401: `{ "message": "Invalid Credentials! Login not success" }`

### Quiz Management APIs

#### List & Create Quizzes

- **GET** `/api/quizzes`  
  **Description:** Retrieves all quizzes created by the teacher.  
  **Response:**
  
  [
    {
      "_id": "quizId",
      "title": "Quiz Title",
      "description": "Quiz Description",
      "teacher": "teacher",
      "createdAt": "2023-01-01T00:00:00.000Z"
    },
    ...
  ]
  

- **POST** `/api/quizzes`  
  **Description:** Creates a new quiz.  
  **Request Body:**
  
  {
    "title": "New Quiz",
    "description": "Description of the new quiz"
  }
  
  **Response:**  
  - 201: Returns the newly created quiz object.

#### Get, Update, Delete a Specific Quiz

- **GET** `/api/quizzes/[id]`  
  **Description:** Retrieves a specific quiz by its ID.
  
- **PUT** `/api/quizzes/[id]`  
  **Description:** Updates an existing quiz's title or description.
  **Request Body:**
  
  {
    "title": "Updated Quiz Title",
    "description": "Updated description"
  }
  

- **DELETE** `/api/quizzes/[id]`  
  **Description:** Deletes a quiz by its ID.

## Usage

1. **Login:**  
   Navigate to [http://localhost:3000](http://localhost:3000) and log in using the static credentials configured in `.env.local`.

2. **Dashboard:**  
   After logging in, you will be redirected to the Dashboard, which displays a list of quizzes.  
   - Create a new quiz using the "Create New Quiz" button.
   - Edit or delete existing quizzes using the provided options.

3. **Quiz Creation & Editing:**  
   - Use the "Create New Quiz" page to add new quizzes.
   - Edit an existing quiz by clicking on the "Edit" button on the Dashboard, which takes you to the Edit Quiz page.

## Deployment

- **Next.js Deployment:**  
  This project can be deployed on platforms like Vercel for seamless integration of both frontend and API routes.
- **Environment Variables:**  
  Ensure your environment variables are set correctly on your deployment platform.

## License

This project is licensed under the MIT License.
