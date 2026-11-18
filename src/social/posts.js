// Post and Discovery System
// This module will handle creating, storing, and discovering posts

class Post {
    constructor(authorId, content, location) {
        this.id = Date.now();
        this.authorId = authorId;
        this.content = content;
        this.location = location;
        this.timestamp = new Date();
        this.likes = 0;
        this.comments = [];
        this.tags = [];
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    addComment(authorId, text) {
        const comment = {
            id: Date.now(),
            authorId: authorId,
            text: text,
            timestamp: new Date()
        };
        this.comments.push(comment);
        return comment;
    }

    like() {
        this.likes++;
        return this.likes;
    }

    unlike() {
        if (this.likes > 0) {
            this.likes--;
        }
        return this.likes;
    }
}

class PostManager {
    constructor() {
        this.posts = [];
        this.postIndex = new Map(); // For quick lookup by location
    }

    createPost(authorId, content, location) {
        const post = new Post(authorId, content, location);
        this.posts.push(post);
        return post;
    }

    getPostsNearby(location, radius = 50) {
        return this.posts.filter(post => {
            const distance = location.distanceTo(post.location);
            return distance < radius;
        });
    }

    getPostsByAuthor(authorId) {
        return this.posts.filter(post => post.authorId === authorId);
    }

    getPostsByTag(tag) {
        return this.posts.filter(post => post.tags.includes(tag));
    }

    getPost(postId) {
        return this.posts.find(post => post.id === postId);
    }

    deletePost(postId) {
        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
            this.posts.splice(index, 1);
            return true;
        }
        return false;
    }
}
