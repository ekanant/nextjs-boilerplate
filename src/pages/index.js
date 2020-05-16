import "bootstrap/dist/css/bootstrap.css";

import { withTranslation, i18n } from '@/i18n'
import Link from 'next/link'
import React from 'react'
import PropTypes from 'prop-types'


import Head from '@/components/head'

const changeLanguage = (locale) => {
  i18n.changeLanguage(locale)
}

const Homepage = (props) => {
  let { t } = props
  return (
    <div>
      <Head title="Home" />
      <div className="container">
        <div className="row">
          <div className="col-12">
            {t('change_language')} <Link href={{ pathname: '/', query: {} }}><a onClick={(e) => {e.preventDefault();changeLanguage('th-th');}}>TH</a></Link> | <Link href={{ pathname: '/en-th', query: {} }}><a onClick={(e) => {e.preventDefault();changeLanguage('en-th');}}>EN</a></Link><br />

            <div>
              Current locale {i18n.language}
            </div>
          </div>
          <div className="col-12">
            hello i18n=>{t('hello')}<br />
          </div>
        </div>
      </div>
    </div>
  )
}

Homepage.getInitialProps = async () => ({
  namespacesRequired: ['common'],
})

Homepage.propTypes = {
  t: PropTypes.func.isRequired,
}

export default withTranslation('common')(Homepage)
