const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World! The E-commerce API is running.');
});

router.use('/products', require('./products'));
router.use('/orders', require('./orders'));

module.exports = router;
