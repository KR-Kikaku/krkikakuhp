import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export default function Layout({ children }) {
  useEffect(() => {
    // HTMLのlang属性を設定
    document.documentElement.lang = 'ja';
  }, []);

  return (
    <>
      <Helmet>
        <html lang="ja" />
        <meta name="google" content="notranslate" />
        <meta httpEquiv="Content-Language" content="ja" />
        <title>KR企画</title>
      </Helmet>
      {children}
    </>
  );
}