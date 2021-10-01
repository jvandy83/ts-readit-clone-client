import { Navbar } from '../components/navbar';

import { useRouter } from 'next/router';

import axios from 'axios';

import '../styles/tailwind.css';

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
	const router = useRouter();
	const authRoutes = ['/login', '/register'];
	const renderNavbar = !authRoutes.includes(router.pathname);
	return (
		<>
			{renderNavbar && <Navbar />}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
