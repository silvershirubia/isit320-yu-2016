/**
 * Created by bcuser on 10/26/16.
 */
define(function() {
    'use strict';

    var baseName = 'npc';
    var gridNpc;
    var size;
    var THREE;

    Npcs.prototype.npcList = [];
    Npcs.prototype.dead = 0;
    Npcs.prototype.maxNpcs = 0;

    function Npcs(threeInit, npcSize) {
        size = npcSize;
        THREE = threeInit;
    }

    var createNpc = function(scene, camera, wireFrame, x, z) {
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

    Npcs.prototype.addNpcs = function(scene, camera, wireFrame) {
        $.getJSON('npcs000.json', function(grid) {
            gridNpc = grid;
            for (var i = 0; i < grid.length; i++) {
                for (var j = 0; j < grid[i].length; j++) {
                    if (grid[i][j] !== 0) {
                        Npcs.prototype.maxNpcs++;
                        Npcs.prototype.npcList.push([i, j]);
                        createNpc(scene, camera, wireFrame, i * size, -j * size);
                    }
                }
            }
        });
    };

    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    Npcs.prototype.removeNpc = function(x, z, scene) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = 0; //this.npcList.indexOf(selectedObject);//didn't work for me

        for (var i = 0; i < this.npcList.length; i++) {
            if (this.npcList[i][0] === x && this.npcList[i][1] === z) {
                index = i;
            }
        }

        this.npcList.splice(index, 1);
        scene.remove(selectedObject);

    };

    return Npcs;
});
