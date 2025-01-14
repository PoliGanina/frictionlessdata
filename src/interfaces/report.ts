import { IError } from './error'

export interface IReport {
  valid: boolean
  stats: { tasks: number; errors: number; warnings: number; seconds: number }
  warnigns: string[]
  errors: IError[]
  tasks: IReportTask[]
}

export interface IReportTask {
  valid: boolean
  name: string
  type: string
  place: string
  labels: string[]
  stats: { errors: number; warnings: number; seconds: number }
  errors: IError[]
}
