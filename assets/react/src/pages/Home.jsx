import React from 'react';
import { usePage } from '@inertiajs/react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import OpenSourceSection from '@/components/OpenSourceSection';
import FAQSection from '@/components/FAQSection';
import ReadyToShipSection from '@/components/ReadyToShipSection';

export default function Home() {
  // Use usePage hook to access Inertia page props
  const { props: pageProps } = usePage();
  const {
    hero = {},
    features = [],
    openSource = {},
    faqs = [],
    cta = {}
  } = pageProps;
  
  return (
    <Layout>
      <HeroSection hero={hero} />
      <FeaturesSection features={features} />
      <OpenSourceSection openSource={openSource} />
      <FAQSection faqs={faqs} />
      <ReadyToShipSection cta={cta} />
    </Layout>
  );
}

