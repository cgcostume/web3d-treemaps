var XML3D = XML3D || {};
var Xflow = Xflow || {};


(function() {


Xflow.registerOperator("xflow.genBoxIndices", {
    outputs: [
		{ type: "int", name: "index", customAlloc: true }
    ],
    params: [
		{ type: "float3", source: "cube_position" },
		{ type: "int", source: "id" },
		{ type: "int", source: "boxid" }
    ],
    alloc: function (sizes, cube_position, id, boxid) {
		var numVertices = cube_position.length / 3;
        sizes['index'] = numVertices;
    },
    evaluate: function (index, cube_position, id, boxid) {
        var boxid = boxid[0];
		var numVertices = cube_position.length / 3;
		var boxIndex = -1;
		
		for (var i = 0; i < id.length; ++i) {
			if (id[i] == boxid) {
				boxIndex = i;
				break;
			}
		}
		if (boxIndex == -1) {
			console.log("Missing box with id " + boxid);
			return;
		}
        var offset = boxIndex * numVertices;
		
        for (var i = 0; i < numVertices; ++i) {
            index[i] = offset + i;
        }
    }
});


})();
