export type User = {
  name: string;
  username: string;
  email: string;
  image?: string;
};

export type SimpleUser = Pick<User, 'username' | 'image'>;

export type DetailUser = {
  following: SimpleUser[];
  followers: SimpleUser[];
  bookmarks: string[];
};
