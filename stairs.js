var canvas = document.getElementById('content');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 10000 );
var renderer = new THREE.WebGLRenderer({ clearColor: 0xff0000, clearAlpha: 1 });

var inputContainer = document.getElementById('input-container');

renderer.setSize( 800, 800 );

canvas.appendChild( renderer.domElement );

var light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
var light = new THREE.AmbientLight( 0xFFFFFF ); // soft white light

scene.add( light );
scene.add( light2 );

var controls = new OrbitControls(camera);

// add event listener 
canvas.addEventListener('click', function() { 
    controls.enabled = true;
}, false);

inputContainer.addEventListener( 'click', function() {
    controls.enabled = false;
}, false );
// 

var drawStairs = function () {

    var selected = scene.getObjectByName("stairs");
    
    if ( selected != undefined ) { 

        scene.remove( selected );

    }

    var defaultMat = new THREE.MeshStandardMaterial( { color : 0x00cc00, side: THREE.DoubleSide } );

    var rMin = +document.getElementById( 'minRadius' ).value;
    var rMax = +document.getElementById( 'maxRadius' ).value;
    var stairsStep = +document.getElementById( 'stairHeightInput' ).value;
    var periods = +document.getElementById( 'stairsTurns' ).value;
    var N = +document.getElementById( 'stairNumbers' ).value;

    var spiral = new ThreeJSStairs( N, periods, rMin, rMax, stairsStep );

    var stairs = new THREE.Object3D();
    var base = new THREE.Mesh(spiral.geometry, defaultMat);
    base.name = "base";

    stairs.add(base);

    stairs.name = "stairs";
    scene.add( stairs );

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;

    camera.position.x += (mouseX - camera.position.x);
    camera.position.y += (-mouseY - camera.position.y);

    camera.position = stairs.position;

    camera.lookAt(scene.position);

    animate();

};

function animate() {

    requestAnimationFrame(animate);
    render();

};

function render() {
    
    renderer.render(scene, camera);

};
