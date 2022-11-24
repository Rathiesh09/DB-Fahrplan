// Get Data from JSON
export function fetchData(){
    return fetch("data.json")
    .then((response) => {
        return response.json();
    }) 
}