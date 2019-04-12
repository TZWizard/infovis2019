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

