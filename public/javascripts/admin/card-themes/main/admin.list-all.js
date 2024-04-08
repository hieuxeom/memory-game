import { getSearchParams } from "../../ts-utils/General.js";
import { FetchStatus } from "../../types/Api.js";
const FetchString = {
    "default": "/api/card-themes",
    "alphabets": "/api/card-themes?filter=alphabets"
};
const mapString = ({ _id, themeName, isVip, isDeleted }) => {
    return `<div class="text-xl flex justify-between items-center">
                <div class="w-3/4 flex items-center gap-2">
                    <p class="text-secondary">${themeName}</p>
                    ${isVip ? ("<span class='tag-vip'>VIP</span>") : ""}
                    ${isDeleted ? ("<span class='tag-deleted'>Removed</span>") : ""}
                </div>
                <div class="w-1/4 flex justify-center items-center gap-4">
                    ${isDeleted ?
        `<button data-button="${_id}"
            class="recover-button flex justify-center items-center text-sm text-white rounded-xl bg-success w-8 h-8"
        >
            <i class="fa-solid fa-rotate-left"></i>
        </button>` :
        `<a href="/admin/card-themes/edit/${_id}"
            class="block flex justify-center items-center text-sm text-white rounded-xl bg-warning w-8 h-8"
        >
            <i class="fa-solid fa-pen"></i>
        </a>`}
                   ${isDeleted ?
        `<button data-button="${_id}"
            class="forcedel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
        >
            <i class="fa-solid fa-trash"></i>
        </button>` :
        `<button data-button="${_id}"
            class="softdel-button flex justify-center items-center text-sm text-white rounded-xl bg-danger w-8 h-8"
        >
            <i class="fa-solid fa-trash"></i>
        </button>`}              
                </div>
        </div>`;
};
const handleListView = (listData) => {
    return listData.map((data) => mapString(data)).join("");
};
const handleGroupView = (listData) => {
    return listData.map((data) => mapString(data)).join("");
};
const GenerateInnerString = {
    "default": handleListView,
    "alphabets": handleGroupView,
};
const fetchListTheme = async (filter) => {
    console.log(FetchString[filter]);
    return await fetch(FetchString[filter])
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
export const loadListCardThemes = async () => {
    const filter = getSearchParams("filter") ?? "default";
    const listThemesContainer = document.getElementById("listThemesContainer");
    if (listThemesContainer) {
        listThemesContainer.innerHTML = GenerateInnerString[filter](await fetchListTheme(filter));
    }
};
