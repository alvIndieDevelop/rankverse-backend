import express, { Request, Response } from 'express';
import { register, login } from './auth.service';

const router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export default router;
