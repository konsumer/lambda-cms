import React from 'react'

// shared for all pages
export const Page = ({ children }) => (<div>Page</div>)

// show the authentication form
export const Auth = ({ field }) => (<div>Auth</div>)

// show a list of files
export const List = ({ files }) => <div>PreviewMarkdown</div>

// display the preview
export const Preview = ({ content }) => <div>PreviewMarkdown</div>

// display the edit form
export const Edit = ({ content }) => <div>PreviewMarkdown</div>
