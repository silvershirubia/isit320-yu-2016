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
            string = 'It worked';
            if(result.data){
                string += JSON.stringify(result.data, null, 4);
            }
            $scope.html(string);

        } else if (result.requestFailed) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.html('Database : ' + JSON.stringify(result.requestFailed, null, 4));
            docs.html(result.requestFailed.description);
        } else {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.html(JSON.stringify(result, null, 4));
        }

        //docs.html('Docs result: ' + JSON.stringify(result.data, null, 4));
        docs.html(JSON.stringify(result.docs, null, 4)); //YOUR CODE HERE PUTS INFO IN docs
    };

    var home = '/home/ubuntu/Git/isit320-yu-2016/DataMaster/';

    queryController.delete = function($q) {
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        return runQuery('/createDb', $q);
    };

    queryController.npcsBulk = function($q) {
        return runQuery('/insertBulk?fileName=' + home + 'Npcs.json', $q);
    };

    queryController.npcsOneDoc = function($q) {
        return runQuery('/insertFile?fileName=' + home + 'Npcs.json&id=oneDoc', $q);
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
