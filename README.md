# Personal-Habit-Tracker

Backend REST API for managing personal habits with multi-user support.  
Built with Spring Boot and MySQL as part of my backend learning journey.  

## Project-Goal  

This project was built to practice real-world backend development concepts such as:  

- REST API design
- Database modeling with JPA
- Entity relationships
- Authentication-ready architecture
- Clean layered architecture (Controller / Service / Repository)

The goal is to evolve this project into a production-ready SaaS backend with authentication and user isolation.

## Tech-Stack

- Java 21
- Spring Boot
- Spring Data JPA
- MySQL
- Hibernate
- Lombok
- Maven
- Postman (API testing)

## Features

- User and Habit entity relationship (Many-to-One)
- Full CRUD for habits
- Persistent MySQL database
- Clean layered architecture
- Repository query methods with Spring Data JPA

## Architecture

- controller → handles HTTP requests  
- service → business logic  
- repository → database access  
- entity → domain models  
- config → application configuration  

## Running the Project
1. Clone the repository
2. Create a MySQL database named `habit_tracker`
3. Configure application.properties
4. Run the Spring Boot application
5. Test endpoints using Postman