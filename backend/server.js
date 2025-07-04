import express from 'express';
import cors from 'cors';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const {
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  JWT_SECRET,
  FRONTEND_URL,
} = process.env;

app.get('/callback', async (req, res) => {
  const { code } = req.query;

  try {
    const response = await axios.post('https://api.twitter.com/2/oauth2/token', new URLSearchParams({
      client_id: TWITTER_CLIENT_ID,
      code,
      grant_type: 'authorization_code',
      redirect_uri: `${FRONTEND_URL}/auth-success`,
      code_verifier: 'GENERATED_CODE_VERIFIER', // Replace with actual code verifier in production
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      auth: { username: TWITTER_CLIENT_ID, password: TWITTER_CLIENT_SECRET }
    });

    const { access_token } = response.data;
    const token = jwt.sign({ access_token }, JWT_SECRET, { expiresIn: '7d' });
    res.redirect(`${FRONTEND_URL}/auth-success?token=${token}`);
  } catch (error) {
    console.error(error.response ? error.response.data : error);
    res.status(500).send('OAuth error');
  }
});

app.get('/api/user', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Unauthorized');
  const token = authHeader.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).send('Invalid token');
    res.json({ user: decoded });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
