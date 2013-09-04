function ProductsController($scope, $routeParams, $location, Global, Product, Query) {

    $scope.global = Global;

    $scope.products = new Query('/products',false, {useModel: Product});
    $scope.products.find();

    $scope.newProduct = function () {
        var np = new Product();
        np._edit = np._new = true;
        $scope.products.data.unshift(np);
    }

}