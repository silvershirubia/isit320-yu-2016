/* globals define: true, THREE:true */

define(["Floors"], function(Floors){

    var scene = null;
    var camera = null;
    var renderer = null;
    var cube = null;
    var THREE = null;

    var keyMove = {
        moveForward : false,
        moveBackward : false,
        moveLeft : false,
        moveRight : false
    };

    var cameraPosition = {
        x : 2,
        y : 0,
        z : 2
    };

    function Control(threeInit) {
        THREE = threeInit;
        console.log("Control called");
        scene = new THREE.Scene();
        var width = window.innerWidth / window.innerHeight;
        camera = new THREE.PerspectiveCamera(75, width, 0.1, 1000);


        var floor = new Floors(THREE);
        floor.drawFloor(scene);

        renderer = new THREE.WebGLRenderer({
            antialias : true
        });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
        document.body.appendChild(renderer.domElement);
        cube = addCube(scene, camera, false, 1, 1);
        camera.position.z = 23;
        camera.position.x = 2;
        camera.position.y = 0;

        document.addEventListener('keydown', onKeyDown, false);
        document.addEventListener('keyup', onKeyUp, false);

        render();
    }

    var onKeyDown = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = true;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = true;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = true;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = true;
                break;
        }
    };

    var onKeyUp = function(event) {

        switch (event.keyCode) {

            case 38: // up
            case 87: // w
                keyMove.moveForward = false;
                break;

            case 37: // left
            case 65: // a
                keyMove.moveLeft = false;
                break;

            case 40: // down
            case 83: // s
                keyMove.moveBackward = false;
                break;

            case 39: // right
            case 68: // d
                keyMove.moveRight = false;
                break;
        }
    };

    function render() {
        if (keyMove.moveLeft) {
            cameraPosition.x -= 1;
        }else if(keyMove.moveRight){
            cameraPosition.x += 1;
        }else if(keyMove.moveForward){
            cameraPosition.z -= 1;
        }else if(keyMove.moveBackward){
            cameraPosition.z += 1;
        }

        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
        requestAnimationFrame(render);
        //cube.rotation.x += 0.05;
        //cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }

    function addCube(scene, camera, wireFrame, x, y) {
        var geometry = new THREE.BoxGeometry(7, 7, 7);
        var material = new THREE.MeshNormalMaterial({
            color : 0x00ffff,
            wireframe : wireFrame
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, 0, y);
        scene.add(cube);


        return cube;
    }


    return Control;
});