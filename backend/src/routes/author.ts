import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import Author from '../models/author.js';

const authorRouter = Router();

// GET
authorRouter.get('/', async (req: Request, res: Response) => {
  try {
    const authors: Array<Author> = await prisma.author.findMany();
    res.json(authors);
  } catch (err) {
    console.error({ err });
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default authorRouter;
