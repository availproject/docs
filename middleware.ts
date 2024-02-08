import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
const { origin } = request.nextUrl
  const redirects = [
    {
      source: '/about/introduction',
      destination: `${origin}/docs/introduction`,
    },
    {
      source: '/category/clash-of-nodes',
      destination: `${origin}/docs/clash-of-nodes`,
    },
    {
        source: '/clash-of-nodes/challenges',
        destination: `${origin}/docs/clash-of-nodes/challenges`
      },
      {
        source: '/clash-of-nodes/rules-and-guidelines',
        destination: `${origin}/docs/clash-of-nodes/rules`
      },
      {
        source: '/clash-of-nodes/terms-and-conditions',
        destination: `${origin}/docs/clash-of-nodes/toc`
      },
      {
        source: '/clash-of-nodes/dymension',
        destination: `${origin}/docs/clash-of-nodes/dymension`
      },
      {
        source: '/clash-of-nodes/faqs',
        destination: `${origin}/docs/clash-of-nodes/faqs`
      },
  ];

  const requestedPath = request.nextUrl.pathname;
  const redirectRule = redirects.find((rule) => rule.source === requestedPath);

  if (redirectRule) {   
    return NextResponse.redirect(redirectRule.destination, { status: 301 });
  }
  return NextResponse.next(); 
}
