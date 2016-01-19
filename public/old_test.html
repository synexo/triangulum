<body>
<script type="text/javascript" src="./three.min.js"></script>
<script id="vertexShader" type="x-shader/x-vertex">
    uniform float scale;

    attribute vec3 color;
    attribute float texIndex;
    attribute float size;
    attribute float alpha;
    attribute float rotation;

    varying vec3 vColor;
    varying float vTexIndex;
    varying float vSize;
    varying float vAlpha;
    varying float vRotation;

    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

        vColor = color;
        vTexIndex = texIndex;
        vSize = size;
        vAlpha = alpha;
        vRotation = rotation;

        gl_PointSize = vSize * ( scale / length( mvPosition.xyz ) );
        gl_Position = projectionMatrix * mvPosition;
    }
</script>
<script id="fragmentShader" type="x-shader/x-fragment">

    uniform sampler2D textures[maxTextures];

    varying vec3 vColor;
    varying float vTexIndex;
    varying float vAlpha;
    varying float vRotation;

    void main() {
        vec4 startColor = vec4(vColor, vAlpha);
        vec4 sprite;

        int textureIndex = int(vTexIndex + 0.5);

        float c = cos(vRotation);
        float s = sin(vRotation);

        for (int x = 0; x < maxTextures; x++) { if (x == textureIndex) {
            vec2 rotatedUV = vec2(c * (gl_PointCoord.x - 0.5) + s * (gl_PointCoord.y - 0.5) + 0.5, 
                                c * (gl_PointCoord.y - 0.5) - s * (gl_PointCoord.x - 0.5) + 0.5);
            sprite = texture2D(textures[x], rotatedUV);
        }};

        gl_FragColor = vec4(startColor * sprite);
    }
</script>
<script>
function World() {
    this.init();
}

World.prototype.init = function () {
    this.setupEnvironment();

    var scope = this;

    this.callResize = function () {
        scope.resize();
    };
    window.addEventListener('resize', this.callResize, false);

    this.callRender = function () {
        scope.render();
        scope.renderID = requestAnimationFrame(scope.callRender);
    };
    this.callRender();
};

World.prototype.setupEnvironment = function () {
    this.renderer = new THREE.WebGLRenderer({
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.id = "canvas";
    this.renderer.context.getProgramInfoLog = function () {
        return ''
    }; // muzzle
    document.body.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 0, 1000);
    this.scene = new THREE.Scene();

    this.container = new THREE.Object3D();
    this.scene.add(this.container);

    var scene = this.scene;

    var particleCount = 1000;

    var uniforms = {
        textures: { type: 'tv', value: this.getTextures() },
        scale: { type: 'f', value: window.innerHeight / 2 } 
    };

    var attributes = {
        texIndex: { type: 'f', value: [] },
        color: { type: 'c', value: [] }, 
        size: { type: 'f', value: [] },
        alpha: { type: 'f', value: [] },
        rotation: { type: 'f', value: [] } 
    };

    var defines = {
        maxTextures: 32 // This is possibly maximum
    };

    var material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        defines: defines,
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent,
        transparent: true,
        lights: false,
        fog: false,
        vertexColors: THREE.NoColors 
    });

    var geometry = new THREE.Geometry();

    for (var i = 0; i < particleCount; i++) {
        geometry.vertices.push(new THREE.Vector3(
        (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500, (Math.random() - 0.5) * 1500));
        attributes.texIndex.value.push(Math.random() * 3 | 0);
        attributes.color.value.push(new THREE.Color(Math.random(),Math.random(),Math.random()));
        attributes.size.value.push(Math.random() * 20);
        attributes.alpha.value.push(Math.random());
        attributes.rotation.value.push(Math.random() * 360 * Math.PI/180); // in radians
    }

    var particles = new THREE.PointCloud(geometry, material);
    particles.sortParticles = true;
    this.container.add(particles);
};

World.prototype.render = function () {
    this.container.rotation.x += 0.001;
    this.container.rotation.y += 0.002;
    this.container.rotation.z += 0.003;
    this.renderer.render(this.scene, this.camera);
};

World.prototype.resize = function () {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
};

World.prototype.getTextures = function () {
    return [
    THREE.ImageUtils.loadTexture('./ball.png'),
    THREE.ImageUtils.loadTexture('./cone.png'),
    THREE.ImageUtils.loadTexture('./cube.png') ]
};
var world = new World();
</script>
</body>
