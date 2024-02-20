const express = require("express");
const router = express.Router();
const Product = require('../models/product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - brand
 *         - ram
 *         - camera
 *         - network
 *         - fingerprint
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated unique identifier of the product.
 *         name:
 *           type: string
 *           description: The name of the product.
 *         brand:
 *           type: string
 *           description: The brand of the product.
 *         ram:
 *           type: integer
 *           description: The RAM capacity of the product in gigabytes.
 *         camera:
 *           type: string
 *           description: The camera specification of the product.
 *         network:
 *           type: string
 *           description: The network connectivity of the product.
 *         fingerprint:
 *           type: boolean
 *           description: Indicates whether the product has a fingerprint sensor.
 *         price:
 *           type: number
 *           description: The price of the product.
 *       example:
 *         _id: "65d34a7cbe5329a2e035c756"
 *         name: Galaxy S21
 *         brand: Samsung
 *         ram: 8
 *         camera: 64 MP
 *         network: 5G
 *         fingerprint: true
 *         price: 799
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of all products.
 *     description: Retrieve a list of all products from the database.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID.
 *     description: Retrieve a product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product.
 *     description: Create a new product and save it to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: The created product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid product data.
 */
router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    brand: req.body.brand,
    ram: req.body.ram,
    camera: req.body.camera,
    network: req.body.network,
    fingerprint: req.body.fingerprint,
    price: req.body.price
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID.
 *     description: Update an existing product in the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: The updated product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found.
 */
router.put('/:id', getProduct, async (req, res) => {
  try {
    const updatedProduct = await res.product.set(req.body).save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID.
 *     description: Delete a product from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       404:
 *         description: Product not found.
 */
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.product = product;
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = router;
