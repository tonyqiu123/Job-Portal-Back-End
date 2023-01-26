const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const getUsers = asyncHandler(async (req,res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const createUser = asyncHandler(async (req,res) => {
    const {userName, email, password} = req.body
    if (!userName || !email || !password) {
        res.status(400)
        throw new Error('Missing username, email, or password')
    }
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error('Email already in use')   
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        userName: userName,
        email: email,
        password: hashedPassword,
    })

    if(user) {
        res.status(201).json({
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})
const updateUser = asyncHandler(async (req,res) => {
    const objectId = mongoose.Types.ObjectId(req.params.id)
    const user = await User.findById(objectId)

    if (!user)
        res.status(400).json({ message: `User ${req.params.id} not found` })

    try {
        const updatedUser = await User.findByIdAndUpdate(objectId, req.body, {
            new: true,
        })
        res.status(200).json(updatedUser)
    } catch {
        res.status(400).json({ message: "bad request, improper types for field" })
    }
   
})
const deleteUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if (!user)
        res.status(400).json({ message: `User ${req.params.id} not found` })

    await user.remove()

    res.status(200).json({ message: `Deleted user ${req.params.id}` })
})

// Generating JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}

module.exports = {
 getUsers, createUser, updateUser, deleteUser, loginUser
}