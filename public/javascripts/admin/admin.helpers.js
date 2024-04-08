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
export const Button = {
    view: (_id) => ViewButton(_id),
    edit: (_id) => EditButton(_id),
    recover: (_id) => RecoverButton(_id),
    delete: (_id) => DeleteButton(_id),
};
export const Tag = {
    vip: `<span class="tag-vip">VIP</span>`,
    delete: `<span class="tag-deleted">Deleted</span>`,
};
export const defaultSelectTab = (listTab) => {
    const currentTab = window.location.pathname;
    console.log(currentTab.split("/"));
    if (!currentTab.split("/")[3]) {
        return listTab[1].classList.add("active");
    }
    listTab.forEach((tab) => {
        if (currentTab.split("/")[3] && currentTab.split("/")[3] === tab.getAttribute("data-tab")) {
            tab.classList.add("active");
            tab.classList.remove("inactive");
        }
        else {
            tab.classList.add("inactive");
            tab.classList.remove("active");
        }
    });
};
