import * as React from 'react'
import * as zustand from 'zustand'
import create from 'zustand/vanilla'
import { assert } from 'ts-essentials'
import { Client } from '../../client'
import { IRecord } from '../../interfaces'
import { ApplicationProps } from './Application'

export interface State {
  // Data

  client: Client
  path?: string
  record?: IRecord

  // Logic

  selectPath: (path?: string) => void
}

export function createStore(props: ApplicationProps) {
  return create<State>((set, get) => ({
    // Data
    ...props,

    // Logic
    selectPath: async (path) => {
      const { client } = get()
      set({ path })
      if (path) {
        const { record } = await client.projectCreateRecord({ path })
        set({ record })
      }
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
