import React, { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    // HTMLのlang属性を設定
    document.documentElement.lang = 'ja';
    document.documentElement.setAttribute('translate', 'no');
    document.documentElement.className = 'notranslate';
    
    // bodyにも翻訳禁止属性を設定
    document.body.setAttribute('translate', 'no');
    document.body.classList.add('notranslate');
    
    // 複数のメタタグで翻訳を防止
    const metaTags = [
      { name: 'google', content: 'notranslate' },
      { name: 'googlebot', content: 'notranslate' }
    ];
    
    metaTags.forEach(({ name, content }) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        meta.content = content;
        document.head.appendChild(meta);
      }
    });
    
    let metaContentLanguage = document.querySelector('meta[http-equiv="Content-Language"]');
    if (!metaContentLanguage) {
      metaContentLanguage = document.createElement('meta');
      metaContentLanguage.httpEquiv = 'Content-Language';
      metaContentLanguage.content = 'ja';
      document.head.appendChild(metaContentLanguage);
    }
  }, []);

  return <div className="notranslate" translate="no">{children}</div>;
}