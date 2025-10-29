import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('./home/page'), { ssr: true });

export const metadata = {
  title: 'AI Tools 4 You | Home',
};

export default function Page() {
  return <HomePage />;
}