import { fetchOriginalPath } from './NextcloudImgRoute';
import { getUrlExtension } from './URLHelper';

export async function handleRandomPicture(pathname: string) {
    const extension = getUrlExtension(pathname);

    const jsonUrl = pathname.replace(extension, 'json');
    const response = await fetchOriginalPath(jsonUrl, {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    });
    const list = await response.json();

    if (list && list.hasOwnProperty(extension) && list[extension].length > 0) {
        // Get random item from list[extension] array
        pathname = pathname.replace(`random.${extension}`, list[extension][Math.floor(Math.random() * list[extension].length)]);
        return fetchOriginalPath(pathname);
    } else {
        return new Response('Not found', { status: 404 });
    }
}