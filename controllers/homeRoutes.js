const router = require('express').Router();
const { User, Item, Inventory, Invoice } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      include: [
        {
          model: Inventory,
        }
      ],
    
    });
    

    const user = userData.get({plain:true})
    
    res.render('homepage', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
      include: [
        {
          model: Invoice,
        }
      ],
    
    });
    

    const user = userData.get({plain:true})
    
    res.render('invoice', {
      user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});



router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/inventory', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
} 

try {
  const itemData = await Item.findAll()
  const items = itemData.map(item => item.get())
  console.log(items)
  res.render('inventory', {items});
} catch (err) {
  res.json(error)
}
});

router.get('/item',withAuth, async (req,res) =>{
  res.render('homepage');
});

router.get('/invoice', withAuth, async (req,res) => {
  res.render('homepage');
})
module.exports = router;
