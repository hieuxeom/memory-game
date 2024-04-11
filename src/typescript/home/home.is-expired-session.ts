import { direct } from "../ts-utils/Direct.js";
import { getDocumentCookies, getUserData } from "../ts-utils/General.js";

export const isExpiredSession = () => {
	if (getUserData() && !getDocumentCookies().get("_id")) {
		direct("/auth/signout?backref=home");
	}
};
