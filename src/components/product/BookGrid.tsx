import type { Book } from '@/lib/types';
import { BookCard } from './BookCard';

interface BookGridProps {
  books: Book[];
  columns?: 2 | 3 | 4 | 5 | 6;
}

export function BookGrid({ books, columns = 5 }: BookGridProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
    6: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6',
  }[columns];

  return (
    <div className={`grid ${colClass} gap-4 md:gap-5`}>
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
