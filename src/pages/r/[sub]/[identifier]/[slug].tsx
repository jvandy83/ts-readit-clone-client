import { FormEvent, useState } from 'react';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Sidebar from '../../../../components/Sidebar';
import ActionButton from '../../../../components/ActionButton';

import { Post, Comment } from '../../../../types';

import { useAuthState } from '../../../../context/auth';

import useSWR, { mutate } from 'swr';

import axios from 'axios';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames';

export default function PostPage() {
	// Local State
	const [newComment, setNewComment] = useState('');
	// Global State
	const { authenticated, user } = useAuthState();

	// Utils

	const router = useRouter();

	const { identifier, sub, slug } = router.query;

	const { data: post, error: postError } = useSWR<Post>(
		identifier && slug ? `/posts/${identifier}/${slug}` : null,
	);

	const { data: comments } = useSWR<Comment[]>(
		`/posts/${identifier}/${slug}/comments`,
	);

	if (postError) router.push('/');

	const vote = async (value: number, comment?: Comment) => {
		// If not logged in go to login
		if (!authenticated) router.push('/login');

		// If vote is the same, reset vote
		if (
			(!comment && value === post.userVote) ||
			(comment && comment.userVote === value)
		)
			value = 0;

		try {
			const res = await axios.post('/misc/vote', {
				identifier,
				slug,
				commentIdentifier: comment?.identifier,
				value,
			});
			mutate(`/posts/${identifier}/${slug}/comments`);
			mutate(`/posts/${identifier}/${slug}`);
		} catch (err) {
			console.log(err);
		}
	};

	const submitComment = async (e: FormEvent) => {
		e.preventDefault();
		if (newComment.trim() === '') return;

		try {
			await axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
				body: newComment,
			});
			setNewComment('');
			mutate(`/posts/${identifier}/${slug}/comments`);
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
			<div className='flex pt-5 justify-center m-0'>
				{/* POST */}
				<div className='w-160'>
					<div className='bg-white rounded'>
						{post && (
							<>
								<div className='flex'>
									{/* Vote section */}
									<div className='flex-shrink-0 w-10 py-3 text-center rounded-l'>
										{/* Upvote */}
										<div
											className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
											onClick={() => vote(1)}
										>
											<FontAwesomeIcon
												className={classNames('icon-arrow-up', {
													'text-red-500': post.userVote === 1,
												})}
												icon={faArrowUp}
											/>
										</div>
										<p className='text-xs font-bold'>{post.voteScore}</p>
										{/* Downvote */}
										<div
											className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
											onClick={() => vote(-1)}
										>
											<FontAwesomeIcon
												className={classNames('icon-arrow-down', {
													'text-blue-600': post.userVote === -1,
												})}
												icon={faArrowDown}
											/>
										</div>
									</div>
									<div className='py-2 pr-2'>
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
								{/* Comment input area */}
								<div className='pl-10 pr-6 mb-4'>
									{authenticated ? (
										<>
											<p className='mb-1 text-xs'>
												Comment as{' '}
												<Link href={`/u/${user.username}`}>
													<a className='font-simibold text-blue-500'>
														{user.username}
													</a>
												</Link>
											</p>
											<form onSubmit={submitComment}>
												<textarea
													className='w-full p-3 border border-gray-300 focus:outline-none focus:border-gray-600 rounded'
													onChange={(e) => setNewComment(e.target.value)}
													value={newComment}
												/>
												<div className='flex justify-end'>
													<button
														className='px-3 py-1 blue button'
														disabled={newComment.trim() === ''}
													>
														Comment
													</button>
												</div>
											</form>
										</>
									) : (
										<div className='flex items-center justify-between px-2 py-4 border rounded border-gray-200'>
											<p className='text-gray-400 font-semibold'>
												Sign up to leave a comment
											</p>
											<div>
												<Link href='/login'>
													<a className='px-4 py-1 hollow blue button mr-4'>
														Login
													</a>
												</Link>
												<Link href='/register'>
													<a className='px-4 py-1 blue button'>Sign up</a>
												</Link>
											</div>
										</div>
									)}
								</div>
								<hr />
								{/* Comment feed */}
								{comments?.map((c) => (
									<div className='flex' key={c.identifier}>
										<div className='flex-shrink-0 w-10 py-2 text-center rounded-l'>
											{/* Upvote */}
											<div
												className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'
												onClick={() => vote(1, c)}
											>
												<i
													className={classNames('icon-arrow-up', {
														'text-red-500': c.userVote === 1,
													})}
												></i>
											</div>
											<p className='text-xs font-bold'>{c.voteScore}</p>
											{/* Downvote */}
											<div
												className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'
												onClick={() => vote(-1, c)}
											>
												<i
													className={classNames('icon-arrow-down', {
														'text-blue-600': c.userVote === -1,
													})}
												></i>
											</div>
										</div>
										<div className='py-2 pr-2'>
											<p className='mb-1 text-xs leading-none'>
												<Link href={`/u/${c.username}`}>
													<a className='mr-1 font-bold hover:underline'>
														{c.username}
													</a>
												</Link>
												<span className='text-gray-600'>
													{`
														${c.voteScore}
														points •
														${dayjs(c.createdAt).fromNow()}
													`}
												</span>
											</p>
											<p>{c.body}</p>
										</div>
									</div>
								))}
							</>
						)}
					</div>
				</div>
				{/* SIDEBAR */}
				{post && <Sidebar sub={post.sub} />}
			</div>
		</>
	);
}
