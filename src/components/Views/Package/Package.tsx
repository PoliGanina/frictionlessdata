import * as React from 'react'
import { StoreProvider, createStore } from './store'
import { IPackage, IResource } from '../../../interfaces'
import { ThemeProvider } from '@mui/material/styles'
import * as themes from '../../../themes'
import Layout from './Layout'

export interface PackageProps {
  withTabs?: boolean
  package?: IPackage
  onCommit?: (pkg: IPackage) => void
  onRevert?: (pkg: IPackage) => void
  loadPaths?: () => Promise<string[]>
  loadResource?: (path: string) => Promise<IResource>
}

export default function Package(props: PackageProps) {
  const store = React.useMemo(() => createStore(props), Object.values(props))
  console.log(store)
  return (
    <ThemeProvider theme={themes.DEFAULT}>
      <StoreProvider value={store}>
        <Layout />
      </StoreProvider>
    </ThemeProvider>
  )
}
