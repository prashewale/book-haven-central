import type { Book } from '@/lib/types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4;
}

export function BookGrid({ books, columns = 4 }: BookGridProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  }[columns];

  return (
    <div className={`grid ${colClass} gap-6 md:gap-8`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
