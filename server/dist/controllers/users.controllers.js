var _a;
import { usersService } from '../services/users.services.js';
class usersController {
}
_a = usersController;
usersController.registerUser = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format. Email must include '@' and a domain." });
    }
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long, include a special character (!, @, $, etc.), a letter, and a number."
        });
    }
    const result = await usersService.registerUser(email, password, confirmPassword);
    if (result instanceof Object) {
        res.status(400).json(result.error);
        return;
    }
    res.status(202).json(result);
};
usersController.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const result = await usersService.loginUser(email, password);
    if (result instanceof Object) {
        res.status(401).json(result.error);
        return;
    }
    res.status(202).json(result);
};
usersController.toggleNotif = async (req, res) => {
    const email = res.locals.user.email;
    let response = await usersService.toggleNotif(email);
    if (response.message) {
        return res.status(200).json(response);
    }
    else {
        return res.status(501).json({ message: "Some problem occured" });
    }
};
usersController.toggleNotifChannel = async (req, res) => {
    const email = res.locals.user.email;
    let response = await usersService.toggleNotifChannel(email);
    if (response.message) {
        return res.status(200).json(response);
    }
    else {
        return res.status(501).json({ message: "Some problem occured" });
    }
};
export default usersController;
