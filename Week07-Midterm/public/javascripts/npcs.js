/**
 * Created by bcuser on 10/26/16.
 */
define(function() {
    'use strict';

    var baseName = 'npc';
    var THREE;

    Npcs.prototype.npcList = [];
    Npcs.prototype.npcCoordinates = [];

    function Npcs(threeInit) {
        THREE = threeInit;
    }

    Npcs.prototype.createNpc = function(scene, camera, wireFrame, x, z, size) {
        var geometry = new THREE.SphereGeometry(10, 40, 25);
        var material = new THREE.MeshNormalMaterial({
            wireframe: wireFrame
        });

        var sphere = new THREE.Mesh(geometry, material);
        sphere.overdraw = true;
        sphere.position.set(x, size / 2, z);

        sphere.name = getName(baseName, x, z);

        scene.add(sphere);

        return sphere;
    };

    function getName(baseName, x, z) {
        return baseName + '_' + x + '_' + z;
    }

    Npcs.prototype.removeNpc = function(x, z, scene, gridNpc) {
        gridNpc[x][z] = 0;
        var objectName = getName(baseName, x, z);
        var selectedObject = scene.getObjectByName(objectName);
        var index = this.npcList.indexOf(selectedObject);
        this.npcList.splice(index, 1);
        scene.remove(selectedObject);
    };


    return Npcs;
});
