import { IResource } from './resource'

export interface IPackage {
  name?: string
  title?: string
  description?: string
  homepage?: string
  version?: string
  created?: string
  imageUrl?: string
  resources: IResource[]
}
