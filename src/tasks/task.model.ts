export interface Task {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  mentions: string[];
  media: Media[];
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface Media {
  name: string;
  type: string;
  size: number;
  url: string;
}