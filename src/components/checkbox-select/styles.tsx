import { ThemeExpanded } from '../../FluentComponentsContext'

export const getCheckboxStyles = (theme: ThemeExpanded) => {
  return {
    root: {
      selectors: {
        '&.is-checked:hover .ms-Checkbox-checkbox': {
          backgroundColor: theme.primaryDark,
          borderColor: theme.primaryDark
        }
      }
    },
    checkbox: {
      backgroundColor: 'white',
      selectors: {
        '.is-checked &': {
          backgroundColor: theme.primary,
          borderColor: theme.primary
        }
      }
    }
  }
}
