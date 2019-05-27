function main()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    screen.init( volume, {
                width: window.innerWidth,
                height: window.innerHeight,
                enableAutoResize: false
                });
    
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    
    var point = new THREE.Vector3(60,60,17); // point in plane
    var normal = new THREE.Vector3(1,0,4); // normal vector for plane
    var surfaces = Isosurfaces( volume, point, normal, screen );
    screen.scene.add( surfaces );
    
    document.addEventListener( 'mousemove', function() {
                              screen.light.position.copy( screen.camera.position );
                              });
    
    window.addEventListener( 'resize', function() {
                            screen.resize( [ window.innerWidth, window.innerHeight ] );
                            });
    
    screen.loop();
}
