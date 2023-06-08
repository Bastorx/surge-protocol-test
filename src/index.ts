import { program } from "commander";
import { GraphQLClient } from "graphql-request";
import { Endpoints } from "./constants/endpoints";
import getTokenDataHistory from "./gql/getTokenDataHistory";

program
  .option(
    "-t, --tokenAddress <tokenAddress>",
    "token address",
    "0x4ceacf951294f78bde6b51863af8fdc03d54728e",
  )
  .option(
    "-e, --endpoint <endpoint>",
    "GraphQL endpoint Surge Protocol",
    Endpoints.BSC,
  );

const options = program.opts();

if (!Object.values(Endpoints).includes(options.endpoint)) {
  console.error("Endpoint not valid");
  process.exit(-1);
}

const getTokenHistory = async (endpoint: Endpoints, tokenAddress: string) => {
  console.log("endpoint", endpoint, "tokenAddress", tokenAddress);
  const client = new GraphQLClient(endpoint);
  const res = await client.request<any>(getTokenDataHistory, {
    id: tokenAddress,
  });
  return res?.token?.tokenDayData || [];
};

async function retrieveHistoricalIndicators() {
  try {
    const history: any[] = await getTokenHistory(
      options.endpoint,
      options.tokenAddress,
    );
    for (const item of history) {
      console.log(item);
    }
    console.log(
      "endpoint",
      options.endpoint,
      "tokenAddress",
      options.tokenAddress,
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

retrieveHistoricalIndicators().then(() => process.exit(0));
