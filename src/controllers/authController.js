import { loginService } from './authService.js';

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
