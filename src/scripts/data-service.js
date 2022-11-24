import { fetchData } from "./api-service.js";

const data = await fetchData();
const container = document.getElementById("timetable");
 
// Get data from Frankfurt
export async function getFromData (){

    var element = document.getElementById("from");
    element.classList.add("selected"); 

    var element = document.getElementById("to");
    element.classList.remove("selected"); 

    var time = data.filter( element => element.from == "Frankfurt (Main) Hbf")
    return getdiffHours(time);
}

// Get data to Frankfurt
export async function getToData(){

    var element = document.getElementById("to");
    element.classList.add("selected"); 

    var element = document.getElementById("from");
    element.classList.remove("selected"); 
    
    var time = data.filter( element => element.to == "Frankfurt (Main) Hbf")
    return getdiffHours(time);
}

// Get data Hours
export async function getdiffHours(time){

    time.forEach(element => {
        element.hours = "";
        var valuestart = element.starttime;
        var valuestop = element.endtime;
          
        //create date format          
        var timeStart = new Date("01/01/2022 " + valuestart).getHours();
        var timeEnd = new Date("01/01/2022 " + valuestop).getHours();
        var minutesstart = new Date("01/01/2022 " + valuestart).getMinutes();
        var minutesend = new Date("01/01/2022 " + valuestop).getMinutes();
        var minutesDiff = minutesend - minutesstart;
        var hourDiff = timeEnd - timeStart;

        if (minutesDiff < 0){
            minutesDiff = minutesDiff + 60;
            hourDiff = hourDiff - 1;
        }
        if (minutesDiff >= 60){
            minutesDiff = minutesDiff - 60;
            hourDiff = hourDiff + 1;
        }

        element.hours = hourDiff + 'h' + ' ' + minutesDiff + 'min'; 
    });  

    return getSort(time);
}
 
// Sort to Hour
export async function getSort(time){

    time.sort(function(a, b) {
        if (a.hours < b.hours){
            return -1;
        }   
        else if (a.hours > b.hours){
            return 1;
        }   
        else{
            return 0;
        }
    });

    return showData(time);
}

// show Data
export async function showData(time){
     
    container.innerHTML = '';
    time.forEach(element => {
        const tmpl = document.getElementById("rides").content.cloneNode(true);
        tmpl.querySelector(".from").innerText = element.from;
        tmpl.querySelector(".to").innerText = element.to;
        tmpl.querySelector(".starttime").innerText = element.starttime;
        tmpl.querySelector(".endtime").innerText = element.endtime;
        tmpl.querySelector(".hours").innerText = element.hours;
        container.appendChild(tmpl);
    });     
}
 

 
 
