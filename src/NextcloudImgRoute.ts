declare const NEXTCLOUDUSERNAME: string, TARGETHOST: string;

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
export function fetchOriginalPath() {
  return fetch(new URL(
    `index.php/apps/sharingpath/${NEXTCLOUDUSERNAME}/Public/{url.pathname}`,
    `https://${TARGETHOST}`
  ).toString(), {
    headers: {
      'Cache-Control': 'public, max-age=31536000'
    }
  });
}
