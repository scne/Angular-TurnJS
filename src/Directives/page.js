(function(){

    var isTemplateGiven = false;



	var pageDir = function () {
		var dir = {
            restrict: 'E',
            scope: {},

            compile: function (scope, element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                        if("ngbTemplate" in attrs){
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        }
                    },
                    post: function (scope, element, attrs) {
                        isTemplateGiven = false;
                        if("ngbTemplate" in attrs){
                            isTemplateGiven = true;
                            dir.templateUrl = function (element, attrs) {

                                return attrs.ngbTemplate;
                            }
                        } else {
                            isTemplateGiven = false;
                        }
                        console.log(" ");
                    }
                }
            }
        }

        if(isTemplateGiven){
            dir.templateUrl = function (element, attrs) {
                    return attrs.ngbTemplate;
            }
        }

        console.log(dir);
        return dir;

	}	
	angular.module("angularTurn").directive('page', pageDir);
})();