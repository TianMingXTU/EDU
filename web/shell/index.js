// index.js
import { initialize, sendMessage } from "./utils.js";
import { initializeFileUpload } from "./fileUpload.js";

initialize();
document.getElementById("sendButton").addEventListener("click", sendMessage);
initializeFileUpload();
