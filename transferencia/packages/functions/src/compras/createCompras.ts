import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";
import { Compra } from "../../models/compras"

export const main = handler(async (event) => {
  let data : Compra

  if (event.body != null) {
    data = JSON.parse(event.body);
  }else {
    throw new Error("Invalid request: No data provided");
}

  const params = {
    TableName: Table.OnlineShop.tableName,
    Item: {
      pk: `COMPRAS`,
      sk: `USER#${data.estado}`,
      fecha: data.fecha,
      direccion: data.direccion,
      apellido: data.apellido,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      pedido: data.pedido.map(product => ({
          pk: product.pk,
          sk: product.sk,
          estado: product.estado,
          productoNombre: product.productoNombre,
          detalle: product.detalle,
          puntuacion: product.puntuacion,
          precio: product.precio,
          cantidadDisponible: product.cantidadDisponible,
          createdAt: product.createdAt,
          tipo: product.tipo,
          marca: product.marca,
          imagen: product.imagen
      })),
    },
  };

  await dynamoDb.put(params);

  return JSON.stringify(params.Item);
});
