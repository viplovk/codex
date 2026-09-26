import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Viplov — CSE Student & Developer',
  description: 'The portfolio of Viplov, a Computer Science Engineering student building thoughtful digital experiences.',
  keywords: ['Viplov', 'Viplov Kashyap', 'developer portfolio', 'CSE student', 'Delhi', 'ASMITA', 'ResQFlow'],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
