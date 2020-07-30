export function PostData() {
    let BaseURL = 'https://run.mocky.io/v3/6a87090b-e7d9-4a0b-bb90-508ca08430e3';

    return new Promise((resolve) =>{
        fetch(BaseURL, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch(() => console.log("Can’t access " + BaseURL + " response. Blocked by browser?"))
    });
}