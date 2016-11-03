/**
 * Created by bcuser on 11/2/16.
 */
define(['runQuery'], function (runQuery) {
    var nameController = function (query, data) {
        'use strict';

        var debug = $('#debug');
        var docs = $('#docs');
        // YOU WRITE THE REST OF THE CODE
        // YOU NEED TO HANDLE WHAT HAPPENS WHEN
        // EITHER THE databaseName METHOD IS CALLED
        // OR WHEN THE allDbs METHOD IS CALLED
        // VERY SIMILAR TO queryController, but simpler.
        if(query === '/databaseName'){
            debug.html(data.currentDatabaseName);
        }
    };

    nameController.databaseName = function ($q) {
        'use strict';
        return runQuery('/databaseName', $q);
    };

    nameController.allDbs = function ($q) {
        'use strict';
        return runQuery('/listDb', $q);
    };

    return nameController;
});