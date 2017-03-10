// JavaScript Documentvar 

var ant = (function(obj) {
	
	'use strict';
	/* TODO chk if ant exist */
	
var Parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
	//console.log('result:',result,'req:',req);
    return [result, req];
  };
// oparam is object ...
// oparam = {odata,timeout,async,ftimeout,fsucces,ferror,falways,floadstart,fprogres,faborted,fgetRespHeader,eherror}
// ferror is http error, if not 200 and all that... blah bla
obj.ajax = function ajaxF(url,oparam) {
    // Must encode data
	var x;//xhr
	var req,timeout,contentType,data;
	
	data = oparam.data || "";

    if(data && typeof(data) === 'object') {
        var y = '', e = encodeURIComponent,k;
        for (k in data) {
            y += '&' + e(k) + '=' + e(data[k]);
        }
        data = y.slice(1) + (! cache ? '&_t=' + new Date() : '');
    }

    try {
        x = new(XMLHttpRequest || ActiveXObject)('MSXML2.XMLHTTP.3.0');
        x.open(data ? 'POST' : 'GET', url,(oparam.async || true) );
	     timeout = oparam.timeout || 5000;// default 5s ???
        x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        x.setRequestHeader('Content-type', (oparam.contentType || "application/x-www-form-urlencoded") );
		
		//if(oparam.falways){oparam.falways();}		
 x.onreadystatechange = function () {
	 		
			if(oparam.getRespHeader){
	 		  if(this.readyState === this.HEADERS_RECEIVED) {
   				 oparam.getRespHeader( x.getAllResponseHeaders() );
  				}
			}
	 		
            if (x.readyState === 4) { 
			//callback && callback(x.responseText);
			req = Parse(x);
    		
			if (!(x.status >= 200 && x.status < 300)) {
					if(oparam.error){oparam.error();console.log('error-http-response');}
					}
				}
				
			};	// end onreadystatechange

	if(x) {
			if(oparam.success){x.onload = function(){oparam.success(req[0]);};}
			if(oparam.loadstart) {x.onloadstart = function () {oparam.loadstart();};}
			if(oparam.progress) {x.onprogress = function (event) {oparam.progres(event.loaded,event.size);};}
			if(oparam.timeout){x.ontimeout = function(e) {oparam.timeout(e);};}
			if(oparam.aborted) {x.onabort = function () {oparam.aborted();console.log('** The request was aborted');};}
			if(oparam.eherror){x.onerror = function(e) {oparam.eherror();};}		
		}
	

    x.send(data);
	if(oparam.always){oparam.always();}	
		return x;
    } catch (e) {
        window.console && console.log(e);
    }
	
};
  return obj; // return the extended object

}( ant || {} )); // 