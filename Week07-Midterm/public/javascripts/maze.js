/**
 * Created by bcuser on 11/6/16.
 */
define(function () {
    'use strict';

    var cubes = [];
    var gridMaze;
    var size;
    var THREE;

    Maze.prototype.cubes = cubes;
    Maze.prototype.maxSquares = 0;

    function Maze(threeInit, cSize) {
        THREE = threeInit;
        size = cSize;
    }

    Maze.prototype.addCubes = function(scene, camera, wireFrame) {

        var loader = new THREE.TextureLoader();
        var floorTexture = loader.load('images/crate.jpg');

        $.getJSON('grid000.json', function(grid) {
            gridMaze = grid;
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] === 1) {

                        addCube(scene, camera, false, i * size, -j * size, floorTexture);

                    }else{
                        Maze.prototype.maxSquares++;
                    }
                }
            }

        });

    }

    Maze.prototype.explored = function (x, z) {

        if(gridMaze[x][z] === 0){
            Maze.prototype.maxSquares --;
            gridMaze[x][z] = 1;
        }

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

    return Maze;
});