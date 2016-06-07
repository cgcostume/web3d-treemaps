---
layout: compress
---

var firstFrame = 0;

var stats0 = null;
var stats1 = null;
var stats2 = null;

function setupEval()
{
	stats0 = new Stats();
	stats1 = new Stats();
	stats2 = new Stats();

	$("#stats0")[0].appendChild( stats0.dom );
	$("#stats1")[0].appendChild( stats1.dom );
	$("#stats2")[0].appendChild( stats2.dom );

	stats0.showPanel(0);
	stats0.dom.setAttribute('style', '');

	stats1.showPanel(1);
	stats1.dom.setAttribute('style', '');

	stats2.showPanel(2);
	stats2.dom.setAttribute('style', '');

    var DOMContentLoadedStart = (window.performance.timing.domContentLoadedEventStart - window.performance.timing.navigationStart) * 0.001;
    var DOMContentLoadedEnd = (window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart) * 0.001;

    $("#eval-load")[0].innerHTML =
      "Canvas: " + $("canvas")[0].width + "px x " + $("canvas")[0].height + "px" + 
      ", Items: #" + numberOfItems() +
      ", Finish: " + DOMContentLoadedStart.toFixed(2) + "s" +
      ", DOMContentLoaded: " + DOMContentLoadedEnd.toFixed(2) + "s";

	setupFirstFrame();
}

function setupFirstFrame()
{
	firstFrame = -1;	
}

function evalTick()
{
	if(firstFrame < 0)
	{
		firstFrame = (Date.now() - window.performance.timing.navigationStart) * 0.001;
		 $("#eval-load")[0].innerHTML += ", FirstFrame: " + firstFrame.toFixed(2) + "s";
	}

	stats0.end(); stats0.begin();
	stats1.end(); stats1.begin();
	stats2.end(); stats2.begin();

	benchmark_tick();
}


var colors = [ [ 0.768627, 0.117647, 0.078431 ],
               [ 1.000000, 0.447059, 0.274510 ],
               [ 1.000000, 0.784314, 0.419608 ],
               [ 0.917647, 0.917647, 0.917647 ]  ];

function randomColor()
{
 	return colors[Math.floor((1.0 - Math.pow(Math.random(), 2.0)) * 4)];
}

function randomHeight()
{
	return 0.001 + 0.125 * Math.pow(Math.random(), 128.0) + 0.02 * Math.pow(Math.random(), 16.0);
}


var benchmarked_frames = 0;
var benchmarked_index = 0;

var benchmarkTime = 0;

var benchmark_num = 100;

var evalframe = null;
var evalremap_color = null;
var evalremap_height = null;
var evalhighlight = null;


var benchmark_stage = -1;

function benchmark()
{
	evalframe = $('#eval-frame')[0];
	evalremap_color = $('#eval-remap-color')[0];
	evalremap_height = $('#eval-remap-height')[0];
	evalhighlight = $('#evalhighlight')[0];

	benchmark_stage = 0;
}

function benchmark_tick()
{
	if(benchmark_stage < 0)
		return;

	switch(benchmark_stage)
	{
	case 0: /* initialize */
		{
			$('#benchmark').addClass('disabled');

			benchmarked_frames = 0;
			benchmarkTime = Date.now();
			benchmark_stage = 1;
		}
		break;

	case 1: /* frame rendering time */
		{
			benchmarked_frames++;

			var time = (Date.now() - benchmarkTime) / benchmarked_frames;
			var fps = 1000.0 / time;
			evalframe.innerHTML = time.toFixed(2) + "ms, " + fps.toFixed(2) + "fps (measured " + benchmarked_frames + "/" + benchmark_num + ")";
			
			if(benchmarked_frames < benchmark_num)
				return;

			benchmarked_frames = 0;
			benchmarkTime = Date.now();
			benchmark_stage = 2;
		}
		break;

	case 2: /* color remapping time */
		{
			benchmarked_frames++;
			randomizeAllColorAttributes();

			var time = (Date.now() - benchmarkTime) / benchmarked_frames;
			var fps = 1000.0 / time;
			evalremap_color.innerHTML = time.toFixed(2) + "ms, " + fps.toFixed(2) + "fps (measured " + benchmarked_frames + "/" + benchmark_num + ")";

			if(benchmarked_frames < benchmark_num)
				return;

			benchmarked_frames = 0;
			benchmarkTime = Date.now();
			benchmark_stage = 3;
		}
		break;

	case 3: /* height remapping time */
		{
			benchmarked_frames++;
			randomizeAllHeightAttributes();

			var time = (Date.now() - benchmarkTime) / benchmarked_frames;
			var fps = 1000.0 / time;
			evalremap_height.innerHTML = time.toFixed(2) + "ms, " + fps.toFixed(2) + "fps (measured " + benchmarked_frames + "/" + benchmark_num + ")";

			if(benchmarked_frames < benchmark_num)
				return;

			benchmarked_frames = 0;
			benchmarkTime = Date.now();
			benchmark_stage = 4;
		}
		break;

	case 4: /* individual node highlighting */
		{
			benchmarked_frames++;
			if(benchmarked_frames > 0)
				unhighlightNode(benchmarked_index);

			benchmarked_index = Math.floor(Math.random() * numberOfItems());			
			highlightNode(benchmarked_index);

			var time = (Date.now() - benchmarkTime) / benchmarked_frames;
			var fps = 1000.0 / time;
			evalhighlight.innerHTML = time.toFixed(2) + "ms, " + fps.toFixed(2) + "fps (measured " + benchmarked_frames + "/" + benchmark_num + ")";

			if(benchmarked_frames < benchmark_num)
				return;

			unhighlightNode(benchmarked_index);

			benchmarked_frames = 0;
			benchmarkTime = Date.now();
			benchmark_stage = 5;
		}
		break;

	default: /* cleanup */
		{
			$('#benchmark').removeClass('disabled');
			benchmark_stage = -1;
		}
		break;
	}
}
