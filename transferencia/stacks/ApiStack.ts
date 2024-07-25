import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";
import { productRoutes } from "./routes/productRoutes";
import { comprasRoutes } from "./routes/comprasRoutes";

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
      ...productRoutes,
      ...comprasRoutes,
    }
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return { api };
}
