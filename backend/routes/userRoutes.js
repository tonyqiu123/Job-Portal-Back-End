const express = require('express')
const router = express.Router()
const { getUser, createUser, loginUser, updateUser, deleteUser } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.get('/:id', getUser)

router.post('/', createUser)

router.post('/login', loginUser)

router.put('/:id', protect, updateUser)

router.delete('/:id', protect, deleteUser)




module.exports = router 