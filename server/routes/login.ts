import * as loginServices from '../services/login'
import express from 'express';

const router = express.Router();
router.get('/user-data', async (req, res) => {
  const result = await loginServices.validateUserLogin();
  res.send(result);
});
export { router }; // Export the router instance