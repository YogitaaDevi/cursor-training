# Legacy Code Modernization

This project demonstrates how to transform legacy code using modern practices with Spring Boot 3.x (Java 17).

## Objective
- Analyze legacy code for code smells, security vulnerabilities, performance issues, maintainability problems, missing error handling, and outdated language features.
- Modernize legacy code following best practices: modern Java features, error handling, input validation, readability, maintainability, documentation, unit tests, SOLID principles, and security.

## Project Structure
- `controller/` — REST controllers
- `service/` — Business logic and modernization analysis
- `model/` — Request and response models
- `repository/` — (Add as needed for persistence)

## Endpoints
- `POST /api/modernization/analyze` — Analyze legacy code
- `POST /api/modernization/modernize` — Modernize legacy code

## Example Request
```
POST /api/modernization/analyze
Content-Type: application/json

{
  "legacyCode": "public void legacyMethod() { /* ... */ }"
}
```

## Example Response
```
{
  "result": "Analysis result for: public void legacyMethod() { /* ... */ }"
}
```

## How to Run
1. Make sure you have Java 17+ and Maven installed.
2. In the project root, run:
   ```
   mvn spring-boot:run
   ```
3. The app will start on [http://localhost:8080](http://localhost:8080)

## Customization
- Add your own analysis and modernization logic in `ModernizationService`.
- Extend models and endpoints as needed.

## License
MIT 