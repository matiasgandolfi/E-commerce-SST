import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";
import { Product } from "models/product";

function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 9000); // Genera un número entre 1000 y 9999
}


export const main = handler(async (event) => {
  let data : Product

  if (event.body != null) {
    data = JSON.parse(event.body);
  }else {
    throw new Error("Invalid request: No data provided");
  }

  const fourDigitNumber = generateFourDigitNumber();


  const params = {
    TableName: Table.OnlineShop.tableName,
    Item: {
      pk: `PRODUCTS`,
      sk: `PRODUCT#${data.category}#${data.brand}#${data.name}#${fourDigitNumber}`,
      state: data.state,
      name: data.name,
      detail: data.detail,
      puntuacion: data.rating,
      price: data.price,
      quantityAvailable: data.quantityAvailable,
      category: data.category,
      brand: data.brand,
      createdAt: Date.now(),
      images: data.images
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
