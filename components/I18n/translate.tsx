import { useIntl } from 'react-intl'

// const translate = (id: string, value: any = {}) => {
//   return <FormattedMessage id={"app.name"} values={{ ...value }} />
// }

const translate = (id: string) => {
  console.log('INITAL TRAN ', id)
  const { formatMessage: t } = useIntl()
  return t({id})
}
export default translate
