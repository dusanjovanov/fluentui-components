import { initializeIcons } from '@uifabric/icons'
import { OptionType } from './types'
import { DetailsList } from './components/details-list/DetailsList'
import { InfiniteDetailsList } from './components/infinite-details-list/InfiniteDetailsList'
import {
  DetailsListColumn,
  DetailsListSortProp
} from './components/details-list/types'
import { FluentComponentsProvider, Theme } from './FluentComponentsContext'
import { SearchableDropdown } from './components/searchable-dropdown/SearchableDropdown'
import { useFluentReactSelect } from './components/fluent-react-select'
import { useTheme as useFluentTheme } from './useTheme'

initializeIcons()

export {
  OptionType,
  DetailsList,
  InfiniteDetailsList,
  DetailsListColumn,
  DetailsListSortProp,
  FluentComponentsProvider,
  Theme,
  SearchableDropdown,
  useFluentReactSelect,
  useFluentTheme
}
