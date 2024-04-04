const router = require('express').Router();
const { Invoice } = require('../../models');
const withAuth = require('../../utils/auth');

//View all invoices from user
router.get('/', withAuth, async (req, res) => {
  try {
      const invoicesData = await Invoice.findAll({
          where: { user_id: req.session.user_id }
      });

      res.status(200).json(invoicesData);
  } catch (err) {
      res.status(500).json(err);
  }
});

//Create new invoice
router.post('/', withAuth, async (req, res) => {

    try {
      const newInvoice = await Invoice.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newInvoice);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  //DELETE route to delete an invoice by ID
  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const invoiceData = await Invoice.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!invoiceData) {
        res.status(404).json({ message: 'No invoice found with this id!' });
        return;
      }
  
      res.status(200).json(invoiceData);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;