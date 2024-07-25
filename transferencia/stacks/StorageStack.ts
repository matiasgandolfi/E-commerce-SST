import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
    const bucket = new Bucket(stack, "Uploads");
    const table = new Table(stack, "OnlineShop", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  return {
    bucket,
    table
  };
}   