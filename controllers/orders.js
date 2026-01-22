const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().collection('orders').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('orders').find({ _id: orderId }).toArray();
        if (result.length > 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result[0]);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createOrder = async (req, res) => {
    try {
        const order = {
            userEmail: req.body.userEmail,
            totalAmount: req.body.totalAmount,
            items: req.body.items,
            status: req.body.status,
            orderDate: req.body.orderDate
        };
        const response = await mongodb.getDb().collection('orders').insertOne(order);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const order = {
            userEmail: req.body.userEmail,
            totalAmount: req.body.totalAmount,
            items: req.body.items,
            status: req.body.status,
            orderDate: req.body.orderDate
        };
        const response = await mongodb.getDb().collection('orders').replaceOne({ _id: orderId }, order);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const orderId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('orders').deleteOne({ _id: orderId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the order.');
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createOrder,
    updateOrder,
    deleteOrder
};
