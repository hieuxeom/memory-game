import {deleteCookie} from "../ts-utils/General.js";

localStorage.removeItem("userData");
deleteCookie("_id");
window.location.href = "/auth";