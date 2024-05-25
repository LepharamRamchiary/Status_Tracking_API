const Product = require('../models/product');
const { sendEmail } = require('../utils/emailService');

exports.createProduct = async (req, res) => {
    const { name, description, price, userId } = req.body;
    const trackingNumber = `TRACK${Date.now()}`;

    try {
        const product = new Product({ name, description, price, trackingNumber, userId });
        await product.save();

        // Send notification email
        // sendEmail(product._id, 'created');

        res.status(201).json({ productId: product._id, trackingNumber, message: 'Product created successfully' });
    } catch (err) {
        console.error('Error creating product:', err);  // Log the error for debugging
        res.status(500).json({ error: `Error creating product: ${err.message}` });
    }
};
 
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching product' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ error: 'Error updating product' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting product' });
    }
};
