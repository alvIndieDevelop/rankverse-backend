import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

// Define una interfaz para el modelo de usuario
export interface IUser extends Document {
  username: string;
  email: string;
  name: string;
  lastName: string;
  role: string[];
  password: string;
  validatePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'El nombre de usuario es obligatorio'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El correo electrónico es obligatorio'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, 'Por favor, ingrese un correo electrónico válido'],
    },
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
      trim: true,
    },
    role: {
      type: [String],
      enum: {
        values: ['PLAYER', 'ADMIN'],
        message: 'El rol debe ser PLAYER o ADMIN',
      },
      default: ['PLAYER'],
      validate: {
        validator: (roles: string[]) => roles.length > 0 && roles.length <= 2,
        message: 'Un usuario puede tener entre 1 y 2 roles',
      },
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: [8, 'La contraseña debe tener al menos 8 caracteres'],
    },
  },
  {
    timestamps: true, // Crea automáticamente los campos `createdAt` y `updatedAt`
    versionKey: false, // Desactiva el campo `__v`
  },
);

// Hash de contraseñas antes de guardar
userSchema.pre('save', async function (next) {
  const user = this as IUser;
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Método para validar contraseñas
userSchema.methods.validatePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Excluir la contraseña de las respuestas JSON
userSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.password; // Elimina la contraseña
    return returnedObject;
  },
});

// Manejo de errores de índice único
userSchema.post('save', function (error: any, _: any, next: any) {
  if (error.name === 'MongoServerError' && error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    next(new Error(`El valor para ${field} ya existe. Por favor, use otro.`));
  } else {
    next(error);
  }
});

// Exporta el modelo
const User = mongoose.model<IUser>('User', userSchema);
export default User;
