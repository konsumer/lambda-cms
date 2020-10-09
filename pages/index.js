import React from 'react'
import { useCookies } from 'react-cookie'
import Page from '../components/Page'

const PageIndex = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['auth'])
  return (
    <div>
      FORM GOES HERE
    </div>
  )
}

export default () => <Page><PageIndex /></Page>
