const CONFIG = {
  BLOG_TITLE: 'interittus13',
  link: 'https://interittus.in',
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID,
  UTTERANCES: {
    ENABLE: true,
    CONFIG: {
      repo: 'interittus13/interittus.in',
      'issue-term': 'og:title',
      label: '💬 Utterances',
    },
  },
}

module.exports = { CONFIG }
