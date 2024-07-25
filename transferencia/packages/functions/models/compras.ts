import { Product } from "./product";

export interface Compra{
    pk: string;     //COMPRAS
    sk: string;     //USER#ESTADO#ID
    fecha?: Date;
    estado: string;
    direccion: string;
    apellido: string;
    nombre: string;
    email: string;
    telefono: string;
    pedido : Product[];
}