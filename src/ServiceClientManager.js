function ServiceClientManager() {
    var baseAPI = 'https://jsonplaceholder.typicode.com/';

    var _serviceDefinition = {
        retrieveListAlbum: retrieveListAlbum,
        retrieveListPhoto: retrieveListPhoto,
        retrieveDetailPhoto: retrieveDetailPhoto
    }

    function callService(serviceUrl, successCallback, errorCallback) {
        var promise = fetch(serviceUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                successCallback(json);
            })
            .catch(function (error) {
                errorCallback(error);
            });

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