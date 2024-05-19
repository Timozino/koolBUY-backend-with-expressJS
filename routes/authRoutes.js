const authControllers = require('../controllers/authControllers')
const { authMiddleware } = require('../middlewares/authMiddleware')

const router = require('express').Router()




router.post('/staff-login', authControllers.staff_login)
router.get('/get-user',authMiddleware, authControllers.getUser)


module.exports=router