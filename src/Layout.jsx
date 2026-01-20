import React, { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    // HTMLのlang属性を設定
    document.documentElement.lang = 'ja';
    
    // metaタグを設定
    let metaGoogle = document.querySelector('meta[name="google"]');
    if (!metaGoogle) {
      metaGoogle = document.createElement('meta');
      metaGoogle.name = 'google';
      metaGoogle.content = 'notranslate';
      document.head.appendChild(metaGoogle);
    }
    
    let metaContentLanguage = document.querySelector('meta[http-equiv="Content-Language"]');
    if (!metaContentLanguage) {
      metaContentLanguage = document.createElement('meta');
      metaContentLanguage.httpEquiv = 'Content-Language';
      metaContentLanguage.content = 'ja';
      document.head.appendChild(metaContentLanguage);
    }
  }, []);

  return <>{children}</>;
}