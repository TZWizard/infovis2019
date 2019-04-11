// constructor
Vec3 = function( x, y, z )
{
	this.x = x;
	this.y = y;
	this.z = z;
}
// Add method
Vec3.prototype.add = function( v )
{
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
}

// Sum method
Vec3.prototype.sum = function()
{
	return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
	if ( v.x < v.y && v.x < v.z )
{
	return v.x
}
	else if ( v.y < v.x && v.y < v.z )
{
	return v.y
}
	else
{
	return v.z
}
}

// Max method
Vec3.prototype.max = function()
{
	if ( v.x > v.y && v.x > v.z )
{
	return v.x
}
	else if ( v.y > v.x && v.y > v.z )
{
	return v.y
}
	else
{
	return v.z
}
}

//Min method
Vec3.prototype.mid = function()
{
	if ( v.x > v.y && v.x < v.z || v.x < v.y && v.x > v.z )
{
	return v.x
}
	else if ( v.y > v.x && v.y < v.z || v.y < v.x && v.y > v.z )
{
	return v.y
}
	else
{
	return v.z
}
}

// AreaOfTriangle method
Vec3.prototype.AreaOfTriangle = function( v0, v1, v2 )
{
	var a = math.sqrt(( v1.x - v2.x ) * ( v1.x - v2.x ) + ( v1.y - v2.y ) * ( v1.y - v2.y ) + ( v1.z - v2.z ) * ( v1.z - v2.z ))
	var b = math.sqrt(( v0.x - v2.x ) * ( v0.x - v2.x ) + ( v0.y - v2.y ) * ( v0.y - v2.y ) + ( v0.z - v2.z ) * ( v0.z - v2.z ))
	var c = math.sqrt(( v0.x - v1.x ) * ( v0.x - v1.x ) + ( v0.y - v1.y ) * ( v0.y - v1.y ) + ( v0.z - v1.z ) * ( v0.z - v2.z ))
	var t = ( a + b + c ) / 2
	return math.sqrt( t * ( t - a ) * ( t - b ) * ( t - c ))
}