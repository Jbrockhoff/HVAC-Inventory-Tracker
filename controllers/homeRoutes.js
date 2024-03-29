const router = require('express').Router();
const { User, Item, Inventory } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      include: [
        {
          model: Inventory
        }
      ]
    });

    const users = userData.map((item) => item.get({ plain: true }));
    console.log(users)
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/item',withAuth, async (req,res) =>{
  res.render('homepage');
})
module.exports = router;
