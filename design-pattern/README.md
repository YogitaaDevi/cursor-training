# Design Pattern Demo (Spring Boot)

## Objective
Implement and evaluate 3 design patterns in a Java Spring Boot codebase:
1. **Strategy Pattern**: Payment processing (Credit Card, PayPal, Bank Transfer)
2. **Observer Pattern**: Event notification system
3. **Factory Pattern**: Database connection factory

## Folder Structure
- `controller/` — REST controllers
- `service/` — Business logic and pattern implementations
- `model/` — Domain models/entities
- `repository/` — Data access layer
- `dto/` — Data transfer objects (if needed)
- `pattern/` — (optional) Shared pattern interfaces/abstracts

## How to Run
1. Build the project:
   ```
   mvn clean install
   ```
2. Run the application:
   ```
   mvn spring-boot:run
   ```
3. Test endpoints using Postman/curl or run unit tests:
   ```
   mvn test
   ```

## Evaluation
Each pattern includes:
- Interface/abstract class definitions
- Concrete implementations
- Client code example
- Unit tests
- Explanation and assessment 