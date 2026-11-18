class Game {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.world = null;
        this.player = null;
        this.ui = null;
        this.isRunning = false;
    }

    init() {
        this.setupThreeJS();
        this.createWorld();
        this.createPlayer();
        this.setupUI();
        this.setupEventListeners();
        this.isRunning = true;
        this.animate();
    }

    setupThreeJS() {
        const container = document.getElementById('game-container');
        const width = window.innerWidth;
        const height = window.innerHeight;

        // Camera setup
        this.camera = new THREE.PerspectiveCamera(
            75,
            width / height,
            0.1,
            10000
        );
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);

        // Scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 500, 1000);

        // Renderer setup
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        container.appendChild(this.renderer.domElement);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(100, 100, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        window.addEventListener('resize', () => this.onWindowResize());
    }

    createWorld() {
        this.world = new World(this.scene);
    }

    createPlayer() {
        this.player = new Player(this.scene, this.camera);
    }

    setupUI() {
        this.ui = new UI();
        this.updateStatus('Game initialized - Use WASD to move, mouse to look around');
    }

    setupEventListeners() {
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('click', () => this.onCanvasClick());
    }

    onKeyDown(event) {
        if (this.player) {
            this.player.onKeyDown(event);
        }
    }

    onKeyUp(event) {
        if (this.player) {
            this.player.onKeyUp(event);
        }
    }

    onMouseMove(event) {
        if (this.player && document.pointerLockElement === this.renderer.domElement) {
            this.player.onMouseMove(event);
        }
    }

    onCanvasClick() {
        if (!document.pointerLockElement) {
            this.renderer.domElement.requestPointerLock();
        }
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        if (!this.isRunning) return;

        requestAnimationFrame(() => this.animate());

        const delta = 0.016; // ~60 FPS

        if (this.player) {
            this.player.update(delta);
        }

        if (this.world) {
            this.world.update(delta);
        }

        this.renderer.render(this.scene, this.camera);
    }

    updateStatus(message) {
        if (this.ui) {
            this.ui.updateStatus(message);
        }
    }
}
