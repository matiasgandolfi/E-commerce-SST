import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";
import { Product } from "models/product";

export const main = handler(async (event) => {
  let data : Product

  if (event.body != null) {
    data = JSON.parse(event.body);
  }else {
    throw new Error("Invalid request: No data provided");
  }

  const params = {
    TableName: Table.OnlineShop.tableName,
    Item: {
      pk: `PRODUCTOS`,
      sk: `${data.tipo}#${data.marca}#${data.productoNombre}`,
      estado: data.estado,
      productoNombre: data.productoNombre,
      detalle: data.detalle,
      puntuacion: data.puntuacion,
      precio: data.precio,
      cantidadDisponible: data.cantidadDisponible,
      tipo: data.tipo,
      marca: data.marca,
      createdAt: Date.now(),
      imagen: data.imagen
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
