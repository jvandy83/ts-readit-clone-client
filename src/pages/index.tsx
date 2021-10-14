import Head from 'next/head';
import Link from 'next/link';

import Postcard from '../components/Postcard';
import Sidebar from '../components/Sidebar';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

import useSWR from 'swr';
import { Sub } from '../types';
import React from 'react';

dayjs.extend(relativeTime);

export default function Home() {
	const { data: posts } = useSWR('/posts');
	const { data: topSubs } = useSWR('/misc/top-subs');

	return (
		<>
			<Head>
				<title>readit: the front page of the internet</title>
			</Head>
			<div className='flex container pt-4'>
				{/* Posts feed */}
				<div className='w-160'>
					{posts?.map((p) => (
						<Postcard key={Math.random()} post={p} />
					))}
				</div>
				{/* Side bar */}
				<div className='ml-6 w-80'>
					<div className='bg-white rounded'>
						<div className='p-4 border-b-2'>
							<p className='text-lg font-semibold text-center'>
								Top Communitites
							</p>
						</div>
						{topSubs?.map((sub: Sub) => (
							<div
								key={sub.name}
								className='flex items-center px-4 py-2 text-xs border-b'
							>
								<Link href={`/r/${sub.name}`}>
									<div className='rounded-full w-6 overflow-hidden mr-1 cursor-pointer'>
										<img src={sub.imageUrn} alt='sub' />
									</div>
								</Link>
								<Link href={`/r/${sub.name}`}>
									<a className='font-bold hover:cursor-pointer'>
										/r/{sub.name}
									</a>
								</Link>
								<p className='ml-auto font-med'>{sub.postCount}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
