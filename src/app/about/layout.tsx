import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-900 font-[family-name:var(--font-geist-sans)]">
      {children}
    </div>
  );
}
