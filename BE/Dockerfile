FROM gradle:8-jdk11 as builder
WORKDIR /app

COPY build.gradle /app
COPY src ./src
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

FROM openjdk:11
COPY --from=builder /app/build/libs/*.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","/app/app.jar"]