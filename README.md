# Test Assignment project for JavaScript Ninjas

# Next.js test project demonstrating CRUD functionality, backend interactions using Redux Toolkit + RTK Query, UI responsiveness

# Project is being deployed and can be accessed via link: https://ninjas-omega-black.vercel.app/

## Table of Contents

    - [Features]
    - [Tech Stack]
    - [Getting Started]
    - [Scripts]
    - [Folder Structure]

## Features

    Core Features:
        - Create - add new items
        - Read - view list of items
        - Update - edit existing items
        - Delete - delete existing items

    UX & UI Features:
        - Responsive Design - works seamlessly on desktop and mobile
        - User Feedback - toasts for success or error actions
        - Loading States - spinners while fetching data or submitting forms

    Additionally:
        - Pagination, Sorting
        - Routing - dynamic routes for individual item pages
        - File upload - upload images to the cloud

## Tech Stack

    - Next.js 15
    - React 19
    - Redux Toolkit
    - ShadCN
    - Prisma + PostgreSQL
    - JavaScript (ES6+) + TypeScript

## Getting Started

    ### Prerequisites
        - Node.js 18+
        - npm or yarn

    ### Installation
        # Clone the repo:
            git clone https://github.com/Gagun45/ninjas.git

        # Navigate to the project folder
            cd ninjas

        # Install dependencies
            npm install
            or
            yarn install

        # Generate prisma client
            npx prisma generate
            or
            yarn prisma generate

        # Configure environment variables. To access all features of this project you need to configure the required environment variables. Without them some features may not work as expected. If you dont have the values, you can skip the step. Otherwise, create .env file and fill in the values:
            code .env

        # Run development server
            npm run dev
            or
            yarn dev

        # Open http://localhost:3000 to see it in the browser

## Scripts

    - npm run dev - run development server
    - npm run build - build projectt for production
    - npm run start - start production server
    - npm run lint - run ESLint

## Folder Structure

    ninjas/
    ├─ app/                 # Next.js App directory (pages/routes)
    ├─ components/          # Reusable UI Components
    ├─ forms/               # Forms used across the app
    ├─ hooks/               # Custom React hooks
    ├─ lib/                 # Server actions, configuration files (types, schemas, constants)
    ├─ prisma/              # Folder containing prisma.schema file
    ├─ providers/           # App providers
    ├─ public/              # Static assets
    ├─ redux/               # Redux configuration
    ├─ next.config.mjs
    ├─ package.json
    └─ README.md
