import { isImgExtension, fetchOriginalPath } from './NextcloudImgRoute';

declare const process: any;
const SOURCEHOST = process.env.SOURCEHOST;

// Entrypoint
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  let url = new URL(request.url);

  // Bypass SSL Challenge and other .well-known
  if (url.pathname.indexOf("well-known") >= 0) {
    return fetch(request);
  }

  // Remove Facebook fbclid
  if (null != url.searchParams.get("fbclid")) {
    url.searchParams.delete("fbclid");
  }

  // Route img to nextcloud
  if (url.hostname == SOURCEHOST && isImgExtension(url.pathname)) {
    return fetchOriginalPath();
  }

  return new Response('Not found', { status: 404 });
}