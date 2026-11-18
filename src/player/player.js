class Player {
    constructor(scene, camera) {
        this.scene = scene;
        this.camera = camera;
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.speed = 20;
        this.jumpPower = 15;
        this.gravity = 30;
        this.isJumping = false;
        this.yaw = 0;
        this.pitch = 0;
        this.mouseSensitivity = 0.002;
        this.keys = {};
        this.position = new THREE.Vector3(0, 2, 0);
        this.camera.position.copy(this.position);
        this.init();
    }

    init() {
        // Create a player object for reference (invisible controller)
        const geometry = new THREE.CapsuleGeometry(0.5, 2, 4, 8);
        const material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        this.playerMesh = new THREE.Mesh(geometry, material);
        this.playerMesh.position.copy(this.position);
        this.playerMesh.visible = false; // Player is invisible first-person
        this.scene.add(this.playerMesh);
    }

    onKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;
        if (event.key === ' ') {
            this.jump();
        }
    }

    onKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }

    onMouseMove(event) {
        this.yaw -= event.movementX * this.mouseSensitivity;
        this.pitch -= event.movementY * this.mouseSensitivity;
        this.pitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitch));
        this.updateCamera();
    }

    updateCamera() {
        this.camera.position.copy(this.position);
        this.camera.rotation.order = 'YXZ';
        this.camera.rotation.y = this.yaw;
        this.camera.rotation.x = this.pitch;
    }

    jump() {
        if (!this.isJumping) {
            this.velocity.y = this.jumpPower;
            this.isJumping = true;
        }
    }

    update(delta) {
        this.handleInput(delta);
        this.updatePhysics(delta);
        this.updateCamera();
        this.playerMesh.position.copy(this.position);
    }

    handleInput(delta) {
        const moveDirection = new THREE.Vector3();
        const forward = new THREE.Vector3();
        const right = new THREE.Vector3();

        this.camera.getWorldDirection(forward);
        forward.y = 0;
        forward.normalize();

        right.crossVectors(this.camera.up, forward);
        right.normalize();

        if (this.keys['w']) {
            moveDirection.add(forward.multiplyScalar(this.speed * delta));
        }
        if (this.keys['s']) {
            moveDirection.add(forward.multiplyScalar(-this.speed * delta));
        }
        if (this.keys['a']) {
            moveDirection.add(right.multiplyScalar(-this.speed * delta));
        }
        if (this.keys['d']) {
            moveDirection.add(right.multiplyScalar(this.speed * delta));
        }

        this.position.add(moveDirection);
    }

    updatePhysics(delta) {
        // Apply gravity
        if (this.position.y > 0) {
            this.velocity.y -= this.gravity * delta;
        } else {
            this.position.y = 0;
            this.velocity.y = 0;
            this.isJumping = false;
        }

        // Apply velocity
        this.position.y += this.velocity.y * delta;

        // Keep player within reasonable bounds
        const boundsSize = 250;
        this.position.x = Math.max(-boundsSize, Math.min(boundsSize, this.position.x));
        this.position.z = Math.max(-boundsSize, Math.min(boundsSize, this.position.z));
    }

    getPosition() {
        return this.position.clone();
    }

    getDirection() {
        this.camera.getWorldDirection(this.direction);
        return this.direction;
    }
}
