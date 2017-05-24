import jquery from 'jquery';

function ServiceClientManager() {
    var baseAPI = 'https://jsonplaceholder.typicode.com/';

    var _serviceDefinition = {
        retrieveListAlbum: retrieveListAlbum,
        retrieveListPhoto: retrieveListPhoto,
        retrieveDetailPhoto: retrieveDetailPhoto
    }

    function callService(serviceUrl, successCallback, errorCallback) {
        var promise = jquery.ajax(serviceUrl)
            .done(OnSuccess)
            .fail(OnError);

        function OnSuccess(result) {
            return successCallback(result);
        }

        function OnError(result) {
            return errorCallback(result);
        }

        return promise;
    }

    function retrieveListAlbum(successCallback, errorCallback) {
        var serviceUrl = baseAPI + 'albums';
        return callService(serviceUrl, successCallback, errorCallback);
    }

    function retrieveListPhoto(albumId, successCallback, errorCallback) {
        var serviceUrl = baseAPI + 'photos?albumId=' + albumId;
        return callService(serviceUrl, successCallback, errorCallback);
    }

    function retrieveDetailPhoto(photoId) {
        throw 'not implemented yet!';
    }

    return _serviceDefinition;
};

export default new ServiceClientManager();