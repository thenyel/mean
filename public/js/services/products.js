//Articles service used for articles REST endpoint
window.app

.factory("Product", function($resource) {
    return $resource('products/:productId', {
        productId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
});