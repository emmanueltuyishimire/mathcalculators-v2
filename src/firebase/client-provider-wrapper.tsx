
'use client';

import dynamic from 'next/dynamic';

const FirebaseClientProvider = dynamic(
  () => import('@/firebase/client-provider').then((mod) => mod.FirebaseClientProvider),
  { ssr: false }
);

export function FirebaseClientProviderWrapper({ children }: { children: React.ReactNode }) {
  return <FirebaseClientProvider>{children}</FirebaseClientProvider>;
}
