export default class TransportGitlab {
  // create a form to login as the user, config is from below
  async auth (config) {}

  // check if user is authorized
  async isAuth () {}

  // get a file from user's project
  async get (file) {}

  // save a file to user's project
  async put (file, contents) {}

  // list the files in a project, pattern is a glob
  async list (pattern) {}
}
