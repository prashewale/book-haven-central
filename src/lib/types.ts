export type BookFormat = 'Hardcover' | 'Paperback' | 'eBook' | 'Audiobook';

export interface Book {
  id: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  discountPrice?: number;
  cover: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  genres: string[];
  formats: BookFormat[];
  description: string;
  pages: number;
  publisher: string;
  isbn: string;
  pubDate: string;
  isBestseller?: boolean;
  isNewRelease?: boolean;
  onSale?: boolean;
  saleEnds?: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
  selectedFormat: BookFormat;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
}
