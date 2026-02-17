type Book = {
  id: string;
  name: string;
  date_published: string;
  author: string;
  section: string;
};

export type ResponsePaginationSchema = {
  books: Array<Book>;
  currentPage: number;
  totalPages: number;
  totalBooks: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export default Book;
