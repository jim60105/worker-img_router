import { fetchOriginalPath } from './NextcloudImgRoute';

export async function handleRandomPicture(url: URL) {
    const jsonUrl = url.pathname.replace('png', 'json');
    const jsonHeader = {
        headers: {
            'content-type': 'application/json;charset=UTF-8',
        },
    };

    const response = await fetchOriginalPath(jsonUrl, jsonHeader);
    const list = await response.json();

    if (list && list.hasOwnProperty('png') && list['png'].length > 0) {
        url.pathname = url.pathname.replace('random.png', list['png'][Math.floor(Math.random() * list['png'].length)]);
        return fetchOriginalPath(url.pathname);
    } else {
        return new Response('Not found', { status: 404 });
    }
}