export interface Feed {
  id: string;
  author: string;
  content: string;
  time: string;
  likeCount: number;
  isLiked: boolean;
  isDeleted: boolean;
}

export interface ResultFeed extends Feed {
  isFake: boolean;
}
