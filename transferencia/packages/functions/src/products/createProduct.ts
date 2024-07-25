import { Table } from "sst/node/table";
import handler from "@transferencia/core/handler";
import dynamoDb from "@transferencia/core/dynamodb";


//AUTOINCREMENTAL
//begin_whit pk???


export const main = handler(async (event) => {
  let data = {
    productoNombre: "",
    tipo: "",
    estado: true,
    detalle: "",
    puntuacion: 0,
    precio: 0,
    cantidadDisponible: 0,
    marca: "",
    imagen: ""
  };

  if (event.body != null) {
    data = JSON.parse(event.body);
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
