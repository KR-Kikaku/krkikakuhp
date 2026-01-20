import React, { useEffect } from 'react';

export default function Layout({ children }) {
  useEffect(() => {
    // 即座に実行
    const setupLanguage = () => {
      // HTML要素に設定
      document.documentElement.lang = 'ja';
      document.documentElement.setAttribute('translate', 'no');
      document.documentElement.classList.add('notranslate');
      
      // body要素に設定
      document.body.lang = 'ja';
      document.body.setAttribute('translate', 'no');
      document.body.classList.add('notranslate');
      
      // 既存のメタタグをすべて削除してから再追加
      document.querySelectorAll('meta[name="google"]').forEach(el => el.remove());
      document.querySelectorAll('meta[name="googlebot"]').forEach(el => el.remove());
      document.querySelectorAll('meta[http-equiv="Content-Language"]').forEach(el => el.remove());
      
      // メタタグを追加
      const metaGoogle = document.createElement('meta');
      metaGoogle.name = 'google';
      metaGoogle.content = 'notranslate';
      document.head.insertBefore(metaGoogle, document.head.firstChild);
      
      const metaGoogleBot = document.createElement('meta');
      metaGoogleBot.name = 'googlebot';
      metaGoogleBot.content = 'notranslate';
      document.head.insertBefore(metaGoogleBot, document.head.firstChild);
      
      const metaContentLang = document.createElement('meta');
      metaContentLang.httpEquiv = 'Content-Language';
      metaContentLang.content = 'ja';
      document.head.insertBefore(metaContentLang, document.head.firstChild);
      
      // すべてのテキストノードに翻訳禁止クラスを追加
      document.querySelectorAll('*').forEach(el => {
        if (!el.classList.contains('notranslate')) {
          el.classList.add('notranslate');
        }
      });
    };
    
    setupLanguage();
    
    // DOM変更を監視して常に適用
    const observer = new MutationObserver(setupLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang', 'translate', 'class']
    });
    
    return () => observer.disconnect();
  }, []);

  return <div className="notranslate" translate="no">{children}</div>;
}