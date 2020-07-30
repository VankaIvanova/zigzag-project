export function PostCarrier() {
    let BaseURL = 'https://run.mocky.io/v3/df7743ec-97da-4694-b099-5c53d6cdbc5f';

    return new Promise((resolve) =>{
        fetch(BaseURL)
            .then(response => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch(() => console.log("Can’t access " + BaseURL + " response. Blocked by browser?"))
        });
}