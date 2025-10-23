import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('./home/page'), { ssr: true });

export default function Page() {
  return <HomePage />;
}
