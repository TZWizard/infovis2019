function main_isosurface()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();

    screen.init( volume, {
        width: 500,
        height: 500 ,
        targetDom: document.getElementById('display1'),
        enableAutoResize: false
    });
    

    var bounds = Bounds( volume );
    screen.scene.add( bounds );

    var isovalue = 128;
    var surfaces = Isosurfaces( volume, isovalue );
    screen.scene.add( surfaces );
    document.getElementById('apply1').addEventListener('click',function(){
    screen.scene.remove(surfaces);
        var isovalue = document.getElementById('isovalue').value;
        surfaces = Isosurfaces( volume, isovalue);
        screen.scene.add( surfaces );
                                                       });
    document.addEventListener( 'mousemove', function() {
        screen.light.position.copy( screen.camera.position );
    });

    window.addEventListener( 'resize', function() {
        screen.resize( [ 500, 500 ] );
    });

    screen.loop();
}
