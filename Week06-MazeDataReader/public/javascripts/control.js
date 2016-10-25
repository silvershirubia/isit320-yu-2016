/* globals define: true, THREE:true */

define(['Floors', 'PointerLockSetup', 'PointerLockControls'], function(Floor, PointerLockSetup, PointerLockControls) {
    'use strict';

    var camera = null;
    var controls = null;
    var cubes = [];
    var npcs = [];
    var raycaster = null;
    var renderer = null;
    var scene = null;
    var size = 20;
    var THREE = null;

    var keyMove = {
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    };

    var cameraPosition = {
        x: 0,
        y: 10,
        z: 10
    };

    function Control(initThree) {
        THREE = initThree;
        init();
        animate();

    }

    function init() {

        var screenWidth = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, screenWidth, 1, 1000);

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        addCubes(scene, camera, false);

        doPointerLock();

        addLights();

        var floor = new Floor(THREE);
        floor.drawFloor(scene);

        raycaster = new THREE.Raycaster(new THREE.Vector3(),
            new THREE.Vector3(0, -1, 0), 0, 10);

        renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.addEventListener('resize', onWindowResize, false);
    }

    function doPointerLock() {
        controls = new PointerLockControls(camera, THREE);
        var yawObject = controls.getObject();
        scene.add(yawObject);

        yawObject.position.x = size;
        yawObject.position.z = size;

        var ps = new PointerLockSetup(controls);
    }

    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function drawText(position) {
        $('#cameraX').html(position.x);
        $('#cameraZ').html(position.z);

        $('#mazeX').html(Math.abs(Math.round(position.x / size)));
        $('#mazeZ').html(Math.abs(Math.round(position.z / size)));

        $('#npcs').empty();

        for(var i = 0; i < npcs.length; i++){
            $('#npcs').append('<li>' + npcs[i] +
            '</li>');
        }
    }

    function animate() {
        requestAnimationFrame(animate);

        var xAxis = new THREE.Vector3(1, 0, 0);

        controls.isOnObject(false);

        var controlObject = controls.getObject();
        var position = controlObject.position;

        // drawText(controlObject, position);
        drawText(position);
        collisionDetection(controls, cubes);

        // Move the camera
        controls.update();

        renderer.render(scene, camera);
    }

    function addCubes(scene, camera, wireFrame) {

        var loader = new THREE.TextureLoader();
        var floorTexture = loader.load('images/crate.jpg');

        $.getJSON('grid000.json', function(grid) {
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] === 1) {

                        addCube(scene, camera, false, i * size, -j * size, floorTexture);

                    }
                }
            }

        });

        $.getJSON('npcs000.json', function(grid) {
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] != 0) {
                        npcs.push([i, j]);
                    addSphere(scene, camera, wireFrame, i*size, -j*size);
                    }
                }
            }

        });

        readDataBase();

    }

    function readDataBase() {
        $.getJSON('/read?docName=npcsDoc', function(data) {
            console.log(JSON.stringify(data.docs, null, 4));

        }).fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ", " + error;
            console.log({"Request Failed": err});
            var response = JSON.parse(jqxhr.responseText);
            var responseValue = JSON.stringify(response, null, 4);
            console.log(responseValue);
            alert('Database not connected' + responseValue);
        });
    }

    function addCube(scene, camera, wireFrame, x, z, floorTexture) {
        //var geometry = new THREE.BoxGeometry(1, 1, 1);
        var geometry = new THREE.BoxGeometry(size, size, size);

        var material = new THREE.MeshLambertMaterial({
            map: floorTexture
        });

        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, size / 2, z);
        scene.add(cube);

        cubes.push(cube);
        return cube;
    }

    function addSphere(sne, camera, wireFrame, x, z) {
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);
        scene.add(sphere);

        return sphere;
    }

    var collisionDetection = function(controls, cubes) {

        function bounceBack(position, ray) {
            position.x -= ray.bounceDistance.x;
            position.y -= ray.bounceDistance.y;
            position.z -= ray.bounceDistance.z;
        }

        var rays = [
            //   Time    Degrees      words
            new THREE.Vector3(0, 0, 1), // 0 12:00,   0 degrees,  deep
            new THREE.Vector3(1, 0, 1), // 1  1:30,  45 degrees,  right deep
            new THREE.Vector3(1, 0, 0), // 2  3:00,  90 degress,  right
            new THREE.Vector3(1, 0, -1), // 3  4:30, 135 degrees,  right near
            new THREE.Vector3(0, 0, -1), // 4  6:00  180 degress,  near
            new THREE.Vector3(-1, 0, -1), // 5  7:30  225 degrees,  left near
            new THREE.Vector3(-1, 0, 0), // 6  9:00  270 degrees,  left
            new THREE.Vector3(-1, 0, 1) // 7 11:30  315 degrees,  left deep
        ];

        var position = controls.getObject().position;
        var rayHits = [];
        for (var index = 0; index < rays.length; index += 1) {

            // Set bounce distance for each vector
            var bounceSize = 0.01;
            rays[index].bounceDistance = {
                x: rays[index].x * bounceSize,
                y: rays[index].y * bounceSize,
                z: rays[index].z * bounceSize
            };

            raycaster.set(position, rays[index]);

            var intersections = raycaster.intersectObjects(cubes);

            if (intersections.length > 0 && intersections[0].distance <= 3) {
                controls.isOnObject(true);
                bounceBack(position, rays[index]);
            }
        }

        return false;
    };

    function addLights() {
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.set(-1, -0.5, -1);
        scene.add(light);
    }

    return Control;
});
