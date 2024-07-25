import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      function: {
        bind: [table],
      },
    },
    routes: {
      "POST /products": "packages/functions/src/products/createProduct.main",
      "GET /products": "packages/functions/src/products/getAllProducts.main",
      //"GET /product/{id}": "packages/functions/src/getProduct.main",
      "DELETE /products/{id}": "packages/functions/src/products/deleteProduct.main",
    }
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return { api };
}
