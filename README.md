# CS-465

# Architecture
The user-facing side of the app is built with Express and uses Handlebars for templating. It’s clean and straightforward, great for serving up static pages and injecting dynamic data server-side. On the flip side, the administrator component — where trips are added and edited — is a full Angular single-page application (SPA). It offers a more interactive experience and allowed me to build out dynamic forms, reusable components, and better state management for admin tasks.

MongoDB’s async nature is a great match for Node.js — it lets the app handle multiple requests at once without waiting around for the database. That means better performance and a smoother experience for users, especially when things scale up.

# Functionality
JSON (JavaScript Object Notation) might look like JavaScript, but it’s really just a lightweight format for storing and exchanging data, especially between the back and front ends. 

Throughout the process, I constantly refactored code, especially in Angular,to pull out repetitive logic into shared services and components. Creating reusable UI pieces saved me tons of time and kept things DRY (Don’t Repeat Yourself), which made future changes faster and less error-prone.

# Testing
When it came to API testing, I used tools like Postman to hit endpoints and verify that my routes were working properly, especially for GET, POST, PUT, and DELETE requests. Once I layered in JWT authentication, testing became trickier since every secured route needed a valid token. Understanding how HTTP methods, secure endpoints, and middleware tie together was key to building a stable, secure app that only lets authorized users perform certain actions.

# Reflection
This course gave me a huge confidence boost! Building out a full stack project from scratch showed me I can hang in a real-world dev environment. I got comfortable working with Angular, Node.js, and MongoDB, and learned how to design APIs, structure a project, and secure a backend. All of that helps me stand out more as I pivot into tech and chase roles in full stack or backend development.
