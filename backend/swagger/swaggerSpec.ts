
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "",
            },
            contact: {
                name: "Dzmitry Viartseika",
                url: "",
                email: "",
            },
        },
        servers: [
            {
                url: "https://localhost:4000",
                description: 'Local dev'
            },
            {
                url: "production",
                description: 'Production'
            },
        ],
    },
    apis: ["./routes/*.ts"],
};

export default options;