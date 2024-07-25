import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.OnlineShop.tableName,
    Key: {
      pk: "PRODUCTOS#Televisor",
      sk: "PRODUCTO#"+event?.pathParameters?.id,
    },
  };

  console.log(params.Key.sk)

  await dynamoDb.delete(params);

  return JSON.stringify({ status: true });
});