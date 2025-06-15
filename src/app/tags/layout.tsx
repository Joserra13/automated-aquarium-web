import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tags',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="bg-gray-900 font-[family-name:var(--font-geist-sans)]">{children}</div>
}