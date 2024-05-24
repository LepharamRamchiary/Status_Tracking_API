const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), productController.createProduct);
router.get('/', authMiddleware, productController.getAllProducts);
router.get('/:productId', authMiddleware, productController.getProductById);
router.put('/:productId', authMiddleware, roleMiddleware(['admin']), productController.updateProduct);
router.delete('/:productId', authMiddleware, roleMiddleware(['admin']), productController.deleteProduct);

module.exports = router;
