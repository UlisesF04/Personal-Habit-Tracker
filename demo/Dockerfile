# Render + Aiven — Java 21 + Spring Boot 3.5
FROM eclipse-temurin:21-jdk-jammy AS build
WORKDIR /app
COPY .mvn .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw
# cache dependencies
RUN ./mvnw dependency:go-offline -B
COPY src src
RUN ./mvnw package -DskipTests -B

FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
# Render injects PORT=10000; Spring reads server.port=${PORT:8080}
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
