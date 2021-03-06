// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document';
import memoize from 'lodash.memoize'

import { readFileSync } from 'fs';
import {resolve} from 'path'

const doGetContent = (file) => readFileSync(resolve(process.cwd(), ".next", file), "utf8");
const getContent = process.env.NODE_ENV === "production" ? memoize(doGetContent) : doGetContent;

const __getInlineStyles = documentProps => {
  const { assetPrefix, files } = documentProps;
    if (!files || files.length === 0) return null;

    return files.filter(file => /\.css$/.test(file)).map(file => (
      <style
        key={file}
        data-href={`${assetPrefix}/_next/${file}`}
        dangerouslySetInnerHTML={{
          __html: getContent( file),
        }}
      />
    ));
}

class InlineStylesHead extends Head {

  getCssLinks() {
    /**
     * I want a style tag int bottom of body for faster FCP.
     */
    return <React.Fragment></React.Fragment>;
    //return this.__getInlineStyles()
  }

  __getInlineStyles() {
    return __getInlineStyles(this.context._documentProps)
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <InlineStylesHead>
          <style>{`body { margin: 0 } /* custom! */`}</style>
        </InlineStylesHead>
        <body className="custom_class">
          <Main />
          <NextScript />
          {__getInlineStyles(this.props)}
        </body>
      </Html>
    );
  }
}

export default MyDocument;