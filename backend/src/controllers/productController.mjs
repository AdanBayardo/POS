import Product from '../models/productModel.mjs';

function productController() {
  return {
    getAll: async (req, res) => {
      try {
        const products = await Product.find({ ...req.query });
        res.json(products);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    },

    create: async (req, res) => {
      try {
        const { name, price, stock, category, description, barcode } = req.body;
        const newProduct = new Product({ name, price, stock, category, description, barcode });
        await newProduct.save();
        res.status(201).json(newProduct);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    },
    getById: async (req, res) => {
      try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        res.json(product);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    },
    updateById: async (req, res) => {
      try {
        const { productId } = req.params;
        const productUpdated = await Product.findByIdAndUpdate(
          productId,
          req.body,
          { new: true }
        );
        res.json(productUpdated);
      } catch (error) {
        res.status(500);
        res.send(error);
      }
    },
    deleteById: async (req, res) => {
      try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        
        if (!deletedProduct) {
          return res.status(404).json({ message: "Product not found" });
        }
        
        return res.status(200).json({ message: "Product deleted successfully", deletedProduct });
      } catch (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "Error deleting product", error: error.message });
      }
    }

  };
}
export default productController();
