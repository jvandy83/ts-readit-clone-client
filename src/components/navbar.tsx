import Link from 'next/link';
import RedditLogo from '../images/reddit.svg';

import { useAuthState, useAuthDispatch } from '../context/auth';
import axios from 'axios';

export const Navbar: React.FC = () => {
	const { authenticated, loading } = useAuthState();
	const dispatch = useAuthDispatch();
	const logout = () => {
		axios
			.get('/auth/logout')
			.then(() => {
				dispatch('LOGOUT');
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};
	return (
		<div className='fixed inset-x-0 top-0 z-10 flex items-center justify-center h-12 px-5 bg-white'>
			<div className='flex items-center'>
				<Link href='/'>
					<a>
						<RedditLogo className='w-8 h-8 mr-2' />
					</a>
				</Link>
			</div>
			<span className='text-2xl font-semibold'>
				<Link href='/'>
					<a className='hidden lg:block'>Readit</a>
				</Link>
			</span>
			{/* Search input */}
			<div className='flex items-center mx-auto bg-gray-100 border rounded hover:border-blue-500 hover:bg-white w-3/4 md:w-1/2 max-w-2xl'>
				<i className='pl-4 pr-3 fas fa-search' aria-hidden='true'></i>
				<input
					type='text'
					className='py-1 pr-3 bg-transparent rounded focus:outline-none'
					placeholder='Search'
				/>
			</div>
			{/* Auth buttons */}
			<div className='flex'>
				{!loading &&
					(authenticated ? (
						<button
							className='w-32 py-1 mr-4 leading-5 hollow blue button hidden md:block'
							onClick={logout}
						>
							Logout
						</button>
					) : (
						<>
							<Link href='/login'>
								<a className='w-32 py-1 mr-4 leading-5 hollow blue button hidden md:block'>
									Login
								</a>
							</Link>
							<Link href='/register'>
								<a className='w-32 py-1 leading-5 blue button hidden md:block'>
									Sign up
								</a>
							</Link>
						</>
					))}
			</div>
		</div>
	);
};
