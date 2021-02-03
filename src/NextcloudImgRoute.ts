declare const process: any;
const NEXTCLOUDUSERNAME: string = process.env.NEXTCLOUDUSERNAME;
const TARGETHOST: string = process.env.TARGETHOST;

/**
 * 傳回Nextcloud網址之Response Promise
 * @returns Response Promise
 */
export function fetchOriginalPath(pathname: string, header = {}) {
  let href = new URL(
    `index.php/apps/sharingpath/${NEXTCLOUDUSERNAME}/Public${pathname}`,
    `https://${TARGETHOST}`
  ).toString();

  console.log(href);
  return fetch(href, header);
}
