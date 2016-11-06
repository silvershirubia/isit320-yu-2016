/**
 * Created by bcuser on 11/6/16.
 */
define(function () {
    'use strict';

    var cubes = [];
    var mazeGrid;
    var size;
    var THREE;

    Maze.prototype.cubes = cubes;
    function Maze(threeInit, cSize) {
        THREE = threeInit;
        size = cSize;
    }

    Maze.prototype.addCubes = function(scene, camera, wireFrame) {

        var loader = new THREE.TextureLoader();
        var floorTexture = loader.load('images/crate.jpg');

        $.getJSON('grid000.json', function(grid) {
            mazeGrid = grid;
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] === 1) {

                        addCube(scene, camera, false, i * size, -j * size, floorTexture);

                    }
                }
            }

        });

        //database.readDataBase();
        //readDataBase();

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

    return Maze;
});