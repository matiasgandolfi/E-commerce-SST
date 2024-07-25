
/**
 * Esta funcion calcula el precio total de nuestra nueva orden
 * @param {Array} productos cartProduct: Array of Objets
 * @returns {number} Total price
 */
export const totalPrice = (productos) => {
    let sum = 0;
    productos.forEach(producto => {
        sum += producto.price
    })
    return sum
}