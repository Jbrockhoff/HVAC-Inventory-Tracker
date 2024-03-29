const router = require('express').Router();
const userRoutes = require('./userRoutes');
const itemRoutes = require('./itemRoutes');
const inventoryRoutes = require('./inventoryRoutes');

router.use('/users', userRoutes);
router.use('/item', itemRoutes);
router.use('/inventory',inventoryRoutes);

module.exports = router;
