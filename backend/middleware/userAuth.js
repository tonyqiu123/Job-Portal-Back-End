const jwt = require('jsonwebtoken')

function generateToekn(payload, secret) {
    return jwt.sign(payload,secret)
}

module.exports = {jwt}