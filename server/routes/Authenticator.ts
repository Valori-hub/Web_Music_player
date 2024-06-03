import express, { Request as ExpressRequest, Response } from 'express';
import * as users from '../services/Authenticator';
import session from 'express-session';

const router = express.Router();

router.post('/register', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.userObject;
    const result = await users.userRegistartion(userData);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/login', async (req: ExpressRequest, res: Response) => {
  try {
    const usernameLogin = req.body.userObject;
    const result = await users.userLogin(usernameLogin);
    const username = usernameLogin.username;
    if (Array.isArray(result)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    } else if (result.success && result.userExist) {
      session.userId = result.userExist._id;
      session.username = result.userExist.username;
      console.log('token has been created!');
    }
    res.status(201).json({ data: result, user: username });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// router.get('/logout', (req, res) => {
//   session.destroy((err) => {
//     if (err) {
//       return res.status(500).send('Error logging out');
//     }
//     res.send('User logged out successfully');
//   });
// });
router.get('/session-info', (req: ExpressRequest, res: Response) => {
  if (session.userId) {
    res.json({
      userId: session.userId,
      username: session.username,
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});
export { router };
