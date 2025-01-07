var _a;
import UserRepository from '../repository/UserRepository.js';
const userRepo = new UserRepository();
export class usersService {
}
_a = usersService;
usersService.registerUser = async (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
        return { error: 'Passwords do not match' };
    }
    try {
        return await userRepo.registerUser(email, password);
    }
    catch (err) {
        console.error(err);
        return { error: 'Registration failed due to a server error' };
    }
};
usersService.loginUser = async (email, password) => {
    try {
        return await userRepo.loginUser(email, password);
    }
    catch (err) {
        console.error(err);
        return { error: 'Authentication failed' };
    }
};
usersService.toggleNotif = async (email) => {
    return await userRepo.toggleNotif(email);
};
usersService.toggleNotifChannel = async (email) => {
    return await userRepo.toggleNotifChannel(email);
};
