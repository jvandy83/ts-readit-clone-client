import axios from 'axios';

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from 'next';

import { useEffect, useState } from 'react';

import Postcard from '../components/Postcard';

import { Post } from '../types';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function Home({ posts }) {
	// const [posts, setPosts] = useState<Post[]>([]);
	// useEffect(() => {
	// 	axios.get('/posts').then(async (res) => {
	// 		const { data } = res;
	// 		setPosts(data);
	// 	});
	// }, []);

	// create subname in Posts table
	// currently Subname is only column
	// that has value

	return (
		<>
			<Head>
				<link
					href='https://i.icomoon.io/public/temp/4da8a004ca/UntitledProject/style.css'
					rel='stylesheet'
				/>
			</Head>
			<div className='pt-12'>
				<Head>
					<title>readit: the front page of the internet</title>
				</Head>
				<div className='container flex pt-4'>
					{/* Posts feed */}
					<div className='w-160'>
						{posts?.map((p) => (
							<Postcard key={p.subname} post={p} />
						))}
					</div>
					{/* Side bar */}
				</div>
			</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		const res = await axios.get('/posts');
		return {
			props: {
				posts: res.data,
			},
		};
	} catch (err) {
		console.log(err);
		// possible redirect depending on
		// app requirements
		return {
			props: {
				error: 'Something went wrong',
			},
		};
	}
};
