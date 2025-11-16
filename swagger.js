import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "Reading API",
    desccription: "CSE341 Project 2 - API to track books that readers have read",
  },
  host: "cse341contactsw1.onrender.com",
  schemes: ["https"],
};

const ouput = "./swagger-out.json";
const routes = ["./routes/index.js"];

swaggerAutogen()(ouput, routes, doc);
