const { Router } = require('express')
const router = Router()

const { login, getUserProfile, register, logout, getUser, updateUserProfile, getUsers, deleteUser, updateUser, forgotPassword, resetPassword } = require('../controllers/userController')
const { isAuthenticated,isAdmin } = require('../utils/auth')

router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.post('/login', login)
router.route('/profile').get( isAuthenticated, getUserProfile)
router.post('/register', register)
router.route('/logout').post( logout)
router.route('/profile/update').put(isAuthenticated, updateUserProfile)
router.route('/').get( isAuthenticated, isAdmin, getUsers )
router.route('/:id').delete(isAuthenticated, isAdmin, deleteUser)
router.route('/:id').get( isAuthenticated, isAdmin, getUser)
router.route('/:id').put(isAuthenticated, isAdmin, updateUser)


module.exports = router