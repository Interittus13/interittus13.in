export const CONFIG = {
  BLOG_TITLE: 'interittus13',
  link: 'https://interittus.in',
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID as string,
  DATE_FORMAT: 'DD MMM YYYY',
  UTTERANCES: {
    ENABLE: true,
    CONFIG: {
      repo: 'interittus13/interittus.in',
      'issue-term': 'og:title',
      label: '💬 Utterances',
    }, 
  },
}
