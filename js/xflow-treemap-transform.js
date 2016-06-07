var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {

var TMP_VEC = XML3D.math.vec3.create();

Xflow.registerOperator("xflow.transformBox", {
    outputs: [
		{ type: "float4x4", name: "transform" }
    ],
    params: [
		{ type: "float3", source: "center" },
		{ type: "float2", source: "extent" },
		{ type: "float", source: "height" }
    ],
    // alloc: function (sizes, center, extent, height) {
		// var numBoxes = height.length;
        // sizes['transform'] = 1; //numBoxes;
    // },
    evaluate_core: function (transform, center, extent, height) {
		var x = extent[0];
		var y = height[0];
		var z = extent[1];

		transform[ 0] = x;
		transform[ 1] = 0;
		transform[ 2] = 0;
		transform[ 3] = 0;
		transform[ 4] = 0;
		transform[ 5] = y;
		transform[ 6] = 0;
		transform[ 7] = 0;
		transform[ 8] = 0;
		transform[ 9] = 0;
		transform[10] = z;
		transform[11] = 0;
		transform[12] = center[0];
		transform[13] = center[1];
		transform[14] = center[2];
		transform[15] = 1;		
		// console.log(transform);
    }
});


})();
