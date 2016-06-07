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
		// {type: "float3", source: "center", array: true},
		// {type: "float2", source: "extent", array: true},
		// {type: "float", source: "height", array: true},
		// {type: "float3", source: "color", array: true},
		{type: "float3", source: "cube_position", array: true},
		{type: "float3", source: "cube_normal", array: true}
	],
	
	alloc: function (sizes, /* center, extent, height, color, */ cube_position, cube_normal) {
	    var verticesPerBox = cube_position.length / 3;
		var numberOfBoxes = center.length / 3;
		var totalVertices = numberOfBoxes * verticesPerBox;
		sizes['position'] = verticesPerBox; //totalVertices;
		sizes['normal'] = verticesPerBox; //totalVertices;
		sizes['color'] = verticesPerBox; //totalVertices;
	},
	
	evaluate: function (position, normal, color, /* in_center, in_extent, in_height, in_color, */ cube_position, cube_normal) {
		var count = in_center.length / 3;
		var verticesPerBox = cube_position.length / 3;
		var p = 0, n = 0, c = 0;

		for (var j = 0; j < verticesPerBox; ++j) {
			var j3 = 3*j;
			position[p++] = cube_position[j3  ];
			position[p++] = cube_position[j3+1];
			position[p++] = cube_position[j3+2];
			normal[n++] = cube_normal[j3  ];
			normal[n++] = cube_normal[j3+1];
			normal[n++] = cube_normal[j3+2];
			color[c++] = 1;
			color[c++] = 0;
			color[c++] = 0;
		}
		
		return true;
		
		// for (var i = 0; i < count; ++i) {
			// var x = in_extent[2*i  ];
			// var z = in_extent[2*i+1];
			// var y = in_height[i];
			// var r = in_color[3*i  ];
			// var g = in_color[3*i+1];
			// var b = in_color[3*i+2];
			
			// for (var j = 0; j < verticesPerBox; ++j) {
				// var j3 = 3*j;
				// position[p++] = x * cube_position[j3  ];
				// position[p++] = y * cube_position[j3+1];
				// position[p++] = z * cube_position[j3+2];
				// normal[n++] = cube_normal[j3  ];
				// normal[n++] = cube_normal[j3+1];
				// normal[n++] = cube_normal[j3+2];
				// color[c++] = r;
				// color[c++] = g;
				// color[c++] = b;
			// }
		// }
	}
});

// /*
// Xflow.registerOperator("xflow.selectBox", {
    // outputs: [
		// { type: "float3", name: "position", customAlloc: true },
		// { type: "float3", name: "normal", customAlloc: true },
		// { type: "float3", name: "color", customAlloc: true }
    // ],
    // params: [
		// { type: "float3", source: "position" },
		// { type: "float3", source: "normal" },
		// { type: "float3", source: "color" },
		// { type: "int", source: "idx" },
		// { type: "float3", source: "cube_position" }
    // ],
    // alloc: function (sizes, position, normal, color, idx, cube_position) {
		// var numVertices = cube_position.length / 3;
        // sizes['position'] = numVertices;
        // sizes['normal'] = numVertices;
        // sizes['color'] = numVertices;
    // },
    // evaluate: function (position, normal, color, in_position, in_normal, in_color, idx, cube_position) {
        // var boxIndex = idx[0];
		// var numVertices = cube_position.length / 3;
        // var b3 = 3 * boxindex * numVertices;
		// var p=0, n=0, c=0;
		
        // for (var i = 0; i < numVertices; ++i) {
            // position[p] = in_position[b3 + p++];
            // position[p] = in_position[b3 + p++];
            // position[p] = in_position[b3 + p++];
            // normal[n] = in_normal[b3 + n++];
            // normal[n] = in_normal[b3 + n++];
            // normal[n] = in_normal[b3 + n++];
            // color[c] = in_color[b3 + c++];
            // color[c] = in_color[b3 + c++];
            // color[c] = in_color[b3 + c++];
        // }
    // }
// });


})();
