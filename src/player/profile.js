// Player Profile Management
// This module will handle player profiles, posts, and social information

class PlayerProfile {
    constructor(playerId, username) {
        this.playerId = playerId;
        this.username = username;
        this.bio = '';
        this.posts = [];
        this.friends = [];
        this.position = new THREE.Vector3();
        this.createdAt = new Date();
    }

    addPost(content) {
        const post = {
            id: Date.now(),
            content: content,
            timestamp: new Date(),
            likes: 0
        };
        this.posts.push(post);
        return post;
    }

    addFriend(friendId) {
        if (!this.friends.includes(friendId)) {
            this.friends.push(friendId);
            return true;
        }
        return false;
    }

    getPost(postId) {
        return this.posts.find(p => p.id === postId);
    }

    getAllPosts() {
        return this.posts.sort((a, b) => b.timestamp - a.timestamp);
    }
}
