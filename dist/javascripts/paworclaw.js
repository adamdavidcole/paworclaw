!function(){var t=angular.module("paworclaw",["ngAnimate"]);t.directive("httpPrefix",function(){return{restrict:"A",require:"ngModel",link:function(t,e,n,s){function o(t){return t&&!/^(http):\/\//i.test(t)&&-1==="http://".indexOf(t)?(s.$setViewValue("http://"+t),s.$render(),"http://"+t):t}s.$formatters.push(o),s.$parsers.push(o)}}}),t.controller("controller",["$window","$scope","$http","$timeout",function(t,e,n,s){function o(t){for(var e,n,s=t.length;0!==s;)n=Math.floor(Math.random()*s),s-=1,e=t[s],t[s]=t[n],t[n]=e;return t}e.justOpened=!0,e.showAddPet=!1,e.isUpvote=!0,e.pets=[user1],e.testrepeat=[{img:"images/pet.jpg"},{img:"images/cat.jpg"},{img:"images/husky.jpg"}],this.loadPets=function(){n.get("/users").success(function(t){e.pets=t;t[0];e.pets=o(e.pets),e.index=0}).error(function(){console.log("fail")})},e.updatePet=function(t){n.post("/users/update",t).success(function(){console.log("user posting")}).error(function(){console.log("failed to post")})},this.loadPets(),e.currPet=user1,this.getPercantage=function(t){var e=t.upvotes/(t.upvotes+t.downvotes);return Math.round(100*e)},this.getHashtagString=function(t){for(var e="",n=0;n<t.hashtags.length;n++)e+="#"+t.hashtags[n]+" ";return e=e.trim()},this.next=function(){e.index++,e.index>=e.pets.length&&(e.index=0),e.currPet=e.pets[e.index],$("body").css("background-image","url("+e.currPet.imageurl+")")},this.upvote=function(){e.currPet.upvotes++,e.currPet._id&&e.updatePet(e.currPet),e.isUpvote="upvote",this.next()},this.downvote=function(){e.currPet.downvotes++,e.currPet._id&&e.updatePet(e.currPet),e.isUpvote="downvote",this.next()},s(function(){e.justOpened=!1},5e3),$(".addpet-container").click(function(t){t.stopPropagation()}),$("html").click(function(){e.$apply(function(){e.showAddPet=!1})}),this.add=function(t){var n={},s=!0;if(t.name?n.name=t.name.trim():s=!1,n.bio=t.bio?t.bio.trim():"",t.imageurl&&e.isImageURl(t.imageurl)?n.imageurl=t.imageurl.trim():(s=!1,console.log("invalid image url")),n.upvotes=1,n.downvotes=1,n.hashtags=[],t.hashtags){t.hashtags=t.hashtags.split(" ");for(var o=0;o<t.hashtags.length;o++)t.hashtags[o].length<2||"#"===t.hashtags[o].substring(0,1)&&(n.hashtags[o]=t.hashtags[o].substring(1,t.hashtags[o].length))}s?(e.updatePet(n),e.currPet=n,e.pets.splice(e.index+1,0,n)):console.log("invalid entry"),e.showAddPet=!1,e.form={},this.next()},e.isImageURl=function(t){if(!t||t.length<=3)return console.log("url link too short"),console.log(t),!1;var e=t.substring(t.length-4,t.length);return console.log(e),".jpg"!==e&&".png"!==e&&".gif"!==e?!1:!0},this.printThese=function(t,e){console.log("sindex: "+t),console.log("index: "+e)}}])}();