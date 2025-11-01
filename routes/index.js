const router = require('express').Router();

router.get('/', (req, res) => {
  //#swagger.tags=['Hello World']
  res.send('Hello world.');
});

router.use('/contacts', require('./contactsRoute'));
router.use('/api-docs', require('./swagger'));

module.exports = router;
