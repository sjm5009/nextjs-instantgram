'use client';

import { DetailUser } from '@/model/user';
import Link from 'next/link';
import { PropagateLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';

export default function FollowingBar() {
  const { data, isLoading, error } = useSWR<DetailUser>('/api/me');
  const users = data?.following;
  // const users = data?.following && [...data?.following, ...data?.following, ...data?.following, ...data?.following, ...data?.following];

  return (
    <section className='flex w-full justify-center items-center p-4 shadow-md shadow-neutral-300 mb-4 rounded-lg min-h-[90px] overflow-x-auto'>
      {isLoading ? <PropagateLoader color='#F16287' /> : (!users || users.length === 0) && <p>You don't have followings</p>}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <Link key={username} className='flex flex-col items-center w-20' href={`/user/${username}`}>
              <Avatar image={image} highlight />
              <p className='w-full text-sm text-center text-ellipsis overflow-hidden'>{username}</p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );

  // 1. client component에서 back-end에게 api/me 사용자의 정보를 얻어옴
  // 2. 백엔트에서는 현재 로그인된 사용자의 세션 정보를 이용해서
  // 3. 백엔드에서 사용자의 상세 정보를 Sanity에서 가지고 옴 (followings)
  // 4. 여기에서, 클라이언트 컴포넌트에서 followings의 정보를 UI에 보여줌
  //    (image, username)

  return <div>FollowingBar</div>;
}
