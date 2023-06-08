import { graphql } from "./codegen";

export default graphql(`
  query TokenQuery($id: ID!) {
    token(id: $id, subgraphError: deny) {
      tokenDayData {
        date
        dailyVolumeUSD
        priceUSD
        totalLiquidityUSD
      }
    }
  }
`);
