import express, { Request, Response } from 'express';
import * as users from '../services/signup'
import { db } from '../shared/db_connection';
const router = express.Router();

router.post('', async (req: Request, res: Response) => {
  try {
      const userData = req.body.userObject;
      const result = await users.userRegistartion(userData);
      res.status(201).json({ data: result });
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/login', async (req: Request, res: Response) =>{
  try{
    const usernameLogin = req.body.userObject;
    const result = await users.userLogin(usernameLogin);
    res.status(201).json({ data: result });
  } catch(error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router }