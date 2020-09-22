import React from 'react'
import { InfiniteLoader, InfiniteLoaderProps } from 'react-virtualized'
import { DetailsList } from '../details-list/DetailsList'
import { DetailsListProps } from '../details-list/types'

export type InfiniteDetailsListProps = DetailsListProps & {
  loadMoreRows: InfiniteLoaderProps['loadMoreRows']
  minimumBatchSize: InfiniteLoaderProps['minimumBatchSize']
  threshold: InfiniteLoaderProps['threshold']
  rowCount: InfiniteLoaderProps['rowCount']
}

export const InfiniteDetailsList = ({
  loadMoreRows,
  rowCount,
  minimumBatchSize,
  threshold,
  ...props
}: InfiniteDetailsListProps) => {
  return (
    <InfiniteLoader
      isRowLoaded={({ index }) => {
        return !!props.rows[index]
      }}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      minimumBatchSize={minimumBatchSize}
      threshold={threshold}
    >
      {({ onRowsRendered, registerChild }) => {
        return (
          <DetailsList
            {...props}
            rowCount={rowCount}
            refMultiGrid={(ref) => registerChild(ref)}
            onSectionRendered={(params) => {
              const { rowStartIndex, rowStopIndex } = params
              const startIndex = rowStartIndex
              const stopIndex = rowStopIndex
              if (props.onSectionRendered) {
                props.onSectionRendered(params)
              }
              onRowsRendered({ startIndex, stopIndex })
            }}
          />
        )
      }}
    </InfiniteLoader>
  )
}
