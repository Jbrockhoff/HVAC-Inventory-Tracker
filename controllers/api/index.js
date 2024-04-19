const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const inventoryRoutes = require('./inventoryRoutes');
const invoiceRoutes = require('./invoiceRoutes');

router.use('/users', userRoutes);
router.use('/item', itemRoutes);
router.use('/inventory',inventoryRoutes);
router.use('/invoice',invoiceRoutes);

module.exports = router;
