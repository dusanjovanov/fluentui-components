import { CSSProperties, ReactNode } from 'react'
import {
  GridCellRenderer,
  MultiGridProps,
  MultiGrid,
  Index
} from 'react-virtualized'

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

export type DetailsListProps = {
  cols: DetailsListColumn[]
  rows: any[]
  sort?: DetailsListSortProp
  onClickHeader?: (props: { col: DetailsListColumn; colIndex: number }) => void
  onClickCell?: (props: {
    col: DetailsListColumn
    row: any
    colIndex: number
    rowIndex: number
  }) => void
  bodyCellRenderer?: GridCellRenderer
  headerCellRenderer?: GridCellRenderer
  id: string
  refMultiGrid?: (ref: MultiGrid | null) => void
  height: MultiGridProps['height']
  width: MultiGridProps['width']
  columnWidth: number | ((params: Index) => number)
} & Partial<MultiGridProps>

export type DetailsListHoverState = {
  col: DetailsListColumn | null
  row: any
  rowIndex: number | null
  colIndex: number | null
}
