var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.genBoxes", {
	outputs: [
		{type: "float3", name: "position", customAlloc: true},
		{type: "float3", name: "normal", customAlloc: true},
		{type: "float3", name: "color", customAlloc: true}
	],
	
	params: [
		{type: "float3", source: "center", array: true},
		{type: "float2", source: "extent", array: true},
		{type: "float", source: "height", array: true},
		{type: "float3", source: "color", array: true},
		{type: "float3", source: "cube_position", array: true},
		{type: "float3", source: "cube_normal", array: true}
	],
	
	alloc: function (sizes, center, extent, height, color, cube_position, cube_normal) {
	    var verticesPerBox = cube_position.length / 3;
		var numberOfBoxes = center.length / 3;
		var totalVertices = numberOfBoxes * verticesPerBox;
		sizes['position'] = totalVertices;
		sizes['normal'] = totalVertices;
		sizes['color'] = totalVertices;
	},
	
	evaluate: function (position, normal, color, in_center, in_extent, in_height, in_color, cube_position, cube_normal) {
		var count = in_center.length / 3;
		var verticesPerBox = cube_position.length / 3;
		var p = 0, n = 0, c = 0;

		for (var i = 0; i < count; ++i) {
			var sx = in_extent[2*i  ];
			var sz = in_extent[2*i+1];
			var sy = in_height[i];
			var tx = in_center[3*i  ];
			var ty = in_center[3*i+1];
			var tz = in_center[3*i+2];
			var r = in_color[3*i  ];
			var g = in_color[3*i+1];
			var b = in_color[3*i+2];
			
			for (var j = 0; j < verticesPerBox; ++j) {
				var j3 = 3*j;
				position[p++] = sx * cube_position[j3  ] + tx;
				position[p++] = sy * cube_position[j3+1] + ty;
				position[p++] = sz * cube_position[j3+2] + tz;
				normal[n++] = cube_normal[j3  ];
				normal[n++] = cube_normal[j3+1];
				normal[n++] = cube_normal[j3+2];
				color[c++] = r;
				color[c++] = g;
				color[c++] = b;
			}
		}
	}
});


})();
