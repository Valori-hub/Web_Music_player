import express, { Request as ExpressRequest, Response } from 'express';
import * as users from '../services/Authenticator';
import session from 'express-session';

interface RequestWithSession extends ExpressRequest {
  session: any;
}
const router = express.Router();

router.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

router.post('', async (req: RequestWithSession, res: Response) => {
  try {
    const userData = req.body.userObject;
    const result = await users.userRegistartion(userData);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/login', async (req: RequestWithSession, res: Response) => {
  try {
    const usernameLogin = req.body.userObject;
    const result = await users.userLogin(usernameLogin);
    const username = usernameLogin.username;
    if (Array.isArray(result)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    } else if (result.success && result.userExist) {
      req.session.userId = usernameLogin.username;
      console.log('token has been created!');
    }
    res.status(201).json({ data: result, user: username });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router };
