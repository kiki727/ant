// JavaScript Document
/* 
FOR MY FRIEND ,WHO LOVE WEB DESIGN, BUT JS IS PAINFUL TO HIM, EVEN JQUERY??? 
THIS IS WHAT HE ASK FROM ME TO BUILD,THAT FUNCTIONS HE USE A LOT.gOAL IS TO SIMPLIFY TASKS FOR HIM.
THIS IS NOT FRAMEWORK,THIS IS SET OF FUNCTIONS TO SIMPLIFY SOME TASKS IN SCRIPTING.(SORRY FOR MY BAD ENGLISH).
 - from Kiki 2016.
*/
//String.prototype.trim = function(){"use strict";return this.replace(/^s+|s+$/g, "");};
/* ----- define ant object, there two ways to do so --------*/
/*  var ant = ant || {};   (this is one way... down is other,more specific) */
var ant;
if (ant === undefined || typeof ant !== 'object') {
  ant = {};
  //var ant = new Object();
}
/* ----------- end define ant ------------------------ */


/* ---- now fill ant with functions(ant is actualy namespace in this case,and obj at same time .... ----- */
ant = (function () {
	
"use strict";

var rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
};

var getAbsoluteUrl = function(url,a) {
		if(!a) {a = document.createElement('a');}
		a.href = url;

		return a.href;
	};

/* edge,ie do it diferent, so i borow this from Todd... https://toddmotto.com/ */
// foreach is basicly slower than for loop,(for now,i asume it will be optimize in future...),so use for loop is recomended...
 var forEach = function (array, callback, scope) {
	 //var l = array.length;
  for (var i = 0; i < array.length; i++) {
    callback.call(scope, i, array[i]); // passes back stuff we need
  }
};
/*
forEach(myNodeList, function (index, value) {
    console.log(index, value); // passes index + value back!
});
*/

/* events */
var  EventHandler =  {

    bind:function(el, ev, fn){
        if(window.addEventListener){ // modern browsers including IE9+
            el.addEventListener(ev, fn, false);
        } else if(window.attachEvent) { // IE8 and below
            el.attachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = fn;
        }
    },
 
    unbind:function(el, ev, fn){
        if(window.removeEventListener){
            el.removeEventListener(ev, fn, false);
        } else if(window.detachEvent) {
            el.detachEvent('on' + ev, fn);
        } else {
            el['on' + ev] = null; 
        }
    },
 
    stop:function(ev) {
        var e = ev || window.event;
        e.cancelBubble = true;
        if (e.stopPropagation) {e.stopPropagation();}
    }
};

var addEh = function(sel,ev,fn) {
	var x = getElements(sel);
			forEach(x,function(index,value) {
				EventHandler.bind(value,ev,fn);
					});
	};

var removeEh = function(sel,ev,fn) {
	var x = getElements(sel);
			forEach(x,function(index,value) {
				EventHandler.unbind(value,ev,fn);
					});
	
	};
/*
var eventStop = function(ev) {
	EventHandler.stop(ev);
};
  */
/* end events */  

	
var getElements = function (id) {
  if (typeof id === "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};

var styleElement = function (element, prop, val) {
  element.style.setProperty(prop, val);
};

var addStyle = function (sel,prop) {
	var elements = getElements(sel);
  	var i, l;
	l = elements.length;
	  for (i = 0; i < l; i+=1) {  
		
		//var obj = {a: 1, b: 2, c: 3};
			for (var p in prop) {
  			//console.log('prop.' + p, '=', prop[p]);
			elements[i].style.setProperty(p, prop[p]);
					}
	  }
};

var remAllStyle = function (sel) {
var elements = getElements(sel);
var i, l;
l = elements.length;
  for (i = 0; i < l; i+=1) {    
   elements[i].removeAttribute("style");
  }
};

var hide = function (sel) {
  var elements = getElements(sel);
  var i, l = elements.length;
  for (i = 0; i < l; i+=1) {
    styleElement(elements[i], "display", "none");
  }
};

var show = function (sel) {
  var elements = getElements(sel);
  var i, l;
  l = elements.length;
  for (i = 0; i < l; i+=1) {
    styleElement(elements[i], "display", "block");
  }
};

var addClass = function (sel, name) {
	var elements = getElements(sel);
	 var i,e, arr1, arr2, l;
	 l = elements.length;
  for (i = 0; i < l; i+=1) {
		  arr1 = elements[i].className.split(" ");
		  arr2 = name.split(" ");
		  for (e = 0; e < arr2.length; e+=1) {
			if (arr1.indexOf(arr2[e]) === -1) {elements[i].className += " " + arr2[e];}
		  }
  }
};


var removeClass = function (sel, name) {
	var elements = getElements(sel);
	
	/* if name empty string remove all class*/
	if (name === "" || name === " " || (typeof name === 'undefined')) {
		forEach(elements,function(index,value) {
    			//element.removeAttribute("class");
				value.className = '';
					});
		} else {
	
	
	var i, e, arr11, arr22, l;
	l = elements.length;
  		for (i = 0; i < l1; i+=1) {
			  arr11 = elements[i].className.split(" ");
			  arr22 = name.split(" ");
			  for (e = 0; e < arr22.length; e+=1) {
				while (arr11.indexOf(arr22[e]) > -1) {
				  arr11.splice(arr11.indexOf(arr22[e]), 1);     
				}
			  }
			  elements[i].className = arr11.join(" ");
  		}
	}
};

var removeStyle = function(sel,prop) {
	var elements = getElements(sel);// array
	var i,k,l;
	l = elements.length;
	for (i = 0; i < l; i+=1) {
		for (k = 0; k < prop.length; k +=1 )
		{
			elements[i].style.removeProperty(prop[k]);
		}
	}

};
// ant.setAttrib('#id,p,#id2,.class1',{ 'atribname':'value','atrib':'value', .... })
var setAttrib = function (sel,prop) {
	var i,l;
	var elements = getElements(sel);
	l = elements.length;
	for (i = 0; i < l; i+=1) {
		
			for (var p in prop) {
  			console.log('prop.' + p, '=', prop[p]);
			elements[i].setAttribute(p, prop[p]);
			}
	}
};

var empty = function (sel) {
	var i,l;
	var elements = getElements(sel);
	l = elements.length;
	for (i = 0; i < l; i+=1) {
		var wrap = elements[i];
		while(wrap.firstChild) {	wrap.removeChild(wrap.firstChild);}
	}
};
 /* return functions syntax is ant.fnc(atributes) ...  look down on how to section ...*/ 
  return {
   rand:rand,
   getAbsoluteUrl:getAbsoluteUrl,
   getElements:getElements,
   addStyle:addStyle,
   removeStyle:removeStyle,
   remAllStyle:remAllStyle,
   hide:hide,
   show:show,
   addClass:addClass,
   removeClass:removeClass,
   addEh:addEh,
   removeEh:removeEh,
   empty:empty,
   setAttrib:setAttrib
  };
  
//eventStop:eventStop
})();

/* end of ant module -object-namespace whatever u prefer ... */


/*
------------------EXAMPLES------------------------

ant.empty('#id1 #id2 p'); empty all child elements from id el. or elments...
ant.remAllStyle('p');--- remove all stile from all p elem.
ant.remAllStyle('#test #id2 div'); - remove all style from  elem.-id-test, and other elements u provided as attribute to fnc.
or ant.setAttrib('#id',{ 'style':''}) -> empty style from #id,style is now emptystring.
or in vanilla.js > el.removeAttribute('style') > remove style from element....

ant.addClass('#test1','ant-darkblue');- (id-elem,class) or ('p',class)-> all p get class....
ant.addClass('#test1','class1 class2 class3');- (id-elem,class) or ('p',class)-> all p get class....

ant.removeClass('#test1','class1 class2 class3');- remove all this classes from id-test1
ant.removeClass('#test1','');- remove all classes from id-test1
or-> ant.removeClass('#test1'); -remove all classes from id-test1

ant.addStyle('#test1',{'color':'blue','background-color':'red'}); - add som style to id-test1

ant.removeStyle('#test',['color','backgroud-color']); - remove from id-test style -color and bacground color
ant.removeStyle('p',['color']); - remove from all p elem. style color .... and so on

ant.setAttrib('#id,p,#id2,.class1',{ 'atribname':'value','atrib':'value', .... })

.......................................................................

alertfn = function(){alert('eh');};-- fnc to fire eventhandler-this is example!!!! do not be stupid

addeh = function(){ ant.addEh('p','click',alertfn)};
remeh = function(){ ant.removeEh('p','click',alertfn)};

*/