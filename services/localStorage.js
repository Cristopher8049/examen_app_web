export default class LocalStorage {
    static KEY = "favoriteItems";

    static loadFavorites() {
        const raw = localStorage.getItem(LocalStorage.KEY);
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (err) {
            localStorage.removeItem(LocalStorage.KEY);
            return [];
        }
    }

    static saveFavorites(list) {
        localStorage.setItem(LocalStorage.KEY, JSON.stringify(list));
    }
}