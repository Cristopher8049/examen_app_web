export default class LocalStorage {
    static KEY = "favoriteItems";

    static loadFavorites() {
        const raw = localStorage.getItem(LocalStorage.KEY);
        if (!raw) return [];
        try {
            return JSON.parse(raw);
        } catch (err) {
            console.warn("LocalStorage: datos corruptos → reseteando clave.", err);
            localStorage.removeItem(LocalStorage.KEY);
            return [];
        }
    }

    static saveFavorites(list) {
        try {
            localStorage.setItem(LocalStorage.KEY, JSON.stringify(list));
        } catch (err) {
            console.error("LocalStorage: fallo al guardar en localStorage:", err);
        }
    }
}