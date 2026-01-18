import { Request, Response, Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { BookWithAllInfo } from '../models/book.js';

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

bookRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findFirst({
      where: {
        id: String(id),
      },
      include: {
        author: true,
        section: true,
        library: true,
      },
    });
    if (book) {
      const bookWithAllInfo: BookWithAllInfo = {
        id: book.id,
        name: book.name,
        date_published: book.published_date
          .toISOString()
          .split('T')[0] as string,
        author: book.author.name,
        section: book.section.name,
        library: book.library.name,
      };
      res.json(bookWithAllInfo).status(200);
    } else {
      res.json({ message: `The book with ${id} not found!` });
    }
  } catch (err) {
    console.error({
      error: `Error occured while getting a book by id: ${err}`,
    });
  }
});

export default bookRouter;
