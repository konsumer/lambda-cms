// TODO: eventuially these will be in other repos

import React, { createContext, useContext } from 'rect'

import TransportGitlab from './transport/gitlab'
import * as ThemeRsuite from './themes/rsuite'
import PageList from './pages/list'
import PageEdit from './pages/edit'

const context = createContext()
const useVercelCMS = () => useContext(context)

// context-provider
const VercelCMS = ({ children, config }) => {
  const Transport = config.transport
  const value = { config, transport: new Transport(config) }
  return (
    <context.Provider value={value}>{children}</context.Provider>
  )
}

export { TransportGitlab, ThemeRsuite, PageList, PageEdit, context, useVercelCMS, VercelCMS }
export default VercelCMS
