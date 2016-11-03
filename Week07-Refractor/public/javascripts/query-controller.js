/**
 * Created by bcuser on 11/2/16.
 */
define(['runQuery'], function (runQuery) {
    'use strict';

    var queryController = function (query, result) {
        'use strict';
        var $scope = $('#debug');
        var docs = $('#docs');
        docs.empty();
        if (result.ok) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = 'It worked';
        } else if (result.requestFailed) {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = JSON.stringify(result.requestFailed, null, 4);
        } else if (result.error) {
            //YOUR CODE HERE  PUTS INFO IN $scope AND/OR docs
            $scope.result = 'Error';
        } else {
            //YOUR CODE HERE PUTS INFO IN $scope AND/OR docs
            $scope.result = result;
        }

        docs.html();//YOUR CODE HERE PUTS INFO IN docs
    };

    queryController.delete = function($q) {
        'use strict';
        return runQuery('/deleteDb', $q);
    };

    queryController.create = function($q) {
        'use strict';
        return runQuery('/createDb', $q);
    };

    queryController.npcsBulk = function($q) {
        'use strict';
        return runQuery('/insertBulk?fileName=Npcs.json', $q);
    };

    queryController.npcsOneDoc = function($q) {
        'use strict';
        return runQuery('/insertFile?fileName=Npcs.json&id=oneDoc', $q);
    };

    queryController.design = function($q) {
        'use strict';
        return runQuery('/designDoc', $q);
    };

    queryController.viewBulk = function($q) {
        'use strict';
        return runQuery('/viewBulk?designDoc=npcs&view=docBulk', $q);
    };

    queryController.readOne = function($q) {
        'use strict';
        return runQuery('/read?docName=npcObjects', $q);
    };

    queryController.viewOneDoc = function($q) {
        'use strict';
        return runQuery('/viewOneDoc?designDoc=npcs&view=docNpcObjects', $q);
    };

    queryController.viewBulkAngular = function($q) {
        'use strict';
        return runQuery('/viewNpcSecurityAngular?designDoc=npcs&view=docNpcSecurity', $q);
    };

    return queryController;
});