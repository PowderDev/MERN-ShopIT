const { Router } = require('express')
const router = Router()

const { getAllProducts, getProductById, deleteProduct, createProduct, updateProduct, createReview, topRatedProducts, deleteReview } = require('../controllers/productController')
const { isAuthenticated,isAdmin } = require('../utils/auth')

router.route('/top').get(topRatedProducts)
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.route('/:id').delete(isAuthenticated, isAdmin, deleteProduct)
router.route('/:id').put(isAuthenticated, isAdmin, updateProduct)
router.route('/').post(isAuthenticated, isAdmin, createProduct)
router.route('/:id').post(isAuthenticated, createReview)
router.route('/:id/reviews/:reviewid').delete(isAuthenticated, isAdmin, deleteReview)

module.exports = router