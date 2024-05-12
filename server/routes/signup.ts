import express, { Request, Response } from 'express';
import * as users from '../services/signup'
import { db } from '../shared/db_connection';
const router = express.Router();

router.post('', async (req: Request, res: Response) => {
  try {
      const userData = req.body.userObject;
      const result = await users.userRegistartion(userData);
      console.log('User creating successfully:', result);
      res.status(201).json({ message: 'User added successfully', data: result });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

export { router }