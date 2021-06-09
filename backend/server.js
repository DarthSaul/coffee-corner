import express from 'express';
import cors from 'cors';
import coffees from './api/coffees.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/coffees', coffees);
app.use('*', (req, res) => {
    res.status(404).json({ error: 'not found' });
});

export default app;

// const port = 5000 || NODE.env.port;
// app.listen(port, () => console.log('Server connected.'));
