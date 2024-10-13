import { Router } from 'express';
import productController from '../controllers/productController.mjs';

function productsRouter() {
  const productsRoutes = Router();

  productsRoutes
    .route('/products')
    .get(productController.getAll)
    .post(productController.create);
  productsRoutes
    .route('/products/:productId')
    .get(productController.getById)
    .put(productController.updateById)
    .delete(productController.deleteById);

  return productsRoutes;
}
export default productsRouter();