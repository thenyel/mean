window.app

	.directive('qPaginator', [function() {
	  'use strict';
	  return {
	    restrict: 'A',
	    replace: true,
	    scope: {query:'=qPaginator'},
	    template: '<div ng-paginate class="pagination" ng-hide="query.pages < 2"><ul>'
	              +'<li ng-class="{disabled: query.page==1}"><a ng-click="query.prev()"><i class="icon-chevron-left"></i> Prev</a></li>'
	              +'<li ng-repeat="page in query.getPages()" ng-class="query.page == page && \'active\' || \'\'"><a ng-click="query.movePage(page)">{{page}}</a></li>'
	              +'<li ng-class="{disabled: query.page==query.pages}"><a ng-click="query.next()">Next <i class="icon-chevron-right"></i></a></li>'
	              +'</ul></div>',
	    link: function(scope, element, attrs) {
	    }
	  };
	}])


	.directive('scopeDemo', [function() {
	  'use strict';
	  return {
	    restrict: 'A',
	    replace: true,
	    scope: {},
	    template: '<div class="span3 well"> <input ng-model="name" class="input-small" /><br>Name:{{name}} </div>',
	    link: function(scope, element, attrs) {
	    }
	  };
	}])


	.directive('calc', [function() {
	  'use strict';
	  return {
	    restrict: 'A',
	    replace: true,
	    templateUrl: 'views/directives/calc.html',
	    link: function(scope, element, attrs) {
	    	scope.num = '';

	    	scope.input = function (n) {
	    		scope.num += n;
	    	}
	    }
	  };
	}])


;