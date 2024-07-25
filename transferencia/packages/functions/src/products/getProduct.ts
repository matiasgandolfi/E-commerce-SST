import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    pk:"",
    sk:""
  };

  if (event.body != null){
    data = JSON.parse(event.body);
  };

  const params = {
    TableName: Table.OnlineShop.tableName,
    Key: {
      pk: "PRODUCTOS#Televisor",
      sk: "PRODUCTO#SAMSUNG",
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return JSON.stringify(result.Item);
});