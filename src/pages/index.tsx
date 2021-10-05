import Head from 'next/head';

import Postcard from '../components/Postcard';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

import useSWR from 'swr';

dayjs.extend(relativeTime);

export default function Home() {
	const { data: posts } = useSWR('/posts');
	return (
		<>
			<Head>
				<title>readit: the front page of the internet</title>
			</Head>
			<div className='container flex pt-4'>
				{/* Posts feed */}
				<div className='w-160'>
					{posts?.map((p) => (
						<Postcard key={Math.random()} post={p} />
					))}
				</div>
				{/* Side bar */}
			</div>
		</>
	);
}
