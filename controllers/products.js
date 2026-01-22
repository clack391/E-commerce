const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('products').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('products').find({ _id: userId }).toArray();
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            brand: req.body.brand,
            rating: req.body.rating
        };
        const response = await mongodb.getDb().collection('products').insertOne(product);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const product = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            brand: req.body.brand,
            rating: req.body.rating
        };
        const response = await mongodb.getDb().collection('products').replaceOne({ _id: userId }, product);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('products').deleteOne({ _id: userId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the product.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createProduct,
    updateProduct,
    deleteProduct
};
