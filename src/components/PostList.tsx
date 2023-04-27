'use client';

import { SimplePost } from '@/model/posts';
import useSWR from 'swr';

export default function PostList() {
  const { data: posts, isLoading: loading } = useSWR<SimplePost[]>('/api/posts');

  return <ul>{posts && posts.map((post) => <li key={post.id}>{post.text}</li>)}</ul>;
}