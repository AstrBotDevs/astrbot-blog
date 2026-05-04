import type { Lang } from './config';

export const ui = {
  'zh-cn': {
    siteName: 'AstrBot Blog',
    siteTitle: 'AstrBot Blog & News',
    siteDescription: 'AstrBot 是一个开源的 AI Agent 聊天机器人平台。',
    home: '首页',
    journal: '文章',
    blog: '博客',
    about: '关于',
    welcomeTo: '欢迎来到',
    recentPosts: '最新文章',
    readAll: '查看全部',
    goToAbout: '了解 AstrBot',
    getInTouch: '联系我们',
    sourceCode: '源码位于',
    latestPosts: '最新文章',
    allPosts: '全部文章',
    viewAllPosts: '查看全部文章',
    noPosts: '暂无文章。',
    readMore: '阅读全文',
    taggedWith: '包含标签',
    postsTaggedWith: '篇文章包含标签',
    previousPost: '上一篇',
    nextPost: '下一篇',
    minuteRead: '分钟阅读',
    aboutTitle: '关于 AstrBot',
    aboutBody:
      'AstrBot 是一个开源的 AI Agent 聊天机器人平台。这里发布项目动态、版本更新、社区活动和生态进展。',
  },
  en: {
    siteName: 'AstrBot Blog',
    siteTitle: 'AstrBot Blog & News',
    siteDescription: 'AstrBot is an open-source AI Agent chatbot platform.',
    home: 'Home',
    journal: 'Journal',
    blog: 'Blog',
    about: 'About',
    welcomeTo: 'Welcome to',
    recentPosts: 'Recent Posts',
    readAll: 'Read All',
    goToAbout: 'Go to About',
    getInTouch: 'Get in touch',
    sourceCode: 'Source code available on',
    latestPosts: 'Latest Posts',
    allPosts: 'All Posts',
    viewAllPosts: 'View All Posts',
    noPosts: 'No posts found.',
    readMore: 'Read more',
    taggedWith: 'tagged with',
    postsTaggedWith: 'posts tagged with',
    previousPost: 'Previous Post',
    nextPost: 'Next Post',
    minuteRead: 'min read',
    aboutTitle: 'About AstrBot',
    aboutBody:
      'AstrBot is an open-source AI Agent chatbot platform. This blog shares project news, release updates, community events, and ecosystem progress.',
  },
} satisfies Record<Lang, Record<string, string>>;

export function useTranslations(lang: Lang) {
  return ui[lang];
}
