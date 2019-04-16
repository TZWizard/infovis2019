//coustructor
vec3 = function( x, y, z )
{
	this.x = x;
	this.y = y;
	this.z = z;
}
// Add method
vec3.prototype.add = function( v )
{
	this.x += v.x;
	this.y += v.y;
	this.z += v.z;
	return this;
}
// Sum method
vec3.prototype.sum = function()
{
	return this.x + this.y + this.z;
}