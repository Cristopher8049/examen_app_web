export const observerMixin = {
    init() {
        this._observers = new Set();
    },

    subscribe(fn) {
        if (typeof fn !== "function") {
            console.warn(
                "observerMixin.subscribe: se intentó suscribir algo que no es función. Se ignora:",
                fn
            );
            return;
        }
        this._observers.add(fn);
    },

    unsubscribe(fn) {
        this._observers.delete(fn);
    },

    notify(data) {
        this._observers.forEach((fn) => {
            if (typeof fn !== "function") {
                console.warn(
                    "observerMixin.notify: elemento en _observers no es función. Se ignora:",
                    fn
                );
                return;
            }
            try {
                fn(data);
            } catch (err) {
                console.error("observerMixin.notify: error al ejecutar un suscriptor:", err);
            }
        });
    },
};