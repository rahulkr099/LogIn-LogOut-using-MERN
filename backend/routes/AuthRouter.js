const { login, signup } = require('../controllers/AuthController');
const { loginValidation, signupValidation } = require('../middlewares/AuthValidation');

const router = require('express').Router();

router.post('/signup',signupValidation,signup)
router.post('/login',loginValidation,login)
module.exports = router;