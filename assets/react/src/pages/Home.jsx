import { Head, usePage } from '@inertiajs/react';
import Layout from '@/components/Layout';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import RoadmapSection from '@/components/RoadmapSection';
import OpenSourceSection from '@/components/OpenSourceSection';
import FAQSection from '@/components/FAQSection';
import ReadyToShipSection from '@/components/ReadyToShipSection';

export default function Home() {
  const {
    hero = {},
    features = [],
    roadmap = [],
    openSource = {},
    faqs = [],
    cta = {},
  } = usePage().props;

  return (
    <Layout>
      <Head title="Home" />
      <HeroSection hero={hero} />
      <FeaturesSection features={features} />
      <RoadmapSection roadmap={roadmap} />
      <OpenSourceSection openSource={openSource} />
      <FAQSection faqs={faqs} />
      <ReadyToShipSection cta={cta} />
    </Layout>
  );
}
