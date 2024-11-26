const fileDB = require('./../DAL/schemas.dal')
const users = fileDB.getUserTable('users')
const bcrypt = require('bcrypt')

const registerUser = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        return { error: "Passwords are not matching" }
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 1)
        const token = await users.registerUser(email, hashedPassword)
        return token
    } catch (err) {
        console.error(err)
        return { error: "Registration failed due to a server error" }
    }
}

const loginUser = async(email, password) => {
    const user = users.getUserByEmail(email)
    if(!user){
        return {error: "Wrong email"}
    }
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return {error: "Wrong password"}
    }
    return await users.loginUser(user.email, user.password)
}

module.exports = {
    registerUser, loginUser
}