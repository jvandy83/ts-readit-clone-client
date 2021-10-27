import { useEffect, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import Postcard from '../components/Postcard';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

import useSWR from 'swr';

import useSWRInfinite from 'swr/infinite';

import { Post, Sub } from '../types';
import React from 'react';

import { useAuthState } from '../context/auth';

dayjs.extend(relativeTime);

export default function Home() {
	const [observedPost, setObservedPost] = useState('');
	// const { data: posts } = useSWR<Post[]>('/posts');
	const { data: topSubs } = useSWR<Sub[]>('/misc/top-subs');

	const { authenticated } = useAuthState();

	const {
		data,
		error,
		mutate,
		size: page,
		setSize: setPage,
		isValidating,
	} = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

	const posts: Post[] = data ? [].concat(...data) : [];

	useEffect(() => {
		if (!posts || posts.length === 0) return;

		const id = posts[posts.length - 1].identifier;

		if (id !== observedPost) {
			setObservedPost(id);
			observeElement(document.getElementById(id));
		}
	}, [posts]);

	function observeElement(element: HTMLElement) {
		if (!element) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting === true) {
					setPage(page + 1);
					observer.unobserve(element);
				}
			},
			{ threshold: 1, root: null },
		);
		observer.observe(element);
	}

	return (
		<>
			<Head>
				<title>readit: the front page of the internet</title>
			</Head>
			<div className='flex container justify-center pt-4'>
				{/* Posts feed */}
				<div className='w-full md:w-160 px-4 md:p-0'>
					{isValidating && <p className='text-large text-center'>Loading...</p>}
					{posts?.map((p) => (
						<Postcard key={p.identifier} mutate={mutate} post={p} />
					))}
					{isValidating && posts.length > 0 && (
						<p className='text-large text-center'>Loading more...</p>
					)}
				</div>
				{/* Side bar */}
				<div className='hidden md:block ml-6 w-80'>
					<div className='bg-white rounded'>
						<div className='p-4 border-b-2'>
							<p className='text-lg font-semibold text-center'>
								Top Communitites
							</p>
						</div>
						{topSubs?.map((sub) => (
							<div
								key={sub.name}
								className='flex items-center px-4 py-2 text-xs border-b'
							>
								<Link href={`/r/${sub.name}`}>
									<a>
										<img
											className='rounded-full w-6 mr-2 cursor-pointer'
											src={sub.imageUrn}
											alt='sub'
										/>
									</a>
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
					{authenticated && (
						<div className='p-4 border-t-2'>
							<Link href='/subs/create'>
								<a className='w-full blue-butotn px-2 py-1'>Create Community</a>
							</Link>
						</div>
					)}
				</div>
			</div>
		</>
	);
}
