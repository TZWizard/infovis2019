function main_rendering()
{
    var volume = new KVS.LobsterData();
    var screen = new KVS.THREEScreen();
    var reflection_type = 1;
    
    screen.init( volume, {
                width: 500,
                height: 500,
                targetDom: document.getElementById('display3'),
                enableAutoResize: false
                });
    
    var bounds = Bounds( volume );
    screen.scene.add( bounds );
    
    var isovalue = 128;
    var surfaces = rendering( volume,isovalue,screen,reflection_type );
    screen.scene.add( surfaces );
    document.getElementById('apply3').addEventListener('click',function(){
    screen.scene.remove(surfaces);
    var radio_select = document.getElementsByName('reflection');
    if( radio_select[0].checked == true){
    reflection_type = 1;}
    else if(radio_select[1].checked == true){
    reflection_type = 2;
    }
                                                       else{
                                                       reflection_type = 3;
                                                       }
    surfaces = rendering( volume,isovalue,screen,reflection_type );
    screen.scene.add( surfaces );
                                                       console.log(reflection_type);
    });
    
    document.addEventListener( 'mousemove', function() {
                              screen.light.position.copy( screen.camera.position );
                              });
    
    window.addEventListener( 'resize', function() {
                            screen.resize( [ 500, 500 ] );
                            });
    
    
    screen.loop();
}

