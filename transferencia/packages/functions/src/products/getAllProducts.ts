import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";



const setParams : any = (evento : any) => {
  let data = {
    pk: null,
    sk: null,
    marca: null
  };
  
  if(evento.body) {
    data = JSON.parse(evento.body);
  }

  if(data.sk){
    const parametros = {
      TableName: Table.OnlineShop.tableName,
      KeyConditionExpression: "#pk = :pkPrefix AND begins_with(#sk, :skPrefix)",
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk"
      },
      ExpressionAttributeValues: {
        ":pkPrefix": "PRODUCTOS#Televisor",
        ":skPrefix": `${data.sk}`

      }
    };
    console.log(1)
    return parametros;
  }
  else if(data.sk && data.marca){
    const parametros = {
      TableName: Table.OnlineShop.tableName,
      KeyConditionExpression: "#pk = :pkPrefix AND begins_with(#sk, :skPrefix)",
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk"
      },
      ExpressionAttributeValues: {
        ":pkPrefix": "PRODUCTOS#Televisor",
        ":skPrefix": `${data.sk}#${data.marca}`
      }
    };
    console.log(2);
    return parametros;
  }
  else {    //Traer todos
    const parametros = {
      TableName: Table.OnlineShop.tableName,
      KeyConditionExpression: "#pk = :pkPrefix AND begins_with(#sk, :skPrefix)",
      ExpressionAttributeNames: {
        "#pk": "pk",
        "#sk": "sk"
      },
      ExpressionAttributeValues: {
        ":pkPrefix": "PRODUCTS",
        ":skPrefix" : "PRODUCT"
      }
    };
    console.log(3)
    return parametros;
  }
}






export const main = handler(async (event) => {
  const params = setParams(event);

  console.log("Query parameters:", params);

  const result : any = await dynamoDb.query(params);

  console.log("Query result:", result);  
  
  if (result.Items.length === 0) {
    throw new Error("Item not found.");
  }

  // Return the retrieved items
  return JSON.stringify(result.Items);
});
