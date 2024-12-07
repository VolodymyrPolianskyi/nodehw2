import UserRepository from '../repository/UserRepository.js'

const userRepo = new UserRepository();


export class usersService{
static  registerUser = async (email, password, confirmPassword) => {
  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }
  try {
    return await userRepo.registerUser(email, password);
  } catch (err) {
    console.error(err);
    return { error: 'Registration failed due to a server error' };
  }
};

static  loginUser = async (email, password) => {
  try {
    return await userRepo.loginUser(email, password);
  } catch (err) {
    console.error(err);
    return { error: 'Authentication failed' };
  }
};

}