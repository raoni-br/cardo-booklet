export interface UserInput {
  username: string;
  password: string;
}

export interface Book {
  id: string; // ISBN
  title: string;
  author: string;
  releaseYear: number;
}
