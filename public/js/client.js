var camera, scene, renderer;
var geometry, material, mesh;

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var projector = new THREE.Projector();

function onDocumentMouseMove( event ) 
{
    
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    
    raycaster.setFromCamera( mouse, camera );
    raycaster.params.PointCloud.threshold = 5;
    var intersects = raycaster.intersectObjects( scene.children );
    
    if ( intersects.length > 0 )
    {
        console.log("Hit @ " + JSON.stringify(intersects[0].index)  );
        var index = intersects[0].index;
        var particle = pointCloudGeometry.vertices[index];
        console.log(particle);
        particle.x += -1 + Math.random()*2;
    }

}

function viewer() {
    this.sectors = [];
    this.sectors.push({"x": 0, "y": 0});
};

view = new viewer();

var socket = io();

socket.on('connect', function (msg) {
    console.log('connected');
});

socket.on('disconnect', function (msg) {
    console.log('disconnected');
});

socket.on('message', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('sector', function (msg) {
    console.log(JSON.stringify(msg));
});

socket.on('id', function (msg) {
    view.id = msg;
});

var pointCloudGeometry = new THREE.Geometry();  
var pointCloud;

function init() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.alpha = true;
    document.body.appendChild( renderer.domElement );

    for (var i=0; i < 30; i++) {  
      particle = new THREE.Vector3(50-100*Math.random(), 50-100*Math.random(), 50-100*Math.random());
      pointCloudGeometry.vertices.push(particle);
    }

    var colors = [];
    for (var i=0; i < 30; i++) {
        colors[i] = new THREE.Color();
        colors[i].setHSL (Math.random(), 1.0, 0.5 );
    }

    pointCloudGeometry.colors = colors;

    var pointCloudMaterial = new THREE.PointCloudMaterial({  
      color: 0xff00ff,
      size: 15,
      transparent: true,
      vertexColors: THREE.VertexColors,
      blending: THREE.AdditiveBlending,
      map: THREE.ImageUtils.loadTexture( "images/particle1.png" )
    });


    pointCloud = new THREE.PointCloud(  
     pointCloudGeometry,
        pointCloudMaterial
    );
    pointCloud.sortParticles = true;


    scene.add(pointCloud);  
    camera.position.z = 55;

};

function animate() {
    socket.emit('view', view);
/*
    for (p=0; p<30; p++) {
        var particle = pointCloud.geometry.vertices[p];
        particle.x += 1 - Math.random() * 2;
        var color = new THREE.Color();
        color.setHSL ( Math.random(), 1.0, 0.5 );
        var particleColor = pointCloud.geometry.colors[p];
        particleColor['r'] = color['r'];
        particleColor['g'] = color['g'];
        particleColor['b'] = color['b'];

    };
*/
    pointCloud.geometry.verticesNeedUpdate = true;
    pointCloud.geometry.colorsNeedUpdate = true;

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
};

init();
animate();
