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

bookRouter.get('/by-library', async (req: Request, res: Response) => {
  try {
    const { id, filter } = req.query;
    const result = await prisma.book.findMany({
      where: {
        library_id: String(id),
        ...(filter &&
          String(filter).trim() !== '' && {
            author: {
              name: String(filter).trim(),
            },
          }),
      },
      include: {
        author: true,
        section: true,
        library: true,
      },
    });

    if (result.length > 0) {
      const booksByLibrary: Array<BookWithAllInfo> = [];

      result.forEach((item) => {
        const book: BookWithAllInfo = {
          id: item.id,
          name: item.name,
          date_published: item.published_date
            .toISOString()
            .split('T')[0] as string,
          section: item.section.name,
          author: item.author.name,
        };
        booksByLibrary.push(book);
      });

      res.json(booksByLibrary).status(200);
    } else {
      res.json({ message: `The library with ${id} doesn't have books!` });
    }
  } catch (err) {
    console.error({
      error: `Error occured while getting a books by library: ${err}`,
    });
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

// DELETE A BOOK BY ID
bookRouter.delete('/delete-book/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.delete({
      where: {
        id: String(id),
      },
    });
    res.json({ message: `The book ${book.name} has been deleted!` });
  } catch (err) {
    console.error({
      error: `Error occured while deleting a book by id: ${err}`,
    });
  }
});

export default bookRouter;
