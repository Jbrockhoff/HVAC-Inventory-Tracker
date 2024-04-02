const router = require('express').Router();
const { Inventory, Item, Inventory_item } = require('../../models');
const withAuth = require('../../utils/auth');


// Route to create new inventory
router.post('/', withAuth, async (req, res) => {
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

router.post('/add', async (req, res) => {
    console.log(req.body)
    try {
        const newInventoryItem = await Inventory_item.create({
            inventory_id: parseInt(req.body.inventory_id),
            item_id:parseInt(req.body.item_id)
        });

        res.status(200).json(newInventoryItem);
    } catch (err) {
        console.log(err)
        res.status(400).json(err);
    }
});

// Route to delete inventory by ID
router.delete('/:id', withAuth, async (req, res) => {
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