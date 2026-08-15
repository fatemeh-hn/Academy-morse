import "../input.css";
import { aboutApi } from "../api/about";

const aboutError = document.getElementById("aboutError");

const applicationName = document.getElementById("applicationName");
const version = document.getElementById("version");
const author = document.getElementById("author");
const currentTime = document.getElementById("currentTime");

const loadAbout = async () => {
    try{
        const res = await aboutApi();

        applicationName.textContent = res.data.applicationName;
        version.textContent = res.data.version;
        author.textContent = res.data.author;
        currentTime.textContent = res.data.currentTime;




    }catch{
        aboutError.textContent = "Unable to connect to the server.";


    }

}
await loadAbout()

