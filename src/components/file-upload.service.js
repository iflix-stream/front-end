import * as axios from 'axios';

const BASE_URL = 'http://localhost/';

function upload(formData) {
    const url = `${BASE_URL}iFlix/api/filme`;
    return axios.post(url, formData)
    // get data
        .then(x => {
            console.log(x.data)
        })
}

export { upload }