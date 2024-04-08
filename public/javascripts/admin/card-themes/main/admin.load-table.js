import { FetchStatus } from "../../types/Api.js";
import { getSearchParams } from "../../ts-utils/General.js";
import { direct } from "../../ts-utils/Direct.js";
const ViewButton = (_id) => {
    return `<button data-id="${_id}" class="view-button text-slate-200 bg-secondary p-2 rounded-lg">
                <i class="fa-solid fa-eye text-white"></i>
            </button>`;
};
const EditButton = (_id) => {
    return `<button data-id="${_id}" class="edit-button text-slate-200 bg-warning p-2 rounded-lg">
                <i class="fa-solid fa-pen text-white"></i>
            </button>`;
};
const RecoverButton = (_id) => {
    return `<button data-id="${_id}" class="recover-button text-slate-200 bg-success p-2 rounded-lg">
                <i class="fa-solid fa-rotate-left text-white"></i>
        </button>`;
};
const DeleteButton = (_id) => {
    return `<button data-id="${_id}" class="delete-button text-slate-200 bg-danger p-2 rounded-lg">
            <i class="fa-solid fa-trash-can text-white"></i>
        </button>`;
};
const Button = {
    "view": (_id) => ViewButton(_id),
    "edit": (_id) => EditButton(_id),
    "recover": (_id) => RecoverButton(_id),
    "delete": (_id) => DeleteButton(_id),
};
const Tag = {
    "vip": `<span class="tag-vip">VIP</span>`,
    "delete": `<span class="tag-deleted">Deleted</span>`
};
const FetchString = {
    "default": "/api/card-themes",
    "alphabets": "/api/card-themes?filter=alphabets"
};
const fetchListTheme = async (filter) => {
    return await fetch(FetchString[filter])
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const fetchThemeById = async (_id) => {
    return await fetch(`/api/card-themes/${_id}`)
        .then((res) => res.json())
        .then((res) => {
        if (res.status === FetchStatus.SUCCESS) {
            return res.data;
        }
    });
};
const generateTableRow = ({ _id, themeName, price, used, createdAt, updatedAt, isVip, isDeleted }) => {
    return `<tr>
                <td>${themeName}</td>
                <td>${price}</td>
                <td>${used}</td>
                <td>${createdAt}</td>
                <td>${updatedAt}</td>
                <td>${isVip ? Tag["vip"] : ""} ${isDeleted ? Tag["delete"] : ""}</td>
                <td>
                    <div class="w-full">
                        ${Button["view"](_id)}
                        ${Button["edit"](_id)}
                        ${isDeleted ? Button["recover"](_id) : ""}
                        ${!isDeleted ? Button["delete"](_id) : ""}
                    </div>
                </td>
            </tr>`;
};
const mapThemeData = (themeData) => {
    return themeData.map((theme) => generateTableRow(theme)).join("");
};
const mapDeleteButton = () => {
    const listButtons = document.querySelectorAll(".delete-button");
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-id");
            fetch(`/api/card-themes/${cardThemeId}/delete`, {
                method: "PUT"
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "redirect") {
                    window.location.href = res.url;
                }
            })
                .catch((err) => {
                console.error(err);
            });
        });
    });
};
const mapRecoverButton = () => {
    const listButtons = document.querySelectorAll(".recover-button");
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const cardThemeId = button.getAttribute("data-id");
            fetch(`/api/card-themes/${cardThemeId}/recover`, {
                method: "PUT"
            })
                .then((res) => res.json())
                .then((res) => {
                if (res.status === "redirect") {
                    window.location.href = res.url;
                }
            })
                .catch((err) => {
                console.error(err);
            });
        });
    });
};
const mapEditButton = () => {
    const listButtons = document.querySelectorAll(".edit-button");
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            direct(`/admin/card-themes/edit?_id=${button.getAttribute("data-id")}`);
        });
    });
};
const setViewData = async (_id) => {
    const { cardFront, cardBack } = await fetchThemeById(_id);
    const frontFace = document.getElementById("frontFaceImage");
    const backFace = document.getElementById("backFaceImage");
    if (frontFace) {
        frontFace.src = `/images/themepacks/${cardFront}`;
    }
    if (backFace) {
        backFace.src = `/images/themepacks/${cardBack}`;
    }
};
const mapViewButton = async () => {
    const listButtons = document.querySelectorAll(".view-button");
    listButtons.forEach((button) => {
        button.addEventListener("click", () => {
            console.log("test");
            setViewData(button.getAttribute("data-id"));
        });
    });
};
export const loadTable = async () => {
    const filter = getSearchParams("filter") ?? "default";
    const listThemeContainer = document.getElementById("listThemeContainer");
    if (listThemeContainer) {
        await fetchListTheme(filter)
            .then((themeData) => {
            listThemeContainer.innerHTML = mapThemeData(themeData);
        })
            .then(() => {
            mapDeleteButton();
            mapEditButton();
            mapRecoverButton();
            mapViewButton();
        });
    }
};
