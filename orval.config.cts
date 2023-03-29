module.exports = {
  petstore: {
    output: {
      mode: "tags-split",
      target: "src/services",
      schemas: "src/model",
      client: "react-query",
      mock: true,
      override: {
        mutator: {
          path: "./axios.config.ts",
          name: "customInstance",
        },
      },
    },
    input: {
      target: "https://petstore3.swagger.io/api/v3/openapi.json",
    },
  },
};
