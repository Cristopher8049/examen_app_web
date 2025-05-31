export default class KeyboardInvoker {
    constructor() {
        this.commands = {};
        this.listen();
    }

    registerCommand(shortcut, command) {
        this.commands[shortcut] = command;
    }

    listen() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey) {
                const key = event.key.toUpperCase();
                const shortcut = `Ctrl+${key}`;

                const command = this.commands[shortcut];
                if (command) {
                    event.preventDefault();
                    command.execute();
                }
            }
        });
    }
}