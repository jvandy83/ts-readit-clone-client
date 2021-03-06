import Link from 'next/link';
import RedditLogo from '../images/reddit.svg';

export const Navbar: React.FC = () => (
	<div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white'>
		<div className='flex items-center'>
			<Link href='/'>
				<a>
					<RedditLogo className='w-8 h-8 mr-2' />
				</a>
			</Link>
		</div>
		<span className='text-2xl font-semibold'>
			<Link href='/'>Readit</Link>
		</span>
		{/* Search input */}
		<div className='flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white'>
			<i className='pl-4 pr-3 fas fa-search' aria-hidden='true'></i>
			<input
				type='text'
				className='py-1 pr-3 bg-transparent rounded focus:outline-none w-160'
				placeholder='Search'
			/>
		</div>
		{/* Auth buttons */}
		<div className='flex'>
			<Link href='/login'>
				<a className='w-32 py-1 mr-4 leading-5 hollow blue button'>Login</a>
			</Link>
			<Link href='/register'>
				<a className='w-32 py-1 leading-5 blue button'>Sign up</a>
			</Link>
		</div>
	</div>
);
