# User Management Microservice

## Features
- RESTful CRUD for users
- JWT authentication
- PostgreSQL database
- Input validation & error handling
- Logging
- Unit tests

## Project Structure
```
user-management/
├── src/
│   ├── main/
│   │   ├── java/com/example/usermanagement/
│   │   │   ├── controller/
│   │   │   ├── service/
│   │   │   ├── repository/
│   │   │   ├── model/
│   │   │   ├── security/
│   │   │   ├── exception/
│   │   │   └── UserManagementApplication.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test/
│       └── java/com/example/usermanagement/
│           ├── controller/
│           └── service/
├── pom.xml
└── README.md
```

## Setup

1. Clone the repo
2. Configure `src/main/resources/application.properties`:
   ```
   spring.datasource.url=jdbc:postgresql://localhost:5432/userdb
   spring.datasource.username=youruser
   spring.datasource.password=yourpassword
   spring.jpa.hibernate.ddl-auto=update
   jwt.secret=your_jwt_secret
   ```
3. Run PostgreSQL and create the database:
   ```sql
   CREATE DATABASE userdb;
   ```
4. Build and run:
   ```sh
   mvn clean install
   mvn spring-boot:run
   ```
5. API available at `http://localhost:8080/api`

## API Endpoints
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and get JWT
- `GET /api/users` — List all users (protected)
- `GET /api/users/{id}` — Get user by ID (protected)
- `POST /api/users` — Create user (protected)
- `PUT /api/users/{id}` — Update user (protected)
- `DELETE /api/users/{id}` — Delete user (protected)

## Testing

```
mvn test
``` 