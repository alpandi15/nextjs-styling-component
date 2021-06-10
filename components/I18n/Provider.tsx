import React, { ReactNode } from 'react'
import { IntlProvider } from 'react-intl'
import flatten from 'flat'

import { LOCALES } from 'constants/index'
import messages from './messages'
import { useRouter } from 'next/router'

interface I18nProps {
  children: ReactNode,
  locale: string
}

const Provider = ({
  children,
  locale = LOCALES.INDONESIA
}: I18nProps) => {
  const { defaultLocale } = useRouter()
  return (
    <IntlProvider
      textComponent={React.Fragment}
      locale={locale}
      defaultLocale={defaultLocale}
      messages={flatten(messages[locale])}
    >
      {children}
    </IntlProvider>
  )
}

Provider.displayName = 'I18nProvider'

export default Provider