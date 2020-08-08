import { CSSProperties, ReactNode } from 'react'

export type DetailsListColumn = {
  label: string
  key: string
  isSortable?: boolean
  width: number
  align?: 'left' | 'center' | 'right'
  style?: CSSProperties
  render?: (props: {
    col: DetailsListColumn
    row: any
    colIndex: number
    rowIndex: number
  }) => ReactNode
  transform?: (props: {
    col: DetailsListColumn
    row: any
    colIndex: number
    rowIndex: number
  }) => ReactNode
  renderLabel?: (props: {
    col: DetailsListColumn
    colIndex: number
  }) => ReactNode
  renderHeader?: (props: {
    col: DetailsListColumn
    colIndex: number
  }) => ReactNode
  data?: { [key: string]: any }
}

export type DetailsListSortProp = {
  key: string
  dir: string
}
