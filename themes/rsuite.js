import React from 'react'

// shared for all pages
export const Page = ({ children }) => (<div>Page</div>)

// show the authentication form                           
export const Auth = ({ field }) => (<div>Auth</div>)

// show the form for this type
export const ContentTypeMarkdown = ({ type }) => <div>ContentTypeMarkdown</div>

// some field-formatters
export const TypeFrontmatterText = ({ field, value, onChange }) => <div>TypeFrontmatterText</div>
export const TypeFrontmatterDate = ({ field, value, onChange }) => <div>TypeFrontmatterDate</div>
export const TypeFrontmatterStringArray = ({ field, value, onChange }) => <div>TypeFrontmatterStringArray</div>
export const TypeMarkdownBody = ({ field, value, onChange }) => <div>TypeMarkdownBody</div>

// display the preview
export const PreviewMarkdown = ({ content }) => <div>PreviewMarkdown</div>
