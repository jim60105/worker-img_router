import { fetchOriginalPath } from './NextcloudImgRoute';
import { isAllowedExtension, getUrlExtension } from './URLHelper';
import { handleRandomPicture } from './RandomPicture';

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
  if (url.hostname == SOURCEHOST && isAllowedExtension(url.pathname)) {
    //Handle on random picture
    let filename = url.pathname.replace(getUrlExtension(url.pathname), "").split("/").pop();
    if (filename == 'random') {
      return await handleRandomPicture(url.pathname);
    }

    return fetchOriginalPath(url.pathname);
  }

  return new Response('Not found', { status: 404 });
}