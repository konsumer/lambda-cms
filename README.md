# WIP

The idea is to provide a headless nextjs-based CMS that can be deployed on vercel or lambda.

Each transport should implement a simple API that looks like this:

```js
export default class MyTransport {
  // create a form to login as the user, config is from config, below
  async auth(handleSubmit: Function, config: any): JSX.Element {}

  // check if user is authorized
  async isAuth(): boolean

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
import { TransportGitlab } from 'vercel-cms'
import { ThemeRsuite } from 'vercel-cms'

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
      fields: [
        { name: 'title', label: 'Title', type: 'FrontmatterText' },
        { name: 'date', label: 'Date', default: () => Date.now(), type: 'FrontmatterDate' },
        { name: 'tags', label: 'Tags', default: () => Date.now(), type: 'FrontmatterStringArray' },
        { name: 'body', type: 'MarkdownBody' }
      ]
    }
  }
}
```

Usage:

```js
// in your pages/admin.js
export { PageList } from 'vercel-cms'
import config from './.cms.js' // or wherever you put config
export default PageList(config)

// in your pages/admin/edit.js
export { PageEdit } from 'vercel-cms'
export default PageEdit(config)
```

These will create an admin for you.


### TODO

* actually implement these ideas
* make a basic set of widgets for a standard blog (`FrontmatterText`, `FrontmatterStringArray`, `FrontmatterDate`, `MarkdownBody`)
* document theme better
* setup monorepo for all the sub-projects, so themes & transports can be more ala-carte