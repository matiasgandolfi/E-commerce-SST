export interface Product{
    
    pk: string;         //PRODUCTOS#TIPO
    sk: string;         //PRODUCTO#NOMBRE
    state: string;     //Disponible - No disponible
    name: string;     //NOMBRE
    detail: string;
    rating: number;         //Cantidad de estrellas
    price: number;
    quantityAvailable: number;
    createdAt: Date;
    category: string;
    brand: string;
    images: [];
}