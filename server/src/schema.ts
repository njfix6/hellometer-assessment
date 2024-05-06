import { buildSchema } from "graphql";

const schema = buildSchema(`

  type Store {
    orders: [Order]
    name: String!
  }

  type Order {
    arrivalTime: String!
    order: Int!
    wait: Int!
    payment: Int!
    total: Int!
  }
 

  type Query {
        getStores: [Store]
    }
`);

export default schema;
