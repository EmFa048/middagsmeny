import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kontakt – Hör av dig till oss på Middagsmeny',
  description: 'Har du frågor, förslag på nya skolor eller vill du dela med dig av ett favoritrecept? Kontakta oss på Middagsmeny.se.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
