export interface product{
    
    pk: string;         //PRODUCTOS#TIPO
    sk: string;         //PRODUCTO#NOMBRE
    estado: string;     //Disponible - No disponible
    productoNombre: string;     //NOMBRE
    detalle: string;
    puntuacion: number;         //Cantidad de estrellas
    precio: number;
    cantidadDisponible: number;
    createdAt: Date;
    tipo: string;
    marca: string;
}