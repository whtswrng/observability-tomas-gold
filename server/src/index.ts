import express from 'express';
import { Request, Response } from 'express';

// Create the Express application
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Example controller function
const getExample = (req: Request, res: Response) => {
  res.json({ message: 'Hello from example controller!' });
};

// Define routes
app.get('/api/example', getExample);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; // For testing
