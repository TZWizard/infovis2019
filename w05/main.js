function main()
{
    var height = 500;
    var width = 500;
    
    var scene = new THREE.Scene();
    
    var fov = 45;
    var aspect = width / height;
    var near = 1;
    var far = 1000;
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far );
    camera.position.set( 0, 0, 5 );
    var light = new THREE.PointLight( 0xffffff );
    light.position.set( 1, 1, 1 );
    scene.add( light );
    scene.add( camera );
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    document.body.appendChild( renderer.domElement );
    //geometry cube
    var vertices = [
        [0, 0, 0],//v0
        [1, 0, 0],//v1
        [1, 1, 0],//v2
        [1, 1, 1],//v3
        [0, 1, 0],//v4
        [0, 1, 1],//v5
        [0, 0, 1],//v6
    ]
}