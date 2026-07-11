import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const SIVI_AUTH_URL = process.env.SIVI_API_URL || process.env.SIVI_AUTH_URL;

const SIVI_HEADERS = {
  'Content-Type': 'application/json',
  'sivi-api-key': process.env.SIVI_API_KEY,
};

async function siviPost(endpoint, body) {
  const res = await fetch(`${SIVI_AUTH_URL}${endpoint}`, {
    method: 'POST',
    headers: SIVI_HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Sivi API error ${res.status}: ${text}`);
  }
  return res.json();
}

// Login or create a user
app.post('/login-sivi', async (req, res) => {
  try {
    const { abstractUserId, planId, brand } = req.body;
    const loginInput = { abstractUserId };
    if (planId) loginInput.planId = planId;
    if (brand) loginInput.brand = brand;

    console.time('auth-api-login');
    const data = await siviPost('/super/login-user', loginInput);
    console.timeEnd('auth-api-login');
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Delete a user
app.post('/delete-sivi-user', async (req, res) => {
  try {
    const { abstractUserId } = req.body;
    const data = await siviPost('/super/delete-user', { abstractUserId });
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

// Set user credit limit
app.post('/set-credit-limit', async (req, res) => {
  try {
    const { abstractUserId, creditLimit } = req.body;
    const data = await siviPost('/super/set-user-credit-limit', { abstractUserId, creditLimit });
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
