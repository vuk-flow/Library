import express, { Request, Response } from 'express';
import libraryRouter from './routes/library.js';
import authorRouter from './routes/author.js';

const app = express();
const PORT = 8000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/libraries', libraryRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
