import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";
import { Purchase } from "../../models/purchase "
import { Product } from "a../../models/product";

function generateFourDigitNumber() {
  return Math.floor(1000 + Math.random() * 99999999999);
}



export const main = handler(async (event) => {
  let data : Purchase

  if (event.body != null) {
    data = JSON.parse(event.body);
  }else {
    throw new Error("Invalid request: No data provided");
}

const fourDigitNumber = generateFourDigitNumber();


const totalPrice = (productos : Product[]) =>{
  let sum = 0;
  productos.forEach(producto => {
      sum += producto.price
  })
  return sum
}

  const params = {
    TableName: Table.OnlineShop.tableName,
    Item: {
      pk: `PURCHASE`,
      sk: `USER#${data.state}#${fourDigitNumber}`,
      createdAt: Date.now,
      address: data.address,
      lastName: data.lastName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      totalPrice: totalPrice(data.products),
      products: data.products.map(product => ({
          pk: product.pk,
          sk: product.sk,
          state: product.state,
          name: product.name,
          detail: product.detail,
          rating: product.rating,
          price: product.price,
          quantityAvailable: product.quantityAvailable,
          createdAt: product.createdAt,
          category: product.category,
          brand: product.brand,
          images: product.images
      })),
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
