export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverImage: string | null;
  tags: string[];
  createdAt: string;
  views: number;
  author: {
    id: string;
    name: string | null;
    image: string | null;
  };
}