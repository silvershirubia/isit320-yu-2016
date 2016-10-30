/* globals define: true, THREE:true */

define(['Floors', 'PointerLockSetup', 'PointerLockControls', 'Collisions', 'Npcs', 'Score'], function(Floor, PointerLockSetup, PointerLockControls, Collisions, Npcs, Score) {
    'use strict';

    var camera = null;
    var collisions;
    var controls = null;
    var cubes = [];
    var foundNpc = false;
    var gridX;
    var gridZ;
    var npc;
    //var npcList = [];
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

        npc = new Npcs(THREE);
        collisions = new Collisions(THREE, size);

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

        gridX = Math.abs(Math.round(position.x / size));
        gridZ = Math.abs(Math.round(position.z / size));

        $('#mazeX').html(gridX);
        $('#mazeZ').html(gridZ);

        $('#npcs').empty();

        for (var i = 0; i < npc.npcList.length; i++) {
            $('#npcs').append('<li>' + npc.npcList[i] +
                '</li>');
        }
        $('#test').html('foundNpc = ' + foundNpc.valueOf());
    }

    function animate() {
        requestAnimationFrame(animate);

        var xAxis = new THREE.Vector3(1, 0, 0);
        collisions.collisionDetection(controls, cubes, raycaster);

        controls.isOnObject(false);

        var controlObject = controls.getObject();
        var position = controlObject.position;

        // drawText(controlObject, position);
        drawText(position);
        collisions.collisionDetection(controls, cubes, raycaster);
        //mainCharacter = mainCharacter[x][z];

        foundNpc = collisions.npcDetection(gridX, gridZ);

        if(foundNpc){
            var gridNpc = npc.npcList[gridX][gridZ];
            npc.removeNpc(gridX,gridZ,scene,gridNpc);
        }
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
                    if (grid[i][j] !== 0) {
                        npc.npcList.push([i, j]);
                        npc.createNpc(scene, camera, wireFrame, i * size, -j * size, size);
                    }
                }
            }

        });

        readDataBase();

    }

    function readDataBase() {
        $.getJSON('/read?docName=npcObjects', function(data) {
            Score.npcData = data.docs;
            console.log(JSON.stringify(data.docs, null, 4));

        }).fail(function(jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log({
                'Request Failed': err
            });
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
