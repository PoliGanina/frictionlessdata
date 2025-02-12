import * as React from 'react'
import * as zustand from 'zustand'
import create from 'zustand/vanilla'
import { assert } from 'ts-essentials'
import { Client } from '../../../client'
import { FilesProps } from './Files'

export interface State {
  // Data

  client: Client
  path?: string
  paths: string[]
  onPathChange: (path?: string) => void

  // Logic

  listFiles: () => Promise<void>
  createFile: (file: File) => Promise<void>
  selectFile: (path?: string) => void
  deleteFile: () => Promise<void>
  createPackage: () => Promise<void>
}

export function createStore(props: FilesProps) {
  return create<State>((set, get) => ({
    // Data

    client: props.client,
    onPathChange: props.onPathChange,
    paths: [],

    // Logic

    listFiles: async () => {
      const { client } = get()
      const { paths } = await client.projectListFiles()
      set({ paths })
    },
    selectFile: (path) => {
      const { onPathChange, paths } = get()
      if (path && !paths.includes(path)) return
      if (get().path === path) return
      set({ path })
      onPathChange(path)
    },
    createFile: async (file) => {
      // TODO: show a proper error dialog
      if (file.size > 10000000) {
        alert('Currently only files under 10Mb are supported')
        return
      }
      const { client, listFiles, selectFile } = get()
      const { path } = await client.projectCreateFile({ file })
      await listFiles()
      selectFile(path)
    },
    deleteFile: async () => {
      const { client, path, listFiles, selectFile } = get()
      if (!path) return
      await client.projectDeleteFile({ path })
      await listFiles()
      selectFile(undefined)
    },
    createPackage: async () => {
      const { client, listFiles, selectFile } = get()
      const { path } = await client.projectCreatePackage()
      await listFiles()
      selectFile(path)
    },
  }))
}

export function useStore<R>(selector: (state: State) => R): R {
  const store = React.useContext(StoreContext)
  assert(store, 'store provider is required')
  return zustand.useStore(store, selector)
}

const StoreContext = React.createContext<zustand.StoreApi<State> | null>(null)
export const StoreProvider = StoreContext.Provider
