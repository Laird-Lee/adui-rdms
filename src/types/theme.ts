import { type THEME_MODE, THEME_STYLE } from '@/constants/theme.ts'

export type ThemeMode = (typeof THEME_MODE)[keyof typeof THEME_MODE]
export type ThemeStyle = (typeof THEME_STYLE)[keyof typeof THEME_STYLE]

export interface ThemeConfig {
  mode: ThemeMode
  style: ThemeStyle
}
