import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '2d7dcb5e1d33ee3b466b01e105a9e5510f9cf976', queries,  });
export default client;
  