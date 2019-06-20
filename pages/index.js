import "bootstrap/dist/css/bootstrap.css";

import { withTranslation, Link, i18n } from '../src/i18n'
import React from 'react'

import Head from '../components/head'

const Homepage = (props) => {
  let {t} = props
  return (
    <div>
      <Head title="Home" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {t('change_language')} <Link href='/th-th/'><a>TH</a></Link> | <Link href="/en-th/"><a>EN</a></Link>
          </div>
          <div className="col-12">
            hello i18n=>{t('hello')}<br />
          </div>
        </div>
      </div>
    </div>
  )
}

Homepage.getInitialProps = () => {
  return {
      namespacesRequired: ['common'],
  }
}

export default withTranslation('common')(Homepage)
