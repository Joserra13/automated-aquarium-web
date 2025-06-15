import { Metadata } from 'next';
import '@/app/contact/style.css';

export const metadata: Metadata = {
  title: 'Contact',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-gray-900 font-[family-name:var(--font-geist-sans)]">{children}</div>
}