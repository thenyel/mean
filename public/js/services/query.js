/**
 * @license AngularJS v1.0.7
 * (c) 2010-2012 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {
'use strict';

/**
 * @ngdoc overview
 * @name ngResource
 * @description
 */

angular.module('query', ['ng']).

  factory('Query', ['$http', function($http) {

    var noop = angular.noop,
        forEach = angular.forEach,
        extend = angular.extend,
        copy = angular.copy,
        isFunction = angular.isFunction;


      function Query(url, httpParams, config){

        var defaultParams = httpParams ||
          {
            method: 'GET',
            url: url,
            params: {},
            cache: false
          };

        this.httpParams = extend({}, defaultParams, httpParams);
        this.config = extend({}, config);

        this.data = [];

        /**
         * Filter properties
         */
        this.limit = 15;
        this.filters = {};

        /**
         * Paging properties
         */
        this.page = 1;
        this.pages = 1;
        this.count = 0;

        /**
         * Sorting properties
         */
        this.sortBy = '';
        this.sortAsc = true;


      }

      /**
       * Main Query/Find Function
       */
      Query.prototype.find = function (params) {

        var self = this,
            params = {limit: this.limit, page: this.page};

        // Filters/Conditions
        if (!$.isEmptyObject(this.filters)) {
          $.each(this.filters, function (prop, val) {
            params['q_'+prop] = val;
          });
        }

        // Sorting
        if (this.sortBy) {
          params.sort = this.sortBy;
          params.sortAsc = !!this.sortAsc ? '' : '-';
        }

        // Build url query
        this.httpParams.data = {name: 'Ch'};
        this.httpParams.url = this.httpParams.url.split('?')[0] + '?' + $.param(params);

        $http(this.httpParams).then(function(response) {

              var data = response.data;

              if (data) {

                // Instantiate a model for every record returned
                if (self.config.useModel) {
                  self.data = [];
                  $.each(data.data, function (i, dt) {
                    self.data.push(new self.config.useModel(dt));
                  });
                } else {
                  self.data = data.data;
                }

                self.count = data.count;
                self.pages = Math.ceil(data.count / self.limit);
              }

              // do success callback
              (self.success||noop)(response)

          }, (self.error||noop));

      }
      
      /**
       * Request for a sorted result
       * @param  {string} field     property/field to be sorted
       * @param  {mixed} direction  true | 'asc' = ascending
       *                            else   = descending
       * @return {array}           result set
       */
      Query.prototype.sort = function (prop, direction) {
        this.sortBy = prop || this.sortBy;
        this.sortAsc = typeof direction === 'undefined'
          ? !this.sortAsc
          : direction === true || direction === 'asc';

        this.find();
      }


      /**
       * Move page number for server side pagination
       * @param  {number} pageNum page to move to
       * @return {array}         resultset
       */
      Query.prototype.movePage = function (pageNum) {
        if (~~pageNum > 0 && ~~pageNum <= this.pages) {
          this.page = pageNum;
          this.find();
        }
      }

      /**
       * Move to next page
       * @return {array} Resultset
       */
      Query.prototype.next = function () {
        this.movePage(this.page + 1);
      }
      
      /**
       * Move to previous page
       * @return {array} ResultSet
       */
      Query.prototype.prev = function () {
        this.movePage(this.page - 1);
      }
      
      /**
       * Returns a range of pages
       */
      Query.prototype.getPages = function () {

        function range (a, b, step){
            var A= [];
            if(typeof a== 'number'){
                A[0]= a;
                step= step || 1;
                while(a+step<= b){
                    A[A.length]= a+= step;
                }
            }
            else{
                var s= 'abcdefghijklmnopqrstuvwxyz';
                if(a=== a.toUpperCase()){
                    b=b.toUpperCase();
                    s= s.toUpperCase();
                }
                s= s.substring(s.indexOf(a), s.indexOf(b)+ 1);
                A= s.split('');        
            }
            return A;
        }

        return range(1, this.pages);

      }

      return Query;


  }]);


})(window, window.angular);