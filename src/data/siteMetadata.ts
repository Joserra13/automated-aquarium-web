/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Automated Aquarium Blog',
  author: 'Joserra13',
  headerTitle: 'Blog',
  description: 'A blog created for Automated aquarium updates',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://automated-aquarium.vercel.app/',
  siteRepo: 'https://github.com/Joserra13/automated-aquarium-web',
  // set to true if you want a navbar fixed to the top
  stickyNav: false,
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue, emailoctopus, beehive
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  },
  search: {
    provider: 'kbar', // kbar or algolia
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`, // path to load documents to search
    },
  },
}

export default siteMetadata
