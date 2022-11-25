// Get Data from JSON
export async function fetchData(){
    return fetch("data.json")
    .then((response) => {
        return response.json();
    }) 
}