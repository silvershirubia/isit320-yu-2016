/**
 * Created by bcuser on 10/26/16.
 */
define(function() {
    'use strict';

    var baseName = 'npc';
    var gridNpc;
    var npcList = [];
    var THREE;

    Npcs.prototype.npcList = npcList;
    Npcs.prototype.living = 0;
    Npcs.prototype.dead = 0;

    function Npcs(threeInit) {
        THREE = threeInit;
    }

    var createNpc = function(scene, camera, wireFrame, x, z, size) {
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);

        var shapeX = Math.abs(x / size);
        var shapeZ = Math.abs(z / size);
        sphere.name = getName(baseName, shapeX, shapeZ);

        scene.add(sphere);

        return sphere;
    };

    Npcs.prototype.addNpcs = function (scene, camera, wireFrame, size) {
        $.getJSON('npcs000.json', function(grid) {
            gridNpc = grid;
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] !== 0) {
                        npcList.push([i, j]);
                        createNpc(scene, camera, wireFrame, i * size, -j * size, size);
                    }
                }
            }

        });
    }



    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    Npcs.prototype.removeNpc = function(x, z, scene) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = Math.abs(npcList.indexOf(selectedObject));
        npcList.splice(index, 1);
        scene.remove(selectedObject);

    };

    return Npcs;
});
