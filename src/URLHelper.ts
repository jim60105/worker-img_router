/**
 * 附檔名白名單
 */
const allowedExtension = [
    "ico",
    "jpg",
    "png",
    "gif",
    "jpeg",
    "bmp",
    "tiff",
    "svg",
    "mp4"
];

/**
 * 檢查是否是在附檔名白名單內
 * @param pathname 路徑名稱
 * @returns boolean
 */
export function isAllowedExtension(pathname: string) {
    return (allowedExtension.indexOf(getUrlExtension(pathname).toLowerCase()) >= 0);
}

/**
 * 取得路徑的檔案名稱(不含附檔名)
 * @param pathname 路徑
 * @returns 不含附檔名的檔案名稱
 */
export function getUrlFileName(pathname: string) {
    return pathname.replace(`.${getUrlExtension(pathname)}`, "").split("/").pop();
}

/**
 * 取得路徑的附檔名
 * @param pathname 路徑
 * @returns 附檔名
 */
export function getUrlExtension(pathname: any): string {
    pathname = pathname.split('?')[0];
    pathname = pathname.split('/').pop();
    return pathname.includes('.') ? pathname.substring(pathname.lastIndexOf('.') + 1) : "";
}
