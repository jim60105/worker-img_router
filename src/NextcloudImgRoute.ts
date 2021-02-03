declare const process: any;
const NEXTCLOUDUSERNAME = process.env.NEXTCLOUDUSERNAME;
const TARGETHOST = process.env.TARGETHOST;

/**
 * 傳回Nextcloud網址之fetch物件
 */
export function fetchOriginalPath(pathname: string, header?: object) {
  return fetch(new URL(
    `index.php/apps/sharingpath/${NEXTCLOUDUSERNAME}/Public/${pathname}`,
    `https://${TARGETHOST}`
  ).toString(), header);
}
