import { loginService } from '../services/authService.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email or Password is missing' });

    const token = await loginService(email, password);
    res.json({ token, message: 'Login Successful' }); // JWT Token`
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export default { login };
