import { Metadata } from 'next'

export const sharedMetadata: Metadata = {
    title: "Avail docs",
    description: "Avail developer docs built using Nextra V4",
    keywords: [
      "Avail Project",
      "Avail docs",
      "Data Availability",
      "Nexus",
      "Fusion",
      "Avail API reference",
    ],
  
    // Adding link preview for sharing
    openGraph: {
      title: "Avail docs",
      description: "Start building on Avail!",
      images: [
        {
          url: '/img/docs-link-preview.png',
          width: 1200,
          height: 630,
          alt: 'Avail Documentation',
        }
      ],
      type: 'website',
    },
  
    twitter: {
      card: 'summary_large_image',
      title: "Avail docs",
      description: "Start building on Avail!",
      images: ['/img/docs-link-preview.png'],
      creator: '@AvailProject',
    },
  }