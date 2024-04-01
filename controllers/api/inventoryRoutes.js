const router = require('express').Router();
const { Inventory, Item } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all inventory items
router.get('/inventory', withAuth, async (req, res) => {
    try {
        const inventoryData = await Inventory.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: Item }]
        });

        const items = inventoryData.map((inventory) => inventory.Items);
        const logged_in = true; // Set to true if the user is logged in

        res.render('inventory', { items, logged_in });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to create new inventory
router.post('/inventory', withAuth, async (req, res) => {
    try {
        const newInventory = await Inventory.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newInventory);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to delete inventory by ID
router.delete('/inventory/:id', withAuth, async (req, res) => {
    try {
        const inventoryData = await Inventory.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!inventoryData) {
            res.status(404).json({ message: 'No inventory found with this id!' });
            return;
        }

        res.status(200).json(inventoryData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to delete item by ID
router.delete('/item/:id', withAuth, async (req, res) => {
    try {
        const itemData = await Item.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!itemData) {
            res.status(404).json({ message: 'No item found with this id!' });
            return;
        }

        res.status(200).json(itemData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;