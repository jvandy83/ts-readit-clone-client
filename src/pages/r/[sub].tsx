import { useRouter } from 'next/router';

import { createRef, useState, useEffect, ChangeEvent } from 'react';

import useSWR from 'swr';
import PostCard from '../../components/Postcard';
import Sidebar from '../../components/Sidebar';

import Head from 'next/head';

import { Sub } from '../../types';

import { useAuthState } from '../../context/auth';

import classNames from 'classnames';
import axios from 'axios';

export default function SubPage() {
	// Local state
	const [ownSub, setOwnSub] = useState(false);
	// Global state
	const { authenticated, user } = useAuthState();
	// Utils
	const fileInputRef = createRef<HTMLInputElement>();

	const router = useRouter();

	const subName = router.query.sub;

	const { data: sub, error } = useSWR<Sub>(
		subName ? `/subs/${subName}` : null,
		{
			refreshInterval: 500,
		},
	);

	useEffect(() => {
		if (!sub) return;
		setOwnSub(authenticated && user.username === sub.username);
	}, [sub]);

	const openFileInput = (type: string) => {
		if (!ownSub) return;
		fileInputRef.current.name = type;
		fileInputRef.current.click();
	};

	const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files[0];

		const formData = new FormData();

		formData.append('file', file);
		formData.append('type', fileInputRef.current.name);

		try {
			const res = await axios.post<Sub>(`/subs/${sub.name}/image`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});
		} catch (err) {
			console.log(err);
		}
	};

	if (error) router.push('/');

	let postsMarkup;

	if (!sub) {
		postsMarkup = <p className='text-large text-center'>Loading...</p>;
	} else if (sub.posts.length === 0) {
		postsMarkup = (
			<p className='text-large text-center'>No posts submitted yet</p>
		);
	} else {
		postsMarkup = sub.posts.map((post) => (
			<PostCard key={post.identifier} post={post} />
		));
	}

	return (
		<div>
			<Head>{sub?.title}</Head>

			{sub && (
				<>
					<input
						type='file'
						name=''
						hidden={true}
						id=''
						ref={fileInputRef}
						onChange={uploadImage}
					/>
					<div
						className={classNames('bg-blue-500', {
							'cursor-pointer': ownSub,
						})}
					>
						{sub.bannerUrn ? (
							<div
								className='h-56 bg-blue-500'
								onClick={() => openFileInput('banner')}
								style={{
									backgroundImage: `url(${sub.bannerUrn})`,
									backgroundRepeat: `no-repeat`,
									backgroundSize: `cover`,
									backgroundPosition: `center`,
								}}
							></div>
						) : (
							<div className='h-20 bg-blue-500'></div>
						)}
					</div>
					<div className='h-20 bg-white flex justify-center'>
						<div className='container relative flex'>
							<div className='absolute' style={{ top: -30 }}>
								<img
									className={classNames('rounded-full', {
										'cursor-pointer': ownSub,
									})}
									src={sub.imageUrn}
									width={70}
									onClick={() => openFileInput('image')}
									height={70}
									alt='Sub'
								/>
							</div>

							<div className='pt-1 pl-24'>
								<div className='flex items-center'>
									<h1 className='mb-1 text-3xl font-bold'>{sub.title}</h1>
								</div>
								<p className='text-sm font-bold text-gray-500'>/r/{sub.name}</p>
							</div>
						</div>
					</div>
					<div className='container flex justify-center pt-5'>
						<div className='w-160'>{postsMarkup}</div>
						<Sidebar sub={sub} />
					</div>
				</>
			)}
		</div>
	);
}
