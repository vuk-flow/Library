type Book = {
  id: string;
  name: string;
  date_published: string;
  author_id: string;
  section_id: string;
  library_id: string;
};

export type BookWithAllInfo = {
  id: string;
  name: string;
  date_published: string;
  author: string;
  section: string;
  library: string;
};

export default Book;
