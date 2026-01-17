import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';

const bookRouter = Router();

//GET

bookRouter.get('/', async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books).status(200);
  } catch (err) {
    res
      .status(500)
      .json({ error: `Error occured while getting all books: ${err}` });
  }
});

export default bookRouter;
