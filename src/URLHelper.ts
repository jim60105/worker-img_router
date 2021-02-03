const picExt = [
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
 * 檢查是否是對應的副檔名
 * @param pathname 路徑名稱
 */
export function isAllowedExtension(pathname: string) {
    return (picExt.indexOf(getUrlExtension(pathname).toLowerCase()) >= 0);
}

export function getUrlFileName(pathname: string) {
    return pathname.replace(`.${getUrlExtension(pathname)}`, "").split("/").pop();
}

export function getUrlExtension(pathname: any): string {
    pathname = pathname.split('?')[0];
    pathname = pathname.split('/').pop();
    return pathname.includes('.') ? pathname.substring(pathname.lastIndexOf('.') + 1) : "";
}
