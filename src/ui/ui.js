class UI {
    constructor() {
        this.statusElement = document.getElementById('status');
        this.messages = [];
        this.maxMessages = 3;
    }

    updateStatus(message) {
        const timestamp = new Date().toLocaleTimeString();
        this.messages.unshift(`[${timestamp}] ${message}`);

        // Keep only the last N messages
        if (this.messages.length > this.maxMessages) {
            this.messages.pop();
        }

        this.render();
    }

    render() {
        if (this.statusElement) {
            this.statusElement.innerHTML = this.messages.join('<br>');
        }
    }

    addNotification(type, message) {
        const notification = `${type.toUpperCase()}: ${message}`;
        this.updateStatus(notification);
    }

    showDiscovery(objectName) {
        this.addNotification('discovery', `You found: ${objectName}`);
    }

    showPlayerNearby(playerName) {
        this.addNotification('player', `${playerName} is nearby!`);
    }

    showMessage(sender, message) {
        this.addNotification('message', `${sender}: ${message}`);
    }
}
