import React from 'react'
import { CookiesProvider } from 'react-cookie'

const Page = props => (
  <CookiesProvider {...props} />
)

export default Page
