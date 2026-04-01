import { getBaseUrl } from '../lib/utils/url'

export const REVALIDATE = 60

export const ADS_CONFIG = {
  enabled: process.env.NEXT_PUBLIC_ENABLE_ADS === 'true',
  clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '',
  slots: {
    homeFeed: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_FEED || '',
    postAfterContent: process.env.NEXT_PUBLIC_ADSENSE_SLOT_POST_AFTER_CONTENT || '',
  },
}

export const CONFIG = {
  BLOG_TITLE: 'interittus13',
  getBaseUrl,
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID as string,
  DATE_FORMAT: 'DD MMM YYYY',
  GISCUS: {
    ENABLE: true,
    REPO: 'interittus13/interittus13.in',
    REPO_ID: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
    CATEGORY: 'Q&A',
    CATEGORY_ID: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
    MAPPING: 'title',
    REACTIONS: '1',
    METADATA: '0',
    INPUT_POSITION: 'top',
    LANG: 'en',
    LOADING: 'lazy',
  },
  REVALIDATE,
}

export const shouldRenderAds = ADS_CONFIG.enabled && !!ADS_CONFIG.clientId