/* globals define: true, THREE:true */

define(['Floors', 'PointerLockSetup', 'PointerLockControls', 'Collisions', 'Maze', 'Npcs', 'ReadDatabase', 'Score'], function(Floor, PointerLockSetup, PointerLockControls, Collisions, Maze, Npcs, ReadDatabase, Score) {
    'use strict';

    var camera = null;
    var collisions;
    var controls = null;
    var database;
    var foundNpc = false;
    var gridX;
    var gridZ;
    var maxNpcs;
    var maze;
    var npc;
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

        maze = new  Maze(THREE, size);
        npc = new Npcs(THREE, size);
        collisions = new Collisions(THREE, size);
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0xffffff, 0, 750);

        maze.addCubes(scene, camera, false);
        npc.addNpcs(scene, camera, false);

        maxNpcs = npc.npcList.length;

        readDataBase();
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

        gridX = Math.abs(Math.round(position.x / size));
        gridZ = Math.abs(Math.round(position.z / size));

        $('#mazeX').html(gridX);
        $('#mazeZ').html(gridZ);

        $('#alive').html(npc.npcList.length);
        $('#dead').html(npc.dead);

        $('#npcs').empty();

        for (var i = 0; i < npc.npcList.length; i++) {
            $('#npcs').append('<li>' + npc.npcList[i] +
                '</li>');
        }

    }

    function animate() {
        requestAnimationFrame(animate);

        var xAxis = new THREE.Vector3(1, 0, 0);
        collisions.collisionDetection(controls, maze.cubes, raycaster);

        controls.isOnObject(false);

        var controlObject = controls.getObject();
        var position = controlObject.position;


        collisions.collisionDetection(controls, maze.cubes, raycaster);

        foundNpc = collisions.npcDetection(gridX, gridZ, npc.npcList);
        drawText(position);

        if (foundNpc) {
            $('#eliminate').html('Found ' + Score.npcData[0].npc_name + ' at = ' + gridX + ' and ' + gridZ);
            if(npc.dead < npc.maxNpcs){
                npc.dead ++;
            }else{
                npc.dead = npc.maxNpcs;
            }

            npc.removeNpc(gridX, gridZ, scene);
        }
        // Move the camera
        controls.update();

        renderer.render(scene, camera);
    }

    function addLights() {
        var light = new THREE.DirectionalLight(0xffffff, 1.5);
        light.position.set(1, 1, 1);
        scene.add(light);
        light = new THREE.DirectionalLight(0xffffff, 0.75);
        light.position.set(-1, -0.5, -1);
        scene.add(light);
    }

    //read npcObjects data from database
    function readDataBase () {
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

    return Control;
});
