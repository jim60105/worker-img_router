declare const process: any;
const NEXTCLOUDUSERNAME = process.env.NEXTCLOUDUSERNAME;
const TARGETHOST = process.env.TARGETHOST;

const picExt = [
  "ico",
  "jpg",
  "png",
  "gif",
  "jpeg",
  "bmp",
  "tiff",
  "svg",
  "mp4",
];

/**
 * 檢查是否是對應的副檔名
 * @param pathname 路徑名稱
 */
export function isImgExtension(pathname: string) {
  let p = pathname.split(".");
  let ext = p[p.length - 1];
  return (picExt.indexOf(ext.toLowerCase()) >= 0);
}

/**
 * 產生Nextcloud網址，並fetch
 */
export function fetchOriginalPath(pathname: string) {
  return fetch(new URL(
    `index.php/apps/sharingpath/${NEXTCLOUDUSERNAME}/Public/${pathname}`,
    `https://${TARGETHOST}`
  ).toString(), {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
