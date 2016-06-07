---
layout: compress
---

var orbitControls = null;
var scene, renderer, loader;

var defaultCamera = null;
var gltf = null;

function initScene(sceneInfo) {

	var container = $('#decl3d')[0];

	scene = new THREE.Scene();

	defaultCamera = new THREE.PerspectiveCamera( 32.08564, container.offsetWidth / container.offsetHeight, 0.02, 16.0 );

	/* defaultCamera.up = new THREE.Vector3( 0, 1, 0 ); */
	scene.add( defaultCamera );

	var spot1 = null;

	if (sceneInfo.addLights) {

		var ambient = new THREE.AmbientLight( 0x222222 );
		scene.add( ambient );

		var directionalLight = new THREE.DirectionalLight( 0xdddddd );
		directionalLight.position.set( 0, 0, 1 ).normalize();
		scene.add( directionalLight );
	
		spot1   = new THREE.SpotLight( 0xffffff, 1 );
		spot1.position.set( 100, 200, 100 );
		spot1.target.position.set( 0, 0, 0 );

		if (sceneInfo.shadows) {

			spot1.shadow.cameraNear = 1;
			spot1.shadow.cameraFar = 1024;
			spot1.castShadow = true;
			spot1.shadow.bias = 0.0001;
			spot1.shadow.mapSize.width = 2048;
			spot1.shadow.mapSize.height = 2048;

		}

		scene.add( spot1 );

	}

	/* RENDERER */

	renderer = new THREE.WebGLRenderer({antialias:true});
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( container.innerWidth, container.innerHeight );
    renderer.setClearColor( 0xffffff, 1);

	if (sceneInfo.shadows) {
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	}

	container.appendChild( renderer.domElement );

	var ground = null;

	if (sceneInfo.addGround) {
		var groundMaterial = new THREE.MeshPhongMaterial({
				color: 0xFFFFFF,
				shading: THREE.SmoothShading,
			});
		ground = new THREE.Mesh( new THREE.PlaneBufferGeometry(1024, 1024), groundMaterial);

		if (sceneInfo.shadows) {
			ground.receiveShadow = true;
		}

		if (sceneInfo.groundPos) {
			ground.position.copy(sceneInfo.groundPos);
		} else {
			ground.position.z = -70;
		}

		ground.rotation.x = -Math.PI / 2;

		scene.add(ground);
	}

	loader = new THREE.glTFLoader;
	var url = sceneInfo.url;
	
	loader.load( url, function(data) {
    
		gltf = data;

		var object = gltf.scene;

		if (sceneInfo.cameraPos)
			defaultCamera.position.copy(sceneInfo.cameraPos);

		if (sceneInfo.center) {
			orbitControls.center.copy(sceneInfo.center);
		}

		if (sceneInfo.objectPosition) {
			object.position.copy(sceneInfo.objectPosition);

			if (spot1) {
				spot1.position.set(sceneInfo.objectPosition.x - 100, sceneInfo.objectPosition.y + 200, sceneInfo.objectPosition.z - 100 );
				spot1.target.position.copy(sceneInfo.objectPosition);
			}
		}

		if (sceneInfo.objectRotation)
			object.rotation.copy(sceneInfo.objectRotation);

		if (sceneInfo.objectScale)
			object.scale.copy(sceneInfo.objectScale);

		scene.add( object );
		onWindowResize();
	});

	orbitControls = new THREE.OrbitControls(defaultCamera, renderer.domElement);
}

function onWindowResize() {

	var container = $('#decl3d')[0];

	defaultCamera.aspect = container.offsetWidth / container.offsetHeight;
	defaultCamera.updateProjectionMatrix();

	renderer.setSize( container.offsetWidth, container.offsetHeight );
}


function render() 
{
	requestAnimationFrame(render);

	THREE.glTFAnimator.update();
	THREE.glTFShaders.update(scene, defaultCamera);
	orbitControls.update();

	renderer.render( scene, defaultCamera );

	evalTick();
}