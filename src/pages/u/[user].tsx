import { useRouter } from 'next/router';

import useSwr from 'swr';

import PostCard from '../../components/Postcard';

export default function UserPosts() {
	const router = useRouter();
	const { user } = router.query;

	const { data: submissions } = useSwr(user ? `/users/${user}` : null);

	return (
		<div className='container pt-4'>
			{submissions?.map((post) => (
				<PostCard post={post} />
			))}
		</div>
	);
}
