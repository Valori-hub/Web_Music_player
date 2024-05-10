import express, { Request, Response } from 'express';
import * as users from '../services/signup'
import { db } from '../shared/db_connection';
const newItemData: any = null;
const router = express.Router();

router.post('', async (req, res) => {
  try {
      const userData = req.body;
      const result = await db.collection('Users').insertOne(userData);
      console.log('User creating successfully:', result);
      res.status(201).json({ message: 'User added successfully', data: result });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

export { router }