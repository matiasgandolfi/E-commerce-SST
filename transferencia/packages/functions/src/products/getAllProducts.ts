import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";

export const main = handler(async (event) => {
  let data = {
    pk: "",
    sk: ""
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
  }

  const params = {
    TableName: Table.OnlineShop.tableName,
    KeyConditionExpression: "#pk = :pkPrefix AND begins_with(#sk, :skPrefix)",
    ExpressionAttributeNames: {
      "#pk": "pk",
      "#sk": "sk"
    },
    ExpressionAttributeValues: {
      ":pkPrefix": "PRODUCTOS#Televisor",
      ":skPrefix": "LG#"
    }
  };

  console.log("Query parameters:", params);

  const result : any = await dynamoDb.query(params);

  console.log("Query result:", result);  
  
  if (result.Items.length === 0) {
    throw new Error("Item not found.");
  }

  // Return the retrieved items
  return JSON.stringify(result.Items);
});
