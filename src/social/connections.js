// Connection and Friend Management
// This module will handle friend requests and connections between players

class ConnectionRequest {
    constructor(fromId, toId, reason = '') {
        this.id = Date.now();
        this.fromId = fromId;
        this.toId = toId;
        this.reason = reason;
        this.status = 'pending'; // pending, accepted, rejected
        this.createdAt = new Date();
        this.respondedAt = null;
    }

    accept() {
        this.status = 'accepted';
        this.respondedAt = new Date();
    }

    reject() {
        this.status = 'rejected';
        this.respondedAt = new Date();
    }
}

class ConnectionManager {
    constructor() {
        this.requests = [];
        this.connections = new Map(); // userId -> Set of connected userIds
    }

    sendRequest(fromId, toId, reason = '') {
        // Check if request already exists
        const existing = this.requests.find(r =>
            r.fromId === fromId && r.toId === toId && r.status === 'pending'
        );

        if (existing) {
            return existing;
        }

        const request = new ConnectionRequest(fromId, toId, reason);
        this.requests.push(request);
        return request;
    }

    getPendingRequests(userId) {
        return this.requests.filter(r =>
            r.toId === userId && r.status === 'pending'
        );
    }

    getSentRequests(userId) {
        return this.requests.filter(r =>
            r.fromId === userId && r.status === 'pending'
        );
    }

    acceptRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.accept();
            this.addConnection(request.fromId, request.toId);
            return true;
        }
        return false;
    }

    rejectRequest(requestId) {
        const request = this.requests.find(r => r.id === requestId);
        if (request) {
            request.reject();
            return true;
        }
        return false;
    }

    addConnection(userId1, userId2) {
        if (!this.connections.has(userId1)) {
            this.connections.set(userId1, new Set());
        }
        if (!this.connections.has(userId2)) {
            this.connections.set(userId2, new Set());
        }
        this.connections.get(userId1).add(userId2);
        this.connections.get(userId2).add(userId1);
    }

    isConnected(userId1, userId2) {
        return this.connections.has(userId1) &&
               this.connections.get(userId1).has(userId2);
    }

    getConnections(userId) {
        return Array.from(this.connections.get(userId) || []);
    }

    removeConnection(userId1, userId2) {
        if (this.connections.has(userId1)) {
            this.connections.get(userId1).delete(userId2);
        }
        if (this.connections.has(userId2)) {
            this.connections.get(userId2).delete(userId1);
        }
    }
}
