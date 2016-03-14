define(['three', 'VRManager','OBJLoader', 'DDSLoader', 'MTLLoader', 'ColladaLoader'], function(THREE, VRManager, OBJLoader) {
    var container, scene, renderer, camera, light, clock, loader;
    var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

    clock = new THREE.Clock();
    console.log(THREE);

    // костыли
    WIDTH = window.screen.availWidth - 12,
    HEIGHT = 550;

    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 500;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    renderer.shadowMapAutoUpdate = true;


    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    camera.position.set(0, 4, 2);
    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);

    light = new THREE.DirectionalLight(0xffFFff);

    light.position.set(0, 4, 2);

    scene.add(light);


    var light2 = new THREE.PointLight( 0xffffff, 500*2*2, 100 );
    light2.position.set( 0, 4, 2 );
    scene.add( light2 );


    var mesh;
    // var loader = new THREE.ColladaLoader();
    //
    // loader.load(
    //     'js/src/3d_models/st/Stormtrooper.dae',
    //     function ( collada ) {
    //         console.log(collada);
	// 	          scene.add( collada.scene );
	//              },
	// // Function called when download progresses
	//    function ( xhr ) {
	// 	         console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
	//             }
    //         );
    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var mtlLoader = new THREE.MTLLoader();
    	mtlLoader.setBaseUrl( 'js/src/3d_models/stormtrooper/' );
    	mtlLoader.setPath( 'js/src/3d_models/stormtrooper/' );
    	mtlLoader.load( 'Stormtrooper.mtl', function( materials ) {

    		materials.preload();

    		var objLoader = new THREE.OBJLoader();
    		objLoader.setMaterials( materials );
    		objLoader.setPath( 'js/src/3d_models/stormtrooper/' );
    		objLoader.load( 'Stormtrooper.obj', function ( object ) {

    			mesh = object
    			scene.add( object );

    		} );

	});


    function render() {
     var time = clock.getElapsedTime();
     if (mesh) mesh.rotation.y += .05;


     renderer.render(scene, camera);
     requestAnimationFrame(render);
    }
    return {
        renderer: renderer,
        render: render,
    }
})
