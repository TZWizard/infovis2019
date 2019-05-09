
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
                    [0, 1, 0],//v3
                    [0, 1, 1],//v4
                    [1, 1, 1],//v5
                    [1, 0, 1],//v6
                    [0, 0, 1] //v7
                    ]
    var faces = [
                 [0,3,1],//f0
                 [3,2,1],//f1
                 [1,2,5],//f2
                 [1,5,6],//f3
                 [5,4,6],//f4
                 [6,4,7],//f5
                 [4,0,7],//f6
                 [0,4,3],//f7
                 [0,1,7],//f8
                 [7,1,6],//f9
                 [2,4,5],//f10
                 [2,3,4] //f11
                 ]
    var v0 = new THREE.Vector3().fromArray( vertices[0] );
    var v1 = new THREE.Vector3().fromArray( vertices[1] );
    var v2 = new THREE.Vector3().fromArray( vertices[2] );
    var v3 = new THREE.Vector3().fromArray( vertices[3] );
    var v4 = new THREE.Vector3().fromArray( vertices[4] );
    var v5 = new THREE.Vector3().fromArray( vertices[5] );
    var v6 = new THREE.Vector3().fromArray( vertices[6] );
    var v7 = new THREE.Vector3().fromArray( vertices[7] );
    var id0 =faces[0];
    var id1 =faces[1];
    var id2 =faces[2];
    var id3 =faces[3];
    var id4 =faces[4];
    var id5 =faces[5];
    var id6 =faces[6];
    var id7 =faces[7];
    var id8 =faces[8];
    var id9 =faces[9];
    var id10 =faces[10];
    var id11 =faces[11];
    var f0 = new THREE.Face3( id0[0],id0[1],id0[2]);
    var f1 = new THREE.Face3( id1[0],id1[1],id1[2]);
    var f2 = new THREE.Face3( id2[0],id2[1],id2[2]);
    var f3 = new THREE.Face3( id3[0],id3[1],id3[2]);
    var f4 = new THREE.Face3( id4[0],id4[1],id4[2]);
    var f5 = new THREE.Face3( id5[0],id5[1],id5[2]);
    var f6 = new THREE.Face3( id6[0],id6[1],id6[2]);
    var f7 = new THREE.Face3( id7[0],id7[1],id7[2]);
    var f8 = new THREE.Face3( id8[0],id8[1],id8[2]);
    var f9 = new THREE.Face3( id9[0],id9[1],id9[2]);
    var f10 = new THREE.Face3( id10[0],id10[1],id10[2]);
    var f11 = new THREE.Face3( id11[0],id11[1],id11[2]);
    
    var geometry = new THREE.Geometry();
    geometry.vertices.push( v0 );
    geometry.vertices.push( v1 );
    geometry.vertices.push( v2 );
    geometry.vertices.push( v3 );
    geometry.vertices.push( v4 );
    geometry.vertices.push( v5 );
    geometry.vertices.push( v6 );
    geometry.vertices.push( v7 );
    geometry.faces.push( f0 );
    geometry.faces.push( f1 );
    geometry.faces.push( f2 );
    geometry.faces.push( f3 );
    geometry.faces.push( f4 );
    geometry.faces.push( f5 );
    geometry.faces.push( f6 );
    geometry.faces.push( f7 );
    geometry.faces.push( f8 );
    geometry.faces.push( f9 );
    geometry.faces.push( f10 );
    geometry.faces.push( f11 );
    
    geometry.computeFaceNormals();
    
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.FaceColors;
    material.sid = THREE.DoubleSide
    geometry.faces[0].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[1].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[2].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[3].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[4].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[5].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[6].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[7].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[8].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[9].color = new THREE.Color( 0, 0, 1 );
    geometry.faces[10].color = new THREE.Color( 1, 0, 0 );
    geometry.faces[11].color = new THREE.Color( 0, 0, 1 );
    
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    
    //click event
    document.addEventListener( 'mousedown', mouse_down_event );
    function mouse_down_event( event )
    {
        
        var x_win = event.clientX;
        var y_win = event.clientY;
        var vx = renderer.domElement.offsetLeft;
        var vy = renderer.domElement.offsetTop;
        var vw = renderer.domElement.width;
        var vh = renderer.domElement.height;
        var x_NDC = 2 * ( x_win - vx ) / vw - 1;
        var y_NDC = -( 2 * ( y_win - vy ) / vh - 1 );
        var p_NDC = new THREE.Vector3( x_NDC, y_NDC, 1 );
        var p_wld = p_NDC.unproject( camera );
        var origin = camera.position;
        var direction = p_wld.sub(camera.position).normalize();
        console.log(origin, direction);
        var raycaster = new THREE.Raycaster( origin, direction );
        var intersects = raycaster.intersectObject( cube );
        console.log(intersects);
        if ( intersects.length > 0 )
        {
            intersects[0].face.color.setRGB( 0, 1, 0 );
            intersects[0].object.geometry.colorsNeedUpdate = true;
        }
        
    }
    
    loop();
    
    function loop()
    {
        requestAnimationFrame( loop );
        cube.rotation.x += 0.003;
        cube.rotation.y += 0.003;
        renderer.render( scene, camera );
    }
    
}
