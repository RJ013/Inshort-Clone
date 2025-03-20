export interface User {
  name: string
  avatar: string
}

export interface Comment {
  id: string
  user: User
  text: string
  timestamp: string
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  source: string;
  time: string;
  url: string;
}

