import React from 'react'
import PropTypes from 'prop-types';
import { appWithTranslation } from '../i18n'

import "bootstrap/dist/css/bootstrap.min.css"

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

MyApp.propTypes = {
  pageProps: PropTypes.any.isRequired,
  Component: PropTypes.element.isRequired,
};

export default appWithTranslation(MyApp)
