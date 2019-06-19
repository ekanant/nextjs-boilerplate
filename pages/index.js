import "bootstrap/dist/css/bootstrap.css";

import { withTranslation, Link } from '../src/i18n'
import React from 'react'

import Head from '../components/head'

const Homepage = (props) => {
  return (
    <div>
      <Head title="Home" />

      hello i18n=>{props.t('hello')}<br />
    </div>
  )
}

Homepage.getInitialProps = () => {
  return {
      namespacesRequired: ['common'],
  }
}

export default withTranslation('common')(Homepage)
