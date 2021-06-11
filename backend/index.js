import app from './server.js';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
dotenv.config();
connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
