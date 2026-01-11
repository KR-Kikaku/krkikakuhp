import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';

const defaultPrivacyPolicy = `
<div style="line-height: 2;">

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">1. 個人情報の定義</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの、及び他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものをいいます。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">2. 個人情報の収集</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、お客様から個人情報を収集する場合、あらかじめその利用目的を明示し、適法かつ公正な手段によって収集いたします。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">3. 個人情報の利用目的</h2>
<p style="margin-bottom: 1rem; color: #4b5563;">当社は、お客様から収集した個人情報を以下の目的で利用いたします。</p>
<ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style: disc; color: #4b5563;">
<li style="margin-bottom: 0.5rem;">サービスの提供・運営</li>
<li style="margin-bottom: 0.5rem;">お客様からのお問い合わせへの対応</li>
<li style="margin-bottom: 0.5rem;">サービスに関するご案内やお知らせの配信</li>
<li style="margin-bottom: 0.5rem;">利用規約に違反した利用者への対応</li>
<li style="margin-bottom: 0.5rem;">その他、上記利用目的に付随する目的</li>
</ul>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">4. 個人情報の第三者提供</h2>
<p style="margin-bottom: 1rem; color: #4b5563;">当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。</p>
<ul style="margin-left: 1.5rem; margin-bottom: 1.5rem; list-style: disc; color: #4b5563;">
<li style="margin-bottom: 0.5rem;">法令に基づく場合</li>
<li style="margin-bottom: 0.5rem;">人の生命、身体または財産の保護のために必要がある場合</li>
<li style="margin-bottom: 0.5rem;">公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合</li>
<li style="margin-bottom: 0.5rem;">国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合</li>
</ul>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">5. 個人情報の安全管理</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、個人情報の漏えい、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">6. 個人情報の開示・訂正・削除</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、お客様ご本人から個人情報の開示、訂正、削除等のご請求があった場合、ご本人確認の上、合理的な期間内に対応いたします。</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">7. お問い合わせ窓口</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。</p>
<p style="margin-bottom: 1.5rem; color: #4b5563;">合同会社 KR企画<br>
電話番号：00-0000-0000</p>

<h2 style="font-size: 1.5rem; font-weight: 600; margin-top: 3rem; margin-bottom: 1rem; color: #1f2937;">8. プライバシーポリシーの変更</h2>
<p style="margin-bottom: 1.5rem; color: #4b5563;">当社は、必要に応じて本プライバシーポリシーを変更することがあります。変更した場合には、当ウェブサイト上で通知いたします。</p>

<p style="margin-top: 3rem; text-align: right; color: #6b7280;">制定日：2025年12月23日<br>合同会社 KR企画</p>

</div>
`;

export default function PrivacyPolicy() {
  const [settings, setSettings] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      const data = await base44.entities.SiteSettings.list();
      if (data.length > 0) setSettings(data[0]);
    };
    fetchSettings();
  }, []);

  const handleNavigate = (id) => {
    navigate(createPageUrl('Home') + `#${id}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <main className="pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-light text-center mb-12 tracking-wide text-gray-800">
            プライバシーポリシー
          </h1>

          <div 
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: settings?.privacy_policy || defaultPrivacyPolicy }}
          />
        </div>
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}