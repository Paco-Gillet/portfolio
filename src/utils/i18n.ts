import { useI18n } from 'vue-i18n'

/**
 * Flexible translation helper.
 * If the value matches an existing translation key, it returns the translated string.
 * Otherwise, it returns the raw value unchanged.
 */
export function useTranslate() {
  const { t, te } = useI18n()

  const translate = (value?: string | null): string => {
    if (!value) return ''
    try {
      return te(value) ? t(value) : value
    } catch {
      return value
    }
  }

  return { translate, t, te }
}
