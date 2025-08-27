import { sharedMetadata } from '@components/lib/metadata';
import { ReactNode } from 'react';

export const metadata = sharedMetadata;

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}