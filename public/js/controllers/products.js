function ProductsController($scope, $routeParams, $location, Global, Product, Query) {

    $scope.global = Global;

    $scope.products = new Query('/products');
    $scope.products.find();
    t = $scope.products

    // $scope.create = function() {
    //     var article = new Article({
    //         title: this.title,
    //         content: this.content
    //     });
    //     article.$save(function(response) {
    //         $location.path("articles/" + response._id);
    //     });

    //     this.title = "";
    //     this.content = "";
    // };

    // $scope.remove = function(article) {
    //     article.$remove();

    //     for (var i in $scope.articles) {
    //         if ($scope.articles[i] == article) {
    //             $scope.articles.splice(i, 1);
    //         }
    //     }
    // };

    // $scope.update = function() {
    //     var article = $scope.article;
    //     if (!article.updated) {
    //         article.updated = [];
    //     }
    //     article.updated.push(new Date().getTime());

    //     article.$update(function() {
    //         $location.path('articles/' + article._id);
    //     });
    // };

    // $scope.find = function(query) {
    //     Product.query(query, function(products) {
    //         $scope.products = products;
    //     });
    // };

    // $scope.findOne = function() {
    //     Article.get({
    //         articleId: $routeParams.articleId
    //     }, function(article) {
    //         $scope.article = article;
    //     });
    // };

}