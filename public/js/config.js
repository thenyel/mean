//Setting up route
window.app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.

        // Articles
        when('/articles', {
            templateUrl: 'views/articles/list.html'
        }).
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).

        // PRoducts
        when('/products', {
            templateUrl: 'views/products/list.html'
        }).
        when('/products/create', {
            templateUrl: 'views/products/create.html'
        }).
        when('/products/:productId/edit', {
            templateUrl: 'views/products/edit.html'
        }).
        when('/products/:productId', {
            templateUrl: 'views/products/view.html'
        }).

        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
window.app.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);