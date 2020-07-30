export function PostDates() {
    let apiKey = '428FCF28-9C5E-E882-FFC8-F579843307C4';

    return new Promise((resolve) =>{
        fetch("https://api.workingdays.org/1.2/api.php?key=" + apiKey + "&country_code=US&configuration=Federal%20holidays&command=list_non_working_days&start_date=2013-01-01&end_date=2013-12-31&nocache=1596109470570")
        .then((response) => response.json())
        .then((res) => {
            resolve(res);
        })
        .catch(() => console.log("Can’t access response. Blocked by browser?"))
    });
}