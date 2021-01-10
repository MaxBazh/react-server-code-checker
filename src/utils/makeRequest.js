let mainServerUrl = '/php/';
// Для prod
mainServerUrl = 'http://wp-book.ru/404checker/php/';

export default async function makeRequest(url, options = {}, baseUrl = mainServerUrl){
    const res = await fetch(baseUrl + url, options);
    
    if(!res.ok){
        throw new Error(`Возникла проблема с вашим fetch запросом: ${res.url}. Статус ${res.status}` );
    }

    const body = await res.json();
    return body;
}