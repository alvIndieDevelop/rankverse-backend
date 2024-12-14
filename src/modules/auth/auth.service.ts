import User, { IUser } from '../user/user.model';
import jwtToken from 'src/utils/jwt-token';

export const register = async (userData: Partial<IUser>): Promise<IUser> => {
  try {
    const { username, email } = userData;

    // validate if username o email already exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      throw new Error('El usuario o el correo ya están registrados');
    }

    // create new user
    const newUser = new User({
      ...userData,
      role: ['PLAYER'],
    });

    return newUser.save();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.validatePassword(password))) {
      throw new Error('Correo o contraseña incorrectos');
    }

    // generate token
    const token = jwtToken.createToken(user);
    return { user, token };
  } catch (error: any) {
    throw new Error(error.message);
  }
};
