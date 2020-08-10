import { useContext } from 'react'
import { FluentComponentsContext } from './FluentComponentsContext'

export const useTheme = () => {
  return useContext(FluentComponentsContext)
}
