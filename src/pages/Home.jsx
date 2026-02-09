import React, { useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import Carousel from '@/components/public/Carousel';
import GreetingSection from '@/components/public/GreetingSection';
import BusinessSection from '@/components/public/BusinessSection';
import NewsSection from '@/components/public/NewsSection';
import CompanySection from '@/components/public/CompanySection';
import ContactSection from '@/components/public/ContactSection';

export default function Home() {
  useEffect(() => {
    const trackVisit = async () => {
      const today = new Date().toISOString().split('T')[0];
      await base44.entities.Visitor.create({
        visit_date: today,
        page: 'Home'
      });
    };
    trackVisit();
  }, []);

  const handleNavigate = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigate} />
      <div className="pt-20">
        <Carousel />
        <GreetingSection />
        <BusinessSection />
        <NewsSection />
        <CompanySection />
        <ContactSection />
      </div>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}