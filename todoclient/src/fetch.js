function checkStatus(response) {
    if (response.status >= 200 && response.status < 300 ) {
        return response;
    } else {
        var error = new Error(response.error)
        error.response = response
        throw error
    }
}

function parseJson(response) {
    if (response.status == 204) {
        return response
    } 
    return response.json()    
}

export const doGet = (url) => {
    return fetch(url,{
        method:'GET',
        credentials:'same-origin',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(checkStatus)
    .then(parseJson)
}


export const doPost = (url,headers,body) => {
    return fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            ...headers,            
        },
        body: JSON.stringify(body)
    })
    .then(checkStatus)
    .then(parseJson)

}