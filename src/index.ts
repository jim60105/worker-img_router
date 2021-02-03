import { fetchOriginalPath } from './NextcloudImgRoute';
import { isAllowedExtension, getUrlFileName, getUrlExtension } from './URLHelper';
import { handleRandomPicture } from './RandomPicture';

declare const process: any;
const SOURCEHOST: string = process.env.SOURCEHOST;

// Entrypoint
addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);

  // Bypass SSL Challenge and other .well-known
  if (url.pathname.indexOf("well-known") >= 0) {
    return fetch(request);
  }

  // Debug logging
  console.log(`Pathname: ${url.pathname}`);
  console.log(`Filename: ${getUrlFileName(url.pathname)}`);
  console.log(`Extension: ${getUrlExtension(url.pathname)}`);
  console.log(`Is allowed extension: ${isAllowedExtension(url.pathname)}`);

  // Bypass if not match SourceHost
  if (SOURCEHOST != url.hostname)
    return fetch(request);

  // Block all except allowed extension
  if (!isAllowedExtension(url.pathname))
    return new Response('Forbidden', { status: 403 });

  //Handle on random picture
  if (getUrlFileName(url.pathname) == 'random')
    return await handleRandomPicture(url.pathname);

  // Route img to nextcloud
  return fetchOriginalPath(url.pathname);
}