import rss from '@astrojs/rss'
import { normalizeLang, supportedLangs } from '../../i18n/config'
import { useTranslations } from '../../i18n/ui'
import { getPostsByLang, getPostSlug } from '../../utils/posts'

export function getStaticPaths() {
	return supportedLangs.map((lang) => ({ params: { lang } }))
}

export async function GET(context) {
	const lang = normalizeLang(context.params.lang)
	const t = useTranslations(lang)
	const posts = await getPostsByLang(lang)

	return rss({
		title: t.siteTitle,
		description: t.siteDescription,
		site: context.site,
		items: posts.map((post) => ({
			title: post.data.title,
			pubDate: post.data.pubDate,
			description: post.data.description ?? '',
			link: `/${lang}/blog/${getPostSlug(post.id)}/`,
		})),
		customData: `<language>${lang}</language>`,
	})
}
