import makeRequest from '../utils/makeRequest';

export default class{

    async getChekedUrls(urlsList) {
        const res = await makeRequest(
            'api.php', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(urlsList),
                mode: 'cors',
            }
        );

        if( res.errors === true ){
            return null;
        }

        return res.data;
    }

}