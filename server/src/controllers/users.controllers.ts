import {usersService} from '../services/users.services.js'

export default class usersController{

static registerUser = async(req,res) => {
    const { email, password, confirmPassword } = req.body
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format. Email must include '@' and a domain." });
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long, include a special character (!, @, $, etc.), a letter, and a number."
        })
    }

    const result = await usersService.registerUser(email,password,confirmPassword)
    if(result instanceof Object){
        res.status(400).json(result.error)
        return
    }
    res.status(202).json(result)
}

static loginUser = async(req,res) => {
    const {email, password} = req.body
    const result = await usersService.loginUser(email, password)
    if(result instanceof Object){
        res.status(401).json(result.error)
        return
    }
    res.status(202).json(result)
}
}