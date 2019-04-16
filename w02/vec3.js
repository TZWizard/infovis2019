<<<<<<< HEAD
//coustructor
vec3 = function( x, y, z )
=======
// constructor
Vec3 = function( x, y, z )
>>>>>>> dd812a846d39bb83093616c35d73a0ed5f245785
{
	this.x = x;
	this.y = y;
	this.z = z;
}
// Add method
<<<<<<< HEAD
vec3.prototype.add = function( v )
=======
Vec3.prototype.add = function( v )
>>>>>>> dd812a846d39bb83093616c35d73a0ed5f245785
{
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
}
<<<<<<< HEAD
// Sum method
vec3.prototype.sum = function()
{
	return this.x + this.y + this.z;
}
=======

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

>>>>>>> dd812a846d39bb83093616c35d73a0ed5f245785
