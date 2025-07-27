import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API DBStudents-project",
      version: "1.0.0",
      description: "Документация DBStudents-project API",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Локальный сервер",
      },
    ],
  },
  apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs: http://localhost:${process.env.PORT}/api-docs`);
}
