var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.selectBox", {
    outputs: [
		{ type: "float4x4", name: "transform", customAlloc: true },
		{ type: "float3", name: "diffuseColor", customAlloc: true }
    ],
    params: [
		{ type: "int", source: "id" },
		{ type: "int", source: "boxid" },
 		{ type: "float4x4", source: "transform" },
 		{ type: "float3", source: "color" }
    ],
    alloc: function (sizes, id, boxid, transform, color) {
        sizes['transform'] = 1;
        sizes['diffuseColor'] = 1;
    },
    evaluate: function (transform, diffuseColor, id, boxid, in_transform, color) {
        var boxid = boxid[0];
		var boxIndex = -1;
		
		for (var i = 0; i < id.length; ++i) {
			if (id[i] == boxid) {
				boxIndex = i;
				break;
			}
		}
		
		XML3D.math.mat4.copy(transform, in_transform.subarray(16*boxIndex));
		XML3D.math.vec3.copy(diffuseColor, color.subarray(3*boxIndex));
		// console.log(transform);
		// console.log(diffuseColor);
    }
});


})();
