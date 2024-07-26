import { Product } from "./product";

export interface Purchase {
    pk: string;     //COMPRAS
    sk: string;     //USER#ESTADO#ID
    createdAt?: Date;
    state: string;
    address: string;
    lastName: string;
    name: string;
    email: string;
    phone: string;
    products : Product[];
}