var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.mergeBoxes", {
    outputs: [
		{ type: "int", name: "index", customAlloc: true }
    ],
    params: [
		{ type: "float3", source: "cube_position" },
		{ type: "int", source: "id" }
    ],
    alloc: function (sizes, cube_position, id) {
		var numVertices = cube_position.length / 3;
		var numBoxes = id.length;
        sizes['index'] = numBoxes * (numVertices + 2) - 2;
    },
    evaluate: function (index, cube_position, id) {
		var numVertices = cube_position.length / 3;
		var i=0, t=0;

		// first box
		for (var j = 0; j < numVertices; ++j) {
			index[i++] = t++;
		}

		// all others
		for (var k = 1; k < id.length; ++k) {
			index[i++] = t-1;
			index[i++] = t;
			for (var j = 0; j < numVertices; ++j) {
				index[i++] = t++;
			}
		}
    }
});


})();
