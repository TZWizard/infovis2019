function main_sliceplane()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    
    screen.init( volume, {
                width: 500,
                height: 500,
                targetDom: document.getElementById('display2'),
                enableAutoResize: false
                });
    
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    var point = new THREE.Vector3(50, 50, 16);
    var normal = new THREE.Vector3(1, 0, 5);
    var surfaces = Sliceplane( volume, point, normal );
    screen.scene.add( surfaces );
    document.getElementById('apply2').addEventListener('click',function(){
     screen.scene.remove(surfaces);
                                                       var cx = document.getElementById('c_x').value;
                                                       var cy = document.getElementById('c_y').value;
                                                       var cz = document.getElementById('c_z').value;
                                                       var nx = document.getElementById('n_x').value;
                                                       var ny = document.getElementById('n_y').value;
                                                       var nz = document.getElementById('n_z').value;
                                                       point = new THREE.Vector3(cx, cy, cz);
                                                       normal = new THREE.Vector3(nx, ny, nz);
                                                       surfaces = Sliceplane( volume, point, normal );
                                                       screen.scene.add( surfaces );});
    
    document.addEventListener( 'mousemove', function() {
                              screen.light.position.copy( screen.camera.position );
                              });
    
    window.addEventListener( 'resize', function() {
                            screen.resize( [ 500, 500 ] );
                            });
    
    screen.loop();
}
