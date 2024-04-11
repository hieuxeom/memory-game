import { direct } from "../ts-utils/Direct.js";
import { deleteCookie, getSearchParams } from "../ts-utils/General.js";
localStorage.removeItem("userData");
deleteCookie("_id");
const backRef = getSearchParams("backref");
console.log("🚀 ~ handleSignOut ~ backRef:", backRef);
if (backRef === "auth") {
    direct("/auth");
}
else if (backRef === "home") {
    direct("/");
}
