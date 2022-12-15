import { fetchOriginalPath } from './NextcloudImgRoute';
import { getUrlExtension, getUrlFileName } from './URLHelper';

/**
 * handle隨機圖片功能
 * @param pathname 路徑
 * @returns Response Promise
 */
export async function handleRandomPicture(pathname: string) {
  const extension = getUrlExtension(pathname);
  const filename = getUrlFileName(pathname);

  const jsonUrl = pathname.replace(extension, 'json');
  console.log(jsonUrl);

  const response = await fetchOriginalPath(jsonUrl, {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
  const list = await response.json();
  console.log(list);

  if (list && list.hasOwnProperty(extension) && list[extension].length > 0) {
    // Get random item from list[extension] array
    pathname = pathname.replace(
      `${filename}.${extension}`,
      list[extension][Math.floor(Math.random() * list[extension].length)],
    );
    console.log(pathname);
    return fetchOriginalPath(pathname);
  } else {
    return new Response('Not found', { status: 404 });
  }
}
