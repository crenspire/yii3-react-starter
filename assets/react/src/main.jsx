import { createInertiaApp, router } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import './app.css';

const appName = 'Yii3 React Starter Kit';

// Show flash messages from the server, e.g. $flash->flash('success', '...'), as toasts.
router.on('flash', (event) => {
  const { success, error, message } = event.detail.flash ?? {};
  if (success) toast.success(success);
  if (error) toast.error(error);
  if (message) toast(message);
});

createInertiaApp({
  title: (title) => (title ? `${title} - ${appName}` : appName),
  // Pages load on demand, so each one is a separate chunk.
  resolve: (name) => {
    const pages = import.meta.glob('./pages/**/*.jsx');
    const page = pages[`./pages/${name}.jsx`];
    if (!page) {
      throw new Error(`Inertia page "${name}" not found in assets/react/src/pages.`);
    }
    return page();
  },
  setup({ el, App, props }) {
    createRoot(el).render(
      <>
        <App {...props} />
        <Toaster position="bottom-right" />
      </>,
    );
  },
});
