# WIP

The idea is to provide a headless nextjs-based CMS that can be deployed on vercel or lambda to edit a static site.

Each transport should implement a simple API that looks like this:

```js
export default class MyTransport {
  constructor (config: Object) {}

  // output info for a form to login as the user
  async auth(): Object {}

  // check if user is authorized
  async isAuth(): boolean {}

  // get a file from user's project
  async get(file: string) : string {}

  // save a file to user's project
  async put(file: string, contents: string) : boolean {}

  // list the files in a project, pattern is a glob
  async list(pattern: string) : string[] {}
}
```

This transport should be a complete set of functions to edit the source of your site, so something else can build it (like gatsby, nextjs, or whatever.)

You can also implement a theme, which exports react-element for `Page` (for all pages), `Type` (a single type form), `Auth` (content part of auth form), or any of the named field-types. There is a default theme that uses [rsuite](https://rsuitejs.com/).

### config

To config, you should give it an object that looks like this:

```js
import {
  TransportGitlab,
  ThemeRsuite
} from 'vercel-cms'
import slugify from 'slugify'

const {
  Page,
  Type,
  Auth,
  ContentTypeMarkdown,
  TypeFrontmatterText,
  TypeFrontmatterDate,
  TypeFrontmatterStringArray,
  TypeMarkdownBody,
  PreviewMarkdown
} = ThemeRsuite

export default {
  transport: TransportGitlab,
  theme: {
    page: Page,
    type: Type,
    auth: Auth
  },
  urls: {
    list: '/admin',
    edit: '/admin/edit'
  },
  types: {
    'post': {
      name: 'Post',
      pattern: 'content/posts/*.md',
      filename: ({ date, title }) => `content/posts/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}/${slugify(title)}.md`,
      type: ContentTypeMarkdown,
      preview: PreviewMarkdown,
      fields: [
        { name: 'title', label: 'Title', required: true, type: TypeFrontmatterText },
        { name: 'date', label: 'Date', default: field => Date.now(), type: TypeFrontmatterDate },
        { name: 'tags', label: 'Tags', type: TypeFrontmatterStringArray },
        { name: 'body', type: TypeMarkdownBody }
      ]
    }
  },
  
  // extra config
  project: 'konsumer/myproject', // for TransportGitlab
  themeVariant: 'dark' // for ThemeRsuite
}
```

The idea is that everything is overidable, and not really automatic, so you can mix & match it however you like. Instead of importing ours, you can use any of them as an example to make your own. You can add any other config, and it will passed to your transport and theme-components.

There are 2 pages that should match the config, that you need to make in your app:

```js
// in your pages/admin.js
export VercelCMS, { PageList } from 'vercel-cms'
import config from './.cms.js' // or wherever you put config from above

export default () => <VercelCMS config={config}><PageList /></VercelCMS>

// in your pages/admin/edit.js
export VercelCMS, { PageEdit } from 'vercel-cms'
import config from './.cms.js' // or wherever you put config from above

export default () => <VercelCMS config={config}><PageEdit /></VercelCMS>
```

These will create an admin for you. `<VercelCMS />` is a context-provider, so you can put it in the top-level of your admin app, however you do that.


### TODO

* actually implement these ideas
* make a basic set of widgets for a standard blog
* document theme, types, etc better
* make a few simple demo projects that use different renderers
* setup monorepo for all the sub-projects, so themes, transports, etc can be more ala-carte
