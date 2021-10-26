import Head from 'next/head';

import axios from 'axios';

import { useState, FormEvent } from 'react';

import Link from 'next/link';

import { useRouter } from 'next/router';

import { InputGroup } from '../components/inputGroup';

import { useAuthDispatch, useAuthState } from '../context/auth';

export default function Login() {
	const dispatch = useAuthDispatch();
	const { authenticated } = useAuthState();

	const router = useRouter();

	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');
	const [agreement, setAgreement] = useState(false);
	const [errors, setErrors] = useState<any>({});

	if (authenticated) {
		router.push('/');
	}

	const submitForm = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const res = await axios.post('/auth/login', {
				password,
				username,
			});

			dispatch('LOGIN', res.data);
			router.back();
		} catch (err) {
			console.log(err);
			setErrors(err.response.data);
		}
	};

	return (
		<div className='flex bg-white'>
			<Head>
				<title>Login</title>
			</Head>
			<div
				className='h-screen bg-center bg-cover w-36'
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGlsZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60')",
				}}
			></div>
			<div className='flex flex-col justify-center pl-6'>
				<div className='w-70'>
					<h1 className='mb-2 text-lg'>Login</h1>
					<p className='mb-10 text-xs'>
						By continuing you agree to our User Agreement and Privacy Policy.
					</p>
					<form onSubmit={submitForm}>
						<InputGroup
							className='mb-2'
							error={errors.username}
							value={username}
							setValue={setUsername}
							type='username'
							name='username'
							inputId='username'
							placeholder='username'
						/>
						<InputGroup
							className='mb-2'
							error={errors.password}
							value={password}
							setValue={setPassword}
							type='password'
							name='password'
							inputId='password'
							placeholder='password'
						/>
						<button className='w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded'>
							Login
						</button>
					</form>
					<small>
						New to Readit?
						<Link href='/register'>
							<a className='ml-1 text-blue-500 uppercase'>Sign up</a>
						</Link>
					</small>
				</div>
			</div>
		</div>
	);
}
