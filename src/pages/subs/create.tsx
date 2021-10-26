import { useState, FormEvent } from 'react';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import classNames from 'classnames';
import { useRouter } from 'next/router';

const create = () => {
	const [name, setName] = useState('');
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const [errors, setErrors] = useState<Partial<any>>({});

	const router = useRouter();

	const submitForm = async (event: FormEvent) => {
		event.preventDefault();
		try {
			const res = await axios.post('/subs', { name, title, description });
			router.push(`/r/${res.data.name}`);
		} catch (error) {
			console.log(error);
			setErrors(error.response.data);
		}
	};
	return (
		<div className='flex bg-white'>
			<Head>
				<title>Create a Community</title>
			</Head>
			<div
				className='h-screen bg-center bg-cover w-36'
				style={{
					backgroundImage:
						"url('https://images.unsplash.com/photo-1458682625221-3a45f8a844c7?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGlsZXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60')",
				}}
			></div>
			<div className='flex flex-col justify-center pl-6'>
				<div className='w-98'>
					<h1 mb-2 text-lg font-medium>
						Create a Community
					</h1>
					<hr />
					<form onSubmit={submitForm}>
						<div className='my-6'>
							<p className='font-medium'>Name</p>
							<p className='text-sx text-gray-500 mb-2'>
								Community names including capitalization cannot be changed.
							</p>
							<input
								type='text'
								className={classNames(
									'border border-gray-200 rounded p-3 hover:border-gray-500 w-full outline-none',
									{ 'border-red-600': errors.name },
								)}
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<small className='text-red-600 font-medium'>{errors.name}</small>
						</div>
						<div className='my-6'>
							<p className='font-medium'>Title</p>
							<p className='text-sx text-gray-500 mb-2'>
								Community title represents the topic and you can change it at
								anytime.
							</p>
							<input
								type='text'
								className={classNames(
									'border border-gray-200 rounded p-3 hover:border-gray-500 w-full outline-none',
									{ 'border-red-600': errors.title },
								)}
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
							<small className='text-red-600 font-medium'>{errors.title}</small>
						</div>
						<div className='my-6'>
							<p className='font-medium'>Description</p>
							<p className='text-sx text-gray-500 mb-2'>
								This is how your members come to understand your community.
							</p>
							<textarea
								className={classNames(
									'border border-gray-200 rounded p-3 hover:border-gray-500 w-full outline-none',
									{ 'border-red-600': errors.description },
								)}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
							<small className='text-red-600 font-medium'>
								{errors.description}
							</small>
						</div>
						<div className='flex justify-end'>
							<button className='blue button px-4 py-1 capitalize text-sm font-semibold'>
								Create Community
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const cookie = req.headers.cookie;
		if (!cookie) throw new Error('Missing auth token cookie');

		await axios.get('/auth/me', { headers: { cookie } });

		return { props: {} };
	} catch (err) {
		res.writeHead(307, { Location: '/login' }).end();
	}
};

export default create;
