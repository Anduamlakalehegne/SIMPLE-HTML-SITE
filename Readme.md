# Search Suggestion Application

This project implements a simple **Search Suggestion feature** similar to Google's autocomplete. The app consists of a full-stack solution using **Node.js**, **TypeScript**, **SCSS**, and AJAX to fetch filtered data from an API.

---

## 📚 Features

- **Dynamic Search Suggestions**: Provides real-time suggestions as the user types.
- **Backend API**: Filters data fetched from `https://jsonplaceholder.typicode.com` based on user input.
- **Frontend**: A clean and responsive UI for displaying suggestions.
- **Unit Tests**: Bonus tests included to validate backend filtering logic.

---

## 🚀 Tech Stack

- **Frontend**: HTML, SCSS, TypeScript
- **Backend**: Node.js, Express, Axios
- **Testing**: Jest

---

## 🛠️ Setup Instructions

### Prerequisites
- [Node.js 22+](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Steps to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Anduamlakalehegne/SIMPLE-HTML-SITE
   cd SIMPLE-HTML-SITE

2. **Clone the Repository**
   ```bash
   npm install
3. **Compile TypeScript**
   ```bash
   npx tsc
2. **Run the Backend**
   ```bash
   npx ts-node --transpile-only node/index.ts
3. **🧪 Running Tests**
   ```bash
   npx jest
## 🌐 API Workflow
- **User Input**: The frontend captures the user's input and sends a query to the Node.js API.

- **Backend Filtering**: The Node.js API fetches data from JSONPlaceholder and filters it based on the name field.

- **Display Suggestions**: The filtered results are dynamically displayed on the frontend.
   
