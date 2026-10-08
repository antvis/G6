import { defineMiddleware } from 'astro:middleware';

// Preserve the existing search-engine ownership tag on all rendered pages.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  const html = (await response.text()).replace(
    '</head>',
    '<meta name="google-site-verification" content="D2DFQzn8bn6vTvIqonu0FSFoF-y5ZihUR9WYteGI684"></head>',
  );
  const headers = new Headers(response.headers);
  headers.delete('content-length');
  return new Response(html, { status: response.status, statusText: response.statusText, headers });
});
