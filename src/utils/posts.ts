import { getCollection } from 'astro:content'
import { defaultLang, isLang, localizedPath, type Lang } from '../i18n/config'

export function getPostLang(postId: string): Lang {
	const firstSegment = postId.split('/')[0]
	return isLang(firstSegment) ? firstSegment : defaultLang
}

export function getPostSlug(postId: string) {
	const segments = postId.split('/')
	const slug = isLang(segments[0]) ? segments.slice(1).join('/') : postId
	return slug.replace(/\.(md|mdx)$/, '')
}

export function withPostUrl(post: any, lang: Lang) {
	const slug = getPostSlug(post.id)

	return {
		...post,
		url: localizedPath(lang, `/blog/${slug}`),
	}
}

export async function getPostsByLang(lang: Lang) {
	const allPosts = await getCollection('blog')
	return allPosts
		.filter((post) => getPostLang(post.id) === lang)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
}
