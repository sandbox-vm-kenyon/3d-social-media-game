class World {
    constructor(scene) {
        this.scene = scene;
        this.objects = [];
        this.init();
    }

    init() {
        this.createGround();
        this.createSkybox();
        this.createInitialObjects();
    }

    createGround() {
        const groundGeometry = new THREE.PlaneGeometry(500, 500);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90ee90 });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    createSkybox() {
        // Simple sky using a large sphere
        const skyGeometry = new THREE.SphereGeometry(2000, 32, 32);
        const skyMaterial = new THREE.MeshBasicMaterial({
            color: 0x87ceeb,
            side: THREE.BackSide
        });
        const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
        this.scene.add(skyMesh);
    }

    createInitialObjects() {
        // Create some basic objects to explore
        this.createCube(10, 1, 20);
        this.createCube(-15, 1, 15);
        this.createSphere(0, 2, -20);
        this.createSphere(25, 1, 10);
    }

    createCube(x, y, z) {
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        cube.castShadow = true;
        cube.receiveShadow = true;
        this.scene.add(cube);
        this.objects.push(cube);
    }

    createSphere(x, y, z) {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({ color: Math.random() * 0xffffff });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(x, y, z);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        this.scene.add(sphere);
        this.objects.push(sphere);
    }

    update(delta) {
        // Rotate objects for visual interest
        this.objects.forEach(obj => {
            obj.rotation.x += 0.001;
            obj.rotation.y += 0.002;
        });
    }

    addObject(geometry, material, position) {
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(position);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
        this.objects.push(mesh);
        return mesh;
    }

    getNearbyObjects(position, radius) {
        return this.objects.filter(obj => {
            const distance = position.distanceTo(obj.position);
            return distance < radius;
        });
    }
}
