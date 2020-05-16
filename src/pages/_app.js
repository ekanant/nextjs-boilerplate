import "bootstrap/dist/css/bootstrap.css";
import React from 'react'
import { appWithTranslation } from '../i18n'

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default appWithTranslation(MyApp)
