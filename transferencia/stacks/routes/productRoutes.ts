export const productRoutes = {
    "POST /products": "packages/functions/src/products/createProduct.main",
    "GET /products": "packages/functions/src/products/getAllProducts.main",
    //"GET /product/{id}": "packages/functions/src/getProduct.main",
    "DELETE /products/{id}": "packages/functions/src/products/deleteProduct.main",
};