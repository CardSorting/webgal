import axios from 'axios';

export default async function handler(req, res) {
  const userId = req.query.userId as string;

  try {
    const response = await axios.get(`http://localhost:4000/user/${userId}/collection`);
    const initialCollection = response.data;
    res.status(200).json(initialCollection);
  } catch (error) {
    console.error('Error fetching collection:', error.message);
    res.status(500).json({ error: 'Error fetching collection.' });
  }
}