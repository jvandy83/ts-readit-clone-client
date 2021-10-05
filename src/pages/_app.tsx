import { Navbar } from '../components/navbar';

import { useRouter } from 'next/router';

import { AuthProvider } from '../context/auth';

import { SWRConfig } from 'swr';

import axios from 'axios';

import '../styles/tailwind.css';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function App({ Component, pageProps }) {
	const router = useRouter();
	const authRoutes = ['/login', '/register'];
	const authRoute = authRoutes.includes(router.pathname);
	return (
		<SWRConfig
			value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
		>
			<AuthProvider>
				{!authRoute && <Navbar />}
				<div className={authRoute ? '' : 'pt-12'}>
					<Component {...pageProps} />
				</div>
			</AuthProvider>
		</SWRConfig>
	);
}

export default App;
