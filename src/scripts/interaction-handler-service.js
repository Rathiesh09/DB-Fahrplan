import { getFromData } from "./data-service.js";
import { getToData } from "./data-service.js";

// Click Button
document.getElementById("from").onclick = function() {getFromData()};
document.getElementById("to").onclick = function() {getToData()};

