import express, { Request, Response } from 'express';
import libraryRouter from './routes/library.js';
import authorRouter from './routes/author.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

const corsOptions = {
  origin:['http://localhost:3000'],
};

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.use('/libraries', libraryRouter);
app.use('/authors', authorRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
