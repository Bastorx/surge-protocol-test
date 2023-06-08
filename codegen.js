"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    overwrite: true,
    schema: "https://api.thegraph.com/subgraphs/name/somemoecoding/surgeswap-v2",
    documents: "src/gql/*.ts",
    generates: {
        "./src/gql/codegen/": {
            preset: "client",
            plugins: [],
        },
        "./graphql.schema.json": {
            plugins: ["introspection"],
        },
    },
};
exports.default = config;
