/**
 * Created by bcuser on 11/2/16.
 */
define(['runQuery'], function(runQuery) {
    'use strict';

    var queryController = function(query, result) {
        var $scope = $('#debug');
        var docs = $('#docs');
        var string = '';
        docs.empty();
        if (result.ok) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.html('It worked');
            string = JSON.stringify(result.data, null, 4);
        } else if (result.requestFailed) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.html('Database : ' + result.requestFailed.message);
        } else if (result.error) {
            //YOUR CODE HERE  PUTS INFO IN $scope AND/OR docs
            $scope.html('Error');
        } else {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.html(result);
        }

        //docs.html('Docs result: ' + JSON.stringify(result.data, null, 4));
        docs.html(string); //YOUR CODE HERE PUTS INFO IN docs
    };

    queryController.delete = function($q) {
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        return runQuery('/createDb', $q);
    };

    queryController.npcsBulk = function($q) {
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.npcsOneDoc = function($q) {
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.design = function($q) {
        return runQuery('/designDoc', $q);
    };

    queryController.viewBulk = function($q) {
        return runQuery('/viewBulk?designDoc=npcs&view=docBulk', $q);
    };

    queryController.readOne = function($q) {
        return runQuery('/read?docName=npcObjects', $q);
    };

    queryController.viewOneDoc = function($q) {
        return runQuery('/viewOneDoc?designDoc=npcs&view=docNpcObjects', $q);
    };

    queryController.viewBulkAngular = function($q) {
        return runQuery('/viewNpcSecurityAngular?designDoc=npcs&view=docNpcSecurity', $q);
    };

    return queryController;
});
