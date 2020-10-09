# WIP

The idea is to provide a headless nextjs-based CMS that can be deployed on vercel or lambda.

Each transport should implement a simple API that looks like this:

```js
export default class MyTransport {
  // create a form to login as the user, config is from below
  async auth(config: any): JSX.Element {}

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

You can also implement a theme, which exports react-element for `Page` (for all pages), `Type` (a single type form), `Auth` (content part of auth form), or any of the named field-types. There is a default theme that uses [rsuite](https://rsuitejs.com/).

### config

To config, you should give it an object that looks like this:

```js
import {
  ThemeRsuite,
  TransportGitlab,
  ContentTypeMarkdown,
  TypeFrontmatterText.
  TypeFrontmatterDate,
  TypeFrontmatterStringArray,
  TypeMarkdownBody
} from 'vercel-cms'

export default {
  transport: TransportGitlab,
  theme: ThemeRsuite,
  project: 'konsumer/myproject',
  urls: {
    list: '/admin',
    edit: '/admin/edit'
  },
  types: {
    'post': {
      name: 'Post',
      pattern: 'content/posts/*.md',
      type: ContentTypeMarkdown,
      fields: [
        { name: 'title', label: 'Title', required: true, type: TypeFrontmatterText },
        { name: 'date', label: 'Date', default: () => Date.now(), type: TypeFrontmatterDate },
        { name: 'tags', label: 'Tags', type: TypeFrontmatterStringArray },
        { name: 'body', type: TypeMarkdownBody }
      ]
    }
  }
}
```

Instead of importing ours, you can use any of them as an example of how to make your own.

There are 2 pages that should match the config, that you need to make in your app:

```js
// in your pages/admin.js
export { PageList } from 'vercel-cms'
import config from './.cms.js' // or wherever you put config from above
export default PageList(config)

// in your pages/admin/edit.js
export { PageEdit } from 'vercel-cms'
import config from './.cms.js' // or wherever you put config from above
export default PageEdit(config)
```

These will create an admin for you.


### TODO

* actually implement these ideas
* make a basic set of widgets for a standard blog
* document theme, types, etc better
* setup monorepo for all the sub-projects, so themes & transports can be more ala-carte