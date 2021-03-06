function Sliceplane( volume )
{
    //constants
    var point = new THREE.Vector3(50, 50, 16);
    var normal = new THREE.Vector3(1, 0, 5);
    var d = - normal.x * point.x - normal.y * point.y - normal.z * point.z;
    var coef = new THREE.Vector4( normal.x, normal.y, normal.z, d );
    //console.log(coef);
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial();
    material.vertexColors = THREE.VertexColors;
    material.side = THREE.DoubleSide;
    
    var lut = new KVS.MarchingCubesTable();
    var counter = 0;
    
    // Create color map
    var cmap = [];
    for ( var i = 0; i < 256; i++ )
    {
        var S = i / 255.0; // [0,1]
        var R = Math.max( Math.cos( ( S - 1.0 ) * Math.PI ), 0.0 );
        var G = Math.max( Math.cos( ( S - 0.5 ) * Math.PI ), 0.0 );
        var B = Math.max( Math.cos( S * Math.PI ), 0.0 );
        var color = new THREE.Color( R, G, B );
        cmap.push( color );
    }
    
    for ( var z = 0; z < volume.resolution.z - 1; z++ )
    {
        for ( var y = 0; y < volume.resolution.y - 1; y++ )
        {
            for ( var x = 0; x < volume.resolution.x - 1; x++ )
            {
                
                var index = table_index( x, y, z );
                if ( index == 0 ) { continue; }
                if ( index == 255 ) { continue; }
                
                for ( var j = 0; lut.edgeID[index][j] != -1; j += 3 )
                {
                    var eid0 = lut.edgeID[index][j];
                    var eid1 = lut.edgeID[index][j+2];
                    var eid2 = lut.edgeID[index][j+1];
                    
                    var vid0 = lut.vertexID[eid0][0];
                    var vid1 = lut.vertexID[eid0][1];
                    var vid2 = lut.vertexID[eid1][0];
                    var vid3 = lut.vertexID[eid1][1];
                    var vid4 = lut.vertexID[eid2][0];
                    var vid5 = lut.vertexID[eid2][1];
                    
                    var v0 = new THREE.Vector3( x + vid0[0], y + vid0[1], z + vid0[2] );
                    var v1 = new THREE.Vector3( x + vid1[0], y + vid1[1], z + vid1[2] );
                    var v2 = new THREE.Vector3( x + vid2[0], y + vid2[1], z + vid2[2] );
                    var v3 = new THREE.Vector3( x + vid3[0], y + vid3[1], z + vid3[2] );
                    var v4 = new THREE.Vector3( x + vid4[0], y + vid4[1], z + vid4[2] );
                    var v5 = new THREE.Vector3( x + vid5[0], y + vid5[1], z + vid5[2] );
                    
                    var v01 = interpolated_vertex( v0, v1 );
                    var v23 = interpolated_vertex( v2, v3 );
                    var v45 = interpolated_vertex( v4, v5 );
                    
                    geometry.vertices.push( v01 );
                    geometry.vertices.push( v23 );
                    geometry.vertices.push( v45 );
                    
                    var id0 = counter++;
                    var id1 = counter++;
                    var id2 = counter++;
                    
                    var face = new THREE.Face3( id0, id1, id2 );
                    face.vertexColors.push( cmap[interpolated_value( v0, v1 )] );
                    face.vertexColors.push( cmap[interpolated_value( v2, v3 )] );
                    face.vertexColors.push( cmap[interpolated_value( v4, v5 )] );
                    geometry.faces.push( face );
                }
            }
        }
    }
    
    return new THREE.Mesh( geometry, material );
    
    function table_index( x, y, z )
    {
        var s0 = plane_function( x,     y,     z     );
        var s1 = plane_function( x + 1, y,     z     );
        var s2 = plane_function( x + 1, y + 1, z     );
        var s3 = plane_function( x,     y + 1, z     );
        var s4 = plane_function( x,     y,     z + 1 );
        var s5 = plane_function( x + 1, y,     z + 1 );
        var s6 = plane_function( x + 1, y + 1, z + 1 );
        var s7 = plane_function( x,     y + 1, z + 1 );
        
        var index = 0;
        if ( s0 > 0 ) { index |=   1; }
        if ( s1 > 0 ) { index |=   2; }
        if ( s2 > 0 ) { index |=   4; }
        if ( s3 > 0 ) { index |=   8; }
        if ( s4 > 0 ) { index |=  16; }
        if ( s5 > 0 ) { index |=  32; }
        if ( s6 > 0 ) { index |=  64; }
        if ( s7 > 0 ) { index |= 128; }
        
        return index;
    }
    
    //linear interpolation for plane
    function interpolated_vertex( v0, v1 )
    {
        if( v0.x != v1.x )
        {
            var s =  (-coef.y * v0.y - coef.z * v0.z -coef.w) / coef.x;
            return new THREE.Vector3( s , v0.y , v0.z );
        }
        if( v0.y != v1.y )
        {
            var s =   (-coef.x * v0.x - coef.z * v0.z -coef.w) / coef.y;
            return new THREE.Vector3( v0.x , s , v0.z );
        }
        if( v0.z != v1.z )
        {
            var s =  (-coef.x * v0.x - coef.y * v0.y -coef.w) / coef.z;
            return new THREE.Vector3( v0.x , v0.y , s );
        }
    }
    
    function interpolated_value( v0, v1 )
    {
        var lines = volume.resolution.x;
        var slices = volume.resolution.x * volume.resolution.y;
        var s0 = volume.values[ v0.x + v0.y*lines + v0.z*slices ][0];
        var s1 = volume.values[ v1.x + v1.y*lines + v1.z*slices ][0];
        var v01 = interpolated_vertex( v0, v1 );
        
        if( v0.x != v1.x)
        {
            var p = ( 2*v01.x - ( v0.x + v1.x ) )/( v1.x - v0.x );
            var s_result = ( s1 - s0 )*p/2 + ( s0 + s1 )/2;
        }
        
        if( v0.y != v1.y)
        {
            var p = ( 2*v01.y - ( v0.y + v1.y ) )/( v1.y - v0.y );
            var s_result = ( s1 - s0 )*p/2 + ( s0 + s1 )/2;
        }
        
        if( v0.z != v1.z)
        {
            var p = ( 2*v01.z - ( v0.z + v1.z ) )/( v1.z - v0.z );
            var s_result = ( s1 - s0 )*p/2 + ( s0 + s1 )/2;
        }
        
        return Math.round( s_result );
    }
    
    function plane_function( x, y, z )
    {
        return coef.x * x + coef.y * y + coef.z * z + coef.w;
    }
}
