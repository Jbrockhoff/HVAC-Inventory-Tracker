const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');

//Create new item
router.post('/', withAuth, async (req, res) => {
  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newItem);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Deletes existing item
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
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