import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

const titles = {
  404: 'Page not found',
  500: 'Server error',
};

export default function Error({ status = 500, path = '' }) {
  const title = titles[status] ?? 'Error';

  return (
    <Layout>
      <Head title={`${status} ${title}`} />
      <section className="container mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-32 text-center">
        <p className="text-7xl font-bold tracking-tighter">{status}</p>
        <h1 className="text-3xl font-semibold">{title}</h1>
        {status === 404 && (
          <p className="max-w-[600px] text-lg text-muted-foreground">
            The page <code className="text-foreground">{path}</code> does not exist.
          </p>
        )}
        <Button asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go back home
          </Link>
        </Button>
      </section>
    </Layout>
  );
}
