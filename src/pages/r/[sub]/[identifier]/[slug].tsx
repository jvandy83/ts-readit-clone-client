import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Sidebar from '../../../../components/Sidebar';
import ActionButton from '../../../../components/ActionButton';

import { Post } from '../../../../types';

import { useAuthState } from '../../../../context/auth';

import useSWR from 'swr';

import axios from 'axios';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import classNames from 'classnames';

export default function PostPage() {
	// Local State

	// Global State
	const { authenticated } = useAuthState();

	// Utils

	const router = useRouter();

	const { identifier, sub, slug } = router.query;

	const { data: post, error } = useSWR<Post>(
		identifier && slug ? `/posts/${identifier}/${slug}` : null,
	);

	// const {
	// 	username,
	// 	url,
	// 	body,
	// 	title,
	// 	createdAt,
	// 	voteScore,
	// 	commentCount,
	// 	userVote,
	// } = post;

	if (error) router.push('/');

	const vote = async (value: number) => {
		// If not logged in go to login
		if (!authenticated) router.push('/login');

		// If vote is the same, reset vote
		if (value === post.userVote) value = 0;

		try {
			const res = await axios.post('/misc/vote', {
				identifier,
				slug,
				value,
			});
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<Head>
				<title>{post?.title}</title>
			</Head>
			<Link href={`/r/{sub}`}>
				<a>
					<div className='flex items-center w-full h-20 p-8 bg-blue-500'>
						<div className='container flex'>
							{post && (
								<div className='rounded-full mr-2 overflow-hidden'>
									<img
										src={post.sub.imageUrn}
										alt='sub-image'
										className='w-8 h-8'
									/>
								</div>
							)}
							<p className='text-xl font-semibold text-white'>/r/{sub}</p>
						</div>
					</div>
				</a>
			</Link>
			<div className='container flex pt-5 justify-center m-0'>
				{/* POST */}
				<div className='w-160'>
					<div className='bg-white rounded'>
						{post && (
							<div className='flex'>
								<div className='w-10 py-3 text-center rounded-l'>
									{/* Upvote */}
									<div
										className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
										onClick={() => vote(1)}
									>
										<i
											className={classNames('icon-arrow-up', {
												'text-red-500': post.userVote === 1,
											})}
										></i>
									</div>
									<p className='text-xs font-bold'>{post.voteScore}</p>
									{/* Downvote */}
									<div
										className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
										onClick={() => vote(-1)}
									>
										<i
											className={classNames('icon-arrow-down', {
												'text-blue-600': post.userVote === -1,
											})}
										></i>
									</div>
								</div>
								<div className='p-2'>
									<div className='flex items-center'>
										<p className='text-xs text-gray-500'>
											Posted by
											<Link href={`/u/${post.username}`}>
												<a className='mx-1 hover:underline'>
													/u/{post.username}
												</a>
											</Link>
											<Link href={post.url}>
												<a className='mx-1 hover:underline'>
													{dayjs().to(dayjs(post.createdAt))}
												</a>
											</Link>
										</p>
									</div>
									{/* Post title */}
									<h1 className='my-1 text-xl font-medium'>{post.title}</h1>
									{/* Post body */}
									<p className='my-3 text-sm'>{post.body}</p>
									<div className='flex flex-row'>
										<Link href={post.url}>
											<a>
												<ActionButton>
													<i className='mr-1 fas fa-comment-alt fa-xs'></i>
													<span className='font-bold'>
														{post.commentCount} Comments
													</span>
												</ActionButton>
											</a>
										</Link>
										<ActionButton>
											<i className='mr-1 fas fa-share fa-xs'></i>
											<span className='font-bold'>Share</span>
										</ActionButton>
										<ActionButton>
											<i className='mr-1 fas fa-bookmark fa-xs'></i>
											<span className='font-bold'>Save</span>
										</ActionButton>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{/* SIDEBAR */}
				{post && <Sidebar sub={post.sub} />}
			</div>
		</>
	);
}
