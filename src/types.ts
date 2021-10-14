export interface Post {
	username: string;
	url: string;
	body?: string;
	identifier: string;
	title: string;
	slug: string;
	subname: string;
	createdAt: string;
	updatedAt: string;
	voteScore?: number;
	commentCount?: number;
	userVote?: number;
}

export interface User {
	username: string;
	email: string;
	createdAt: string;
	updated: string;
}

export interface Sub {
	createdAt: string;
	updatedAt: string;
	name: string;
	title: string;
	description: string;
	username: string;
	posts: Post[];
	// Virtuals
	imageUrn: string;
	bannerUrn: string;
	postCount?: number;
}
