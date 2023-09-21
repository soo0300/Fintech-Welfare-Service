FROM openjdk:11

FROM nginx

RUN rm /etc/nginx/conf.d/default.conf

RUN rm /etc/nginx/nginx.conf

COPY ./default.conf /etc/nginx/conf.d/

COPY ./nginx.conf /etc/nginx/

ARG JAR_FILE=build/libs/*.jar

COPY ${JAR_FILE} app.jar

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "/app.jar"]

CMD ["nginx", "-g", "daemon off"]