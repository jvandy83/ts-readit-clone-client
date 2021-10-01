import { Post } from '../types';

import Link from 'next/link';
import Image from 'next/image';

import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const ActionButton = ({ children }) => {
	return (
		<div className='px-1 py-1 mr-1 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200'>
			children
		</div>
	);
};

interface PostcardProps {
	post: Post;
}

export default function PostCard({ post }) {
	return (
		<div key={post.identifier} className='flex mb-4 bg-white rounded'>
			{/* vote section */}
			<div className='w-10 py-3 text-center bg-gray-200 rounded-l'>
				<div className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500'>
					<i className='icon-arrow-up'></i>
				</div>
				<div className='w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600'>
					<i className='icon-arrow-down'></i>
				</div>
			</div>
			{/* Post data section */}
			<div className='w-full p-2'>
				<div className='flex items-center'>
					<Link href={`/r/${post.subname}`}>
						<>
							<Image
								className='w-6 h-6 mr-1 rounded-full cursor-pointer'
								width={'20px'}
								height={0}
								src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9inRqaFfeNmYbm_Z_AwaICGOVqcRE-Of5Lw&usqp=CAU'
								alt='avatar'
							/>
							<a className='text-xs font-bold cursor-pointer hover:underline'>
								/r/{post.subname}
							</a>
						</>
					</Link>
					<p className='text-xs text-gray-500'>
						<span className='mx-1'>&#8226;</span>
						Posted by
						<Link href={`/u/${post.username}`}>
							<a className='mx-1 hover:underline'>/u/{post.username}</a>
						</Link>
						<Link href={post.url}>
							<a className='mx-1 hover:underline'>
								{dayjs().to(dayjs(post.createdAt))}
							</a>
						</Link>
					</p>
				</div>
				<Link href={post.url}>
					<a className='my-1 text-lg font-medium'>{post.title}</a>
				</Link>
				{post.body && <p className='my-1 text-sm'>{post.body}</p>}
				<div className='flex flex-row'>
					<Link href={post.url}>
						<a>
							<ActionButton>
								<i className='mr-1 fas fa-comment-alt fa-xs'></i>
								<span className='font-bold'>20 comments</span>
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
	);
}
