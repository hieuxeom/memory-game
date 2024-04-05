import {IApiResponse} from "../../types/Api.js";
import {setCookie, setUserData} from "../../ts-utils/General.js";
import {direct} from "../../ts-utils/Direct.js";

const uEmailLogin = document.getElementById("uEmail") as HTMLInputElement;
const uPasswordLogin = document.getElementById("uPassword") as HTMLInputElement;
const submitLogin = document.getElementById("submitLogin") as HTMLButtonElement;

submitLogin.addEventListener("click", () => {
    let postData = {
        uEmail: uEmailLogin.value,
        uPassword: uPasswordLogin.value,
    }

    fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData)
    })
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === "success") {
                let {userData} = res.data;

                setUserData(userData);

                setCookie("_id", userData._id)

                direct("/profile");
            } else {
                console.log(res?.message)
            }
        })
})