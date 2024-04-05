import {FetchStatus, IApiResponse, ICardTheme} from "../types/Api.js";
import {CardThemeCard} from "../classes/Card.js";
import {getCurrentCardTheme, setCardTheme} from "../ts-utils/General.js";

const fetchListCardTheme = async (searchString: string | null): Promise<ICardTheme[]> => {
    return await fetch(`/api/card-themes?${searchString ? `_s=${searchString}` : ""}`)
        .then((res: Response) => res.json())
        .then((res: IApiResponse) => {
            if (res.status === FetchStatus.SUCCESS) {
                return res.data
            }
        })
}

const mapListCardTheme = (listCardTheme: ICardTheme[]) => {
    return listCardTheme.map(({
                                  _id,
                                  cardBack,
                                  cardFront
                              }) => new CardThemeCard(_id, cardBack, cardFront, _id === getCurrentCardTheme()).render()).join("");
}

const mapClickAction = (listCard: NodeListOf<HTMLElement>) => {

    const handleSelect = (card: HTMLElement) => {
        card.classList.add("selected");
        setCardTheme(card.getAttribute("data-id")!)
    }

    const handleUnSelect = () => {
        listCard.forEach((card: HTMLElement) => {
            if (card.classList.contains("selected")) {
                card.classList.remove("selected")
                return;
            }
        })
    }

    return listCard.forEach((card) => {
        card.addEventListener("click", () => {
            handleUnSelect();
            handleSelect(card);
        })
    })
}

const handleShowCardTheme = (searchString: string | null = null) => {
    const listCardContainer = document.getElementById("listCardContainer");

    if (listCardContainer) {
        fetchListCardTheme(searchString)
            .then((listCardTheme) => {
                listCardContainer.innerHTML = mapListCardTheme(listCardTheme);
            })
            .then(() => {
                const listCard: NodeListOf<HTMLElement> = document.querySelectorAll(".card-theme");
                mapClickAction(listCard);
            });
    } else {
        console.log("Container not found")
    }

}

export const handleCardThemeTab = async () => {

    handleShowCardTheme()

    const searchBox: HTMLInputElement = document.getElementById("searchBox") as HTMLInputElement;

    if (searchBox) {
        searchBox.addEventListener("input", () => {
            handleShowCardTheme(searchBox.value)
        })
    }

}