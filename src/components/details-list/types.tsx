import { CSSProperties, ReactNode } from 'react'
import {
  GridCellRenderer,
  MultiGridProps,
  MultiGrid,
  Index
} from 'react-virtualized'
import { DraggableData } from 'react-draggable'

export type DetailsListColumn = {
  label: string
  key: string
  isSortable?: boolean
  width: number
  align?: 'left' | 'center' | 'right'
  style?: CSSProperties
  render?: (props: DetailsListCustomCellProps) => ReactNode
  transform?: (props: DetailsListCustomCellProps) => ReactNode
  renderLabel?: (props: {
    col: DetailsListColumn
    colIndex: number
  }) => ReactNode
  renderHeader?: (props: {
    col: DetailsListColumn
    colIndex: number
  }) => ReactNode
  data?: { [key: string]: any }
  truncateProps?: (props: DetailsListCustomCellProps) => any
  cellProps?: (props: DetailsListCustomCellProps) => any
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
  isLoading?: boolean
  noDataMessage?: string
  onResizeCol?: (props: {
    col: DetailsListColumn
    colIndex: number
    x: number
    y: number
  }) => void
} & Partial<MultiGridProps>

export type DetailsListHoverState = {
  col: DetailsListColumn | null
  row: any
  rowIndex: number | null
  colIndex: number | null
}

export type DetailsListCustomCellProps = {
  col: DetailsListColumn
  row: any
  colIndex: number
  rowIndex: number
}
