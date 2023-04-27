import { client } from './sanity';

type Props = {
  id: string;
  name: string;
  username: string;
  email: string;
  image?: string | null;
};
export async function addUser({ id, name, username, email, image }: Props) {
  client
    .createIfNotExists({
      _id: id,
      _type: 'user',
      name,
      username,
      email,
      image,
      following: [],
      followers: [],
      bookmarks: [],
    })
    .then((res) => {
      console.log('Bike was created (or was already present)');
    });
}

export async function getUserByUsername(username: string) {
  return await client.fetch(`*[_type == "user" && username == "${username}"][0]{
    ...,
    "id": _id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks": bookmarks[]->_id
  }`);
}
