(function(){

    var coverContents =[];
    var pageContents = [];
    var isTemplateGiven = false;
    
    var setBookContentFromInnerHTML = function ($filter) {
        console.log($(document.getElementsByTagName("cover")));
        console.log($(document.getElementsByTagName("page")));

        angular.forEach($(document.getElementsByTagName("cover")), function (value,key) {
            angular.forEach(value.childNodes, function (innerElement,key) {
                if( innerElement.nodeName!="#text"){
                    coverContents.push(innerElement);
                }
            });
        })

        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
           //pageContents.push($filter('filter')(value.childNodes,"div")[0]); //retriving main div wrapper of each page html content
            angular.forEach(value.childNodes, function (innerElement,key) {
                if( innerElement.nodeName!="#text"){
                    pageContents.push(innerElement);
                }
            });
        });

        $("book").replaceWith($('<div id="flipbook"></div>'));

        var bookdiv = $(document.getElementById("flipbook"));
        console.log(coverContents);

        if (coverContents.length!=0){
            console.log("cover");
            bookdiv.append($('<div class="hard"></div>').append(coverContents[0]));
            bookdiv.append($('<div class="hard"></div>').append(coverContents[1]));
            console.log(pageContents);
            angular.forEach(pageContents,function(value,key){
                bookdiv.append(value);
            });
            bookdiv.append($('<div class="hard"></div>').append(coverContents[2]));
            bookdiv.append($('<div class="hard"></div>').append(coverContents[3]));
        }

        else{
            console.log("NO Cover Page");
            console.log(pageContents);
            angular.forEach(pageContents,function(value,key){
                bookdiv.append(value);
            });
        }
        console.log(bookdiv);
    }
    
    var setBookContentFromTemplate = function ($filter) {
        console.log($(document.getElementsByTagName("page")));
        angular.forEach($(document.getElementsByTagName("page")), function(value,key){
            pageContents.push($filter('filter')(value.childNodes,"div")[0]); //retriving main div wrapper of each page html content
        });
        $("book").replaceWith($('<div id="flipbook"></div>'));
        var bookdiv = $(document.getElementById("flipbook"));
        console.log(pageContents);
        angular.forEach(pageContents,function(value,key){
            bookdiv.append(value);
        });
    }

    var applyTurnStyles = function (attrs) {
        $("#flipbook").turn({
            width: attrs.ngbWidth,
            height: attrs.ngbHeight,
            autoCenter: attrs.ngbAutocenter
        });
    }

	var bookDir = function($filter){
		return {
            restrict: 'E',
			link: function(scope, element, attrs) {
			},

            compile: function (element, attrs) {
                return {
                    pre: function (scope, element, attrs) {
                    },
                    post: function (scope, element, attrs) {


                        if(isTemplateGiven){
                            //setBookContentFromTemplate($filter)
                            console.log(element.html());
                        } else {
                            setBookContentFromInnerHTML($filter);
                        }

                        applyTurnStyles(attrs);

                    }
                }
            }
        }
	}
	angular.module("angularTurn").directive('book', bookDir);
})();

	