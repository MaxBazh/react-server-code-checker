export default function addProtocol(url, isHttps = false) {    
    let protocol = "http://";
    if( isHttps ){
        protocol = "https://"
    }

    const pattern = /^((http|https|ftp|file):\/\/)/;
    if (!pattern.test(url)) {
       url = protocol + url;
    }
    return url;
 }