const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/cart', require('./cart'))
router.use('/cartsproducts', require('./carts_products'))
router.use('/orders', require('./orders'))
router.use('/ordersproducts', require('./orders_products'))
router.use('/departments', require('./departments'))
router.use('/categories', require('./categories'))
router.use('/s3', require('./s3'))
router.use('/stripe', require('./stripe'))
router.use('/mailer', require('./mailer/mailer'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
