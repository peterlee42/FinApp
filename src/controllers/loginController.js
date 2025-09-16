import { loginService } from '../services/authService.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    res.json({ token }); // JWT Token`
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default { login };
