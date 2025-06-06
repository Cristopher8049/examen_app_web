import "./blocks/item-card/item-card.js";
import "./blocks/item-list/item-list.js";
import "./blocks/favorite-item/favorite-item.js";
import "./blocks/favorite-list/favorite-list.js";
import "./blocks/save-button/save-button.js";
import "./blocks/searchBar/searchbar.js";

import KeyboardInvoker from "./services/keyboardInvoker.js";
import FocusSearchCommand from "./services/focusSearchBar.js";
import LocalStorage from "./services/localStorage.js";
import ItemStore from "./services/itemStore.js";

window.addEventListener("DOMContentLoaded", async () => {

    // const invoker = new KeyboardInvoker();
    const searchBarPage = document.querySelector("search-bar-page");
    // if (searchBarPage) {
    //     invoker.registerCommand("Ctrl+K", new FocusSearchCommand(searchBarPage));
    // }


    const itemStore = ItemStore.getInstance();
    itemStore.subscribe(LocalStorage.saveFavorites);

    await LocalStorage.loadFavorites();
});