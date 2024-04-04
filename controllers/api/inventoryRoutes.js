const router = require('express').Router();
const {  Inventory_item } = require('../../models');

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

router.delete('/delete/:id', async (req,res) => {
    try {
        await Inventory_item.destroy({
            where: {
                item_id: req.params.id
            }
        })
        res.json(200)
    } catch (err) {
        res.json(500)
    }
})

module.exports = router;