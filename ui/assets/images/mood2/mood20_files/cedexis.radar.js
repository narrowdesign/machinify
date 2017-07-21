/*! scripts/vendor/cedexis/cedexis.radar.js */
!function(e,t){"use strict";function r(e,t){function r(e,t){for(var r=0;r<t.largeObjectRepeatCount;r++)e.push(new o({probeTypeId:14,measurementType:t.measurementType,baseUrl:t.baseUrl,provider:t.provider,session:t.provider.session,sendReport:r===t.largeObjectRepeatCount-1}))}function i(){return e.c?{zoneId:e.c.a,customerId:e.c.b,providerId:e.c.c}:null}this.session=t,this.cacheBusting="boolean"==typeof e.a?e.a:!0;var s=e.p;if(this.zoneId=s.z,this.customerId=s.c,this.providerId=s.i,this.currentProbe=null,this.cacheNodeId="0",this.timeoutInMs="number"==typeof e.timeout?e.timeout:4e3,this.substitutionConfiguration=i(),this.probes=[],"p"in s){var n,a=s.p,u="object"==typeof a.d;a.a&&a.a.a?n=a.a.a:a.b&&a.b.a&&(n=a.b.a),n&&this.probes.push(new o({probeTypeId:1,measurementType:n.t,baseUrl:n.u,provider:this,session:t,waitForUni:u}));var p=a.d;p&&this.probes.push(new o({probeTypeId:-1,measurementType:p.t,baseUrl:p.u,provider:this,session:t}));var d,c,m="number"==typeof e.b?e.b:1;a.a?(d=a.a.b,d&&this.probes.push(new o({probeTypeId:0,measurementType:d.t,baseUrl:d.u,provider:this,session:t})),c=a.a.c,c&&r(this.probes,{largeObjectRepeatCount:m,measurementType:c.t,baseUrl:c.u,provider:this})):a.b&&(d=a.b.b,d&&this.probes.push(new o({probeTypeId:0,measurementType:d.t,baseUrl:d.u,provider:this,session:t})),c=a.b.c,c&&r(this.probes,{largeObjectRepeatCount:m,measurementType:c.t,baseUrl:c.u,provider:this}));var l=a.c;if(l){var f=this.session.window.location.protocol,v=h(f,l.u);!v||"http:"!==f&&"https"!==v||this.probes.push(new o({measurementType:w.HTML_CUSTOM,probeTypeId:2,baseUrl:l.u,provider:this,session:t}))}}}function o(e){this.provider=e.provider,this.session=e.session,this.measurementType=e.measurementType,this.probeTypeId=e.probeTypeId,this.baseUrl=e.baseUrl,this.state="unstarted",this.cancelled=!1,this.timeoutId=-1,this.probeIdSuffix="",this.sendReport="boolean"==typeof e.sendReport?e.sendReport:!0,this.waitForUni="undefined"!=typeof e.waitForUni?e.waitForUni:!1}function i(e,t){this.resultCode=e,this.measurementValue=t}function s(e){this.window=e.window,this.document=e.document,this.requestorZoneId=e.requestorZoneId,this.requestorCustomerId=e.requestorCustomerId,this.samplerId=e.samplerId,this.samplerMajorVersion=e.samplerMajorVersion,this.samplerMinorVersion=e.samplerMinorVersion,this.providersJsonpCallbackName=e.providersJsonpCallbackName,this.transactionId=this.makeTransactionId(),this.onSessionFinished=[],this.domains={init:e.initDomain||"init.cedexis-radar.net",report:e.reportDomain||"rpt.cedexis.com",providers:e.providersDomain||"radar.cedexis.com"},this.requestSignature="",this.providers=null,this.currentProvider=null,this.reportTag="0"}function n(e){this.__window=e,this.__clearManually=!1}function a(e,t){return Math.floor(Math.random()*(t-e+1))+e}function u(e,t){t=t||"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";for(var r=[],o=0;e>o;o+=1)r.push(t.charAt(a(0,t.length-1)));return r.join("")}function p(e){return"function"==typeof e}function d(e){return"undefined"!=typeof e}function c(e,t){var r=/(\d+)kb\./i,o=r.exec(t);if(o&&o[1]){var i=parseInt(o[1],10);return Math.floor(8e3*i/e)}return 0}function h(e,t){return/^http:/i.test(t)?"http":/^https:/i.test(t)?"https":/^\/\//.test(t)?e.slice(0,-1):null}function m(e){for(var t=[/opera mini/i,/skyfire/i,/teashark/i,/uzard/i,/puffin/i,/yabrowser/i,/msie (5|6|7|8)\./i],r=t.length;r--;)if(t[r].test(e.navigator.userAgent))return!0;return!1}function l(e){function t(e){var t,r;for(t=0;t<o.length;t+=1)if(r=o[t].toLowerCase(),r===e)return!0;return!1}var r={keynote:/keynote/i,gomez:/gomez/i,catchpoint:/catchpoint/i,pingdom:/pingdom/i,ip_label:/ip-label/,witbe:/witbe-/i},o=e.cedexis.radar.allowed_monitoring_agents||[];for(var i in r)if(r.hasOwnProperty(i)&&r[i].test(e.navigator.userAgent)&&!t(i))return!0;return!1}function f(e){return/radar-allow-monitors=1/.test(e.location.search)}function v(){this.__recipient=null}function g(e){this.__window=e.window;var t={window:e.window,document:e.document,samplerId:e.samplerId,samplerMajorVersion:e.samplerMajorVersion,samplerMinorVersion:e.samplerMinorVersion,providersJsonpCallbackName:e.providersJsonpCallbackName,requestorZoneId:e.requestorZoneId,requestorCustomerId:e.requestorCustomerId,providersDomain:e.providersDomain,initDomain:e.initDomain,reportDomain:e.reportDomain,sendPlt:e.sendPlt};this.__session=new s(t),this.__session.addSessionFinishedCallback(this.makeSessionFinishedCallback())}function b(){"complete"===t.readyState&&I()}function y(e,t){return"string"==typeof e?parseInt(e,10):"undefined"==typeof e&&"undefined"!=typeof t?t:e}function I(){if(e.cedexis.radar.messenger||(e.cedexis.radar.messenger=new v,function(){var t=e.cedexis.radar.messenger,r=t.makePostMessageHandler();e.addEventListener?e.addEventListener("message",r,!1):e.attachEvent("onmessage",r);var o=e.performance;o&&(r=t.makeResourceTimingBufferFullHandler(),o.addEventListener&&"undefined"!=typeof o.onresourcetimingbufferfull?o.addEventListener("resourcetimingbufferfull",r,!1):o.addEventListener&&"undefined"!=typeof o.onwebkitresourcetimingbufferfull?o.addEventListener("webkitresourcetimingbufferfull",r,!1):"undefined"!=typeof o.onresourcetimingbufferfull?o.onresourcetimingbufferfull=r:e.cedexis.radar.clearResourceTimingEntriesManually=!0)}()),!e.cedexis.radar.container){var r=e.cedexisRadarOptions||{};if(r.zoneId=y(r.zoneId,1),r.customerId=y(r.customerId),r.startDelay=y(r.startDelay,2e3),"undefined"!=typeof r.customerId){var o=e.cedexis.radar.container=new g({window:e,document:t,samplerId:"j4",samplerMajorVersion:20,samplerMinorVersion:1,providersJsonpCallbackName:"cedexis.radar.messenger.setProviders",requestorZoneId:r.zoneId,requestorCustomerId:r.customerId,providersDomain:"radar.cedexis.com",initDomain:"init.cedexis-radar.net",reportDomain:"rpt.cedexis.com",sendPlt:""in P});e.cedexis.radar.messenger.setRecipient(o),setTimeout(function(){o.init(e.cedexis.radar.clearResourceTimingEntriesManually)},r.startDelay)}}}e.cedexisRadarOptions={customerId:13960};var P={"true":!0},w={SCRIPT:1,IMAGE:2,HTML_CUSTOM:3,HTML_DYNAMIC:4,USER_SCRIPT:5,AUTO:6,UNI_AJAX:7,UNI_JSONP:8,IMAGE_DNS:9};r.prototype.beginMeasurements=function(){this.beginNextMeasurement()},r.prototype.onProbeComplete=function(e){e.abortProvider&&!e.sendReport?this.session.onProviderComplete():e.sendReport&&e.result&&(e.probe.waitForUni?(this.savedColdMeasurementData=e,this.beginNextMeasurement()):w.HTML_DYNAMIC===e.probe.measurementType?(this.reportDynamicPageMeasurement(e.result),this.session.onProviderComplete()):(this.session.onMeasurementReady({provider:this,probeTypeId:e.probe.probeTypeId,result:e.result,sendReport:e.sendReport}),0===e.result.resultCode?this.beginNextMeasurement():this.session.onProviderComplete()))},r.prototype.reportDynamicPageMeasurement=function(e){this.session.onMeasurementReady({provider:this,probeTypeId:1,result:e,sendReport:!0}),0===e.resultCode&&this.session.onMeasurementReady({provider:this,probeTypeId:0,result:e,sendReport:!0})},r.prototype.onCacheNodeIdProbeComplete=function(e){if(this.cacheNodeId=e.cacheNodeId,this.savedColdMeasurementData){if(w.HTML_DYNAMIC===this.savedColdMeasurementData.probe.measurementType)return this.reportDynamicPageMeasurement(this.savedColdMeasurementData.result),void this.session.onProviderComplete();this.savedColdMeasurementData.probe.waitForUni=!1,this.onProbeComplete({probe:this.savedColdMeasurementData.probe,result:this.savedColdMeasurementData.result,abortProvider:0!==this.savedColdMeasurementData.result.resultCode,sendReport:!0})}else this.beginNextMeasurement()},r.prototype.beginNextMeasurement=function(){0<this.probes.length?(this.currentProbe=this.probes.shift(),this.currentProbe.beginMeasurement()):this.session.measureNextProvider()},r.prototype.processWindowMessageData=function(e){if(this.currentProbe&&e.p&&e.r&&e.p.z==this.zoneId&&e.p.c==this.customerId&&e.p.i==this.providerId){var t=e.source;"uni"===t?this.currentProbe.processWindowMessageDataUNI(e):"dsa"===t&&this.currentProbe.processWindowMessageDataDynamicPage(e)}},o.prototype.isThroughput=function(){return 14===this.probeTypeId},o.prototype.beginMeasurement=function(){w.IMAGE===this.measurementType?this.measureImage():w.IMAGE_DNS===this.measurementType?this.measureImageDNS():w.HTML_DYNAMIC===this.measurementType?this.measureDynamicPage():w.UNI_AJAX===this.measurementType?this.measureUniAjax():w.UNI_JSONP===this.measurementType?this.measureUniJsonp():this.session.onProviderComplete()},o.prototype.measureUniJsonp=function(){var e=this.session.window.cedexis;if(e){var t=e.radar;if(t){t.currentUniProbe=this;var r=this.session.createWindowObject("cdx",{},!1);r.s=r.s||{},r.s.b=this.makeUniJsonpCallback(),this.session.insertScript(this.makeProbeURL(),null,this.makeUniJsonpOnerrorCallback()),this.timeoutId=this.session.window.setTimeout(this.makeUniJsonpTimeoutCallback(),this.provider.timeoutInMs)}}},o.prototype.makeUniJsonpCallback=function(){var e=this;return function(t){var r=e.session.window.cedexis;if(r){var o=r.radar;o&&(t.id!=e.provider.providerId||o.currentUniProbe!==e||e.cancelled||(e.session.window.clearTimeout(e.timeoutId),delete o.currentUniProbe,e.provider.onCacheNodeIdProbeComplete({probe:e,cacheNodeId:t.node})))}}},o.prototype.makeUniJsonpTimeoutCallback=function(){var e=this;return function(){var t=e.session.window.cedexis;if(t){var r=t.radar;r&&r.currentUniProbe===e&&(delete r.currentUniProbe,e.cancelled=!0,e.provider.onCacheNodeIdProbeComplete({probe:e,cacheNodeId:"2"}))}}},o.prototype.measureUniAjax=function(){this.browserHasAjaxUniSupport()?(this.session.insertIframe(this.makeProbeURL()),this.timeoutId=this.session.window.setTimeout(this.makeAjaxUniTimeoutCallback(),this.provider.timeoutInMs)):this.provider.onCacheNodeIdProbeComplete({probe:this,cacheNodeId:"1"})},o.prototype.makeAjaxUniTimeoutCallback=function(){var e=this;return function(){e.cancelled=!0,e.provider.onCacheNodeIdProbeComplete({probe:e,cacheNodeId:"2"})}},o.prototype.browserHasAjaxUniSupport=function(){return this.session.testQueryString(/radar-no-ajax/)?!1:p(this.session.getWindowProperty("postMessage"))&&p(this.session.getWindowProperty("addEventListener"))},o.prototype.makeTimeoutCallback=function(){var e=this;return function(){e.cancelled=!0,e.provider.onProbeComplete({probe:e,result:new i(1,0),abortProvider:!1,sendReport:!0})}},o.prototype.measureImage=function(){var e=this.session.getPerformanceObject();if(e&&"getEntriesByType"in e){var t=new Image;t.onload=this.makeImageOnloadCallback(),t.onerror=this.makeImageOnerrorCallback(),this.state="loading",this.timeoutId=this.session.window.setTimeout(this.makeTimeoutCallback(),this.provider.timeoutInMs),t.src=this.makeProbeURL()}else this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1})},o.prototype.measureImageDNS=function(){var e=this.session.getPerformanceObject();if(e&&"getEntriesByType"in e){var t=new Image;t.onload=this.makeImageDNSOnloadCallback(),t.onerror=this.makeImageOnerrorCallback(),this.state="loading",this.timeoutId=this.session.window.setTimeout(this.makeTimeoutCallback(),this.provider.timeoutInMs),t.src=this.makeProbeURL(this.makeProbeURLForDNS())}else this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1})},o.prototype.makeImageDNSOnloadCallback=function(){var e=this;return function(){e.onImageLoadDNS(this)}},o.prototype.makeImageOnloadCallback=function(){var e=this;return function(){e.onImageLoad(this)}},o.prototype.makeImageOnerrorCallback=function(){var e=this;return function(){e.onImageError()}},o.prototype.onImageError=function(){this.session.window.clearTimeout(this.timeoutId),this.cancelled=!0,this.state="error",this.provider.onProbeComplete({probe:this,result:new i(4,0),abortProvider:!1,sendReport:!0})},o.prototype.onImageLoad=function(e){if(this.session.window.clearTimeout(this.timeoutId),!this.cancelled)if(this.sendReport){var t=this.session.getResourceTimingEntry(e.src);if(t){var r;r=0<t.requestStart?this.isThroughput()?Math.round(t.responseEnd-t.requestStart):Math.round(t.responseStart-t.requestStart):Math.round(t.duration);var o=r;this.isThroughput()&&(o=c(r,this.baseUrl)),1>o?this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1}):r<=this.provider.timeoutInMs?this.provider.onProbeComplete({probe:this,result:new i(0,o),abortProvider:!1,sendReport:!0}):this.provider.onProbeComplete({probe:this,result:new i(1,0),abortProvider:!1,sendReport:!0})}else this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1})}else this.provider.onProbeComplete({probe:this,result:null,abortProvider:!1,sendReport:!1})},o.prototype.onImageLoadDNS=function(e){if(this.session.window.clearTimeout(this.timeoutId),!this.cancelled){var t=this.session.getResourceTimingEntry(e.src);if(t){var r;r=0<t.requestStart?Math.round(t.domainLookupEnd-t.domainLookupStart):Math.round(t.duration),1>r?this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1}):r<=this.provider.timeoutInMs?this.provider.onProbeComplete({probe:this,result:new i(0,r),abortProvider:!1,sendReport:!0}):this.provider.onProbeComplete({probe:this,result:new i(1,0),abortProvider:!1,sendReport:!0})}else this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1})}},o.prototype.makeUniJsonpOnerrorCallback=function(){var e=this;return function(){e.cancelled=!0,e.provider.onCacheNodeIdProbeComplete({probe:e,cacheNodeId:"2"})}},o.prototype.measureDynamicPage=function(){this.session.insertIframe(this.makeProbeURL()),this.state="loading",this.timeoutId=this.session.window.setTimeout(this.makeTimeoutCallback(),this.provider.timeoutInMs)},o.prototype.makeProbeURL=function(e){var t="",r=e||this.baseUrl;if(this.provider.cacheBusting){t="?rnd=",-1<this.baseUrl.indexOf("?",0)&&(t="&rnd=");var o=this.probeTypeId+this.probeIdSuffix;this.measurementType!==w.UNI_AJAX&&this.measurementType!==w.UNI_JSONP||(o="uni");var i;i="uni"===o?[this.session.requestorZoneId,this.session.requestorCustomerId,this.provider.zoneId,this.provider.customerId,this.provider.providerId,u(8),this.session.requestSignature]:[o,this.session.requestorZoneId,this.session.requestorCustomerId,this.provider.zoneId,this.provider.customerId,this.provider.providerId,this.session.transactionId,this.session.requestSignature],t+=i.join("-")}return r+t},o.prototype.makeProbeURLForDNS=function(){var e=this.baseUrl.indexOf("//");if(e>-1){var t=this.baseUrl.substring(e+2),r="//";e>0&&(r=this.baseUrl.substring(0,e)+"//");var o=t.split("/");return o[0]=u(63,"abcdefghijklmnopqrstuvwxyz")+"."+o[0],r+o.join("/")}return null},o.prototype.processWindowMessageDataUNI=function(e){if(w.UNI_AJAX===this.measurementType)switch(e.s){case"l":this.session.window.clearTimeout(this.timeoutId),this.state="loaded";break;case"e":case"s":var t="2";"e"===e.s?this.state="error":t=e.node_id,this.provider.onCacheNodeIdProbeComplete({probe:this,cacheNodeId:t})}},o.prototype.processWindowMessageDataDynamicPage=function(e){if("l"===e.s)this.session.window.clearTimeout(this.timeoutId),this.state="loaded";else if("s"===e.s&&e.m&&!this.cancelled){var t=e.m.responseEnd-e.m.domainLookupStart;1>t?this.provider.onProbeComplete({probe:this,result:null,abortProvider:!0,sendReport:!1}):t<=this.provider.timeoutInMs&&this.provider.onProbeComplete({probe:this,result:new i(0,t),abortProvider:!1,sendReport:!0})}},s.prototype.addSessionFinishedCallback=function(e){this.onSessionFinished.push(e)},s.prototype.onProviderComplete=function(){this.measureNextProvider()},s.prototype.onMeasurementReady=function(e){if(e.provider===this.currentProvider&&e.sendReport){var t=e.provider.zoneId,r=e.provider.customerId,o=e.provider.providerId;e.provider.substitutionConfiguration&&(t=e.provider.substitutionConfiguration.zoneId,r=e.provider.substitutionConfiguration.customerId,o=e.provider.substitutionConfiguration.providerId);var i=[this.domains.report,"f1",this.requestSignature,t,r,o,e.probeTypeId,e.result.resultCode,e.result.measurementValue,e.provider.cacheNodeId,this.reportTag];this.sendReport("//"+i.join("/"))}},s.prototype.setCookie=function(e){this.setDocumentCookie(e)},s.prototype.getCookie=function(e){for(var t,r=e+"=",o=this.getDocumentCookie().split(";"),i=o.length;i--;){for(t=o[i];" "===t.charAt(0);)t=t.substring(1);if(-1<t.indexOf(r))return t.substring(r.length,t.length)}return""},s.prototype.makeTransactionId=function(){var e=this.getCrypto();if(e&&e.getRandomValues){var t=new Uint32Array(1);return e.getRandomValues(t),t[0]}return Math.floor(1e9*Math.random())},s.prototype.startInitRequest=function(e){this.browserSupportsAjax()?this.startInitRequestAjax(e):this.startInitRequestJsonp(e)},s.prototype.sendReport=function(e){this.browserSupportsAjax()?this.makeAjaxGetRequest(e):this.insertScript(e)},s.prototype.requestProviders=function(){this.browserSupportsAjax()?this.requestProvidersAjax():this.requestProvidersJsonp()},s.prototype.makeProvidersUrl=function(e){var t=[this.domains.providers,this.requestorZoneId,this.requestorCustomerId,"radar","1448038407",u(20),"providers.json"],r=this.getDeviceCapabilities(),o=[];for(var i in r)r.hasOwnProperty(i)&&o.push(i+"="+r[i]);var s=this.getQueryStringArgument("radar-geo");if(s){var n=s.split("-");o.push("country="+n[0]),o.push("asn="+n[1])}var a=this.getQueryStringArgument("radar-provider-count");isNaN(a)||o.push("providerCount="+a);var p=this.getQueryStringArgument("radar-provider-count-public");isNaN(p)||o.push("providerCountPublic="+p);var d=this.getQueryStringArgument("radar-provider-count-private");isNaN(d)||o.push("providerCountPrivate="+d);var c=this.getQueryStringArgument("radar-providers-set");c&&o.push("providersSet="+c),this.testQueryString(/radar-include-tiny-networks/)&&o.push("alwaysMeasureTinyNetworks"),e&&o.push("callback="+e);var h="";return 0<o.length&&(h="?"+o.join("&")),"//"+t.join("/")+h},s.prototype.getDeviceCapabilities=function(){return{a:this.getCorsSupportFlag(),b:this.getScriptLoadSupportLevel(),n:this.getNavigationTimingSupportFlag(),p:this.getHasPostMessageFlag(),r:this.getResourceTimingSupportFlag()}},s.prototype.getCorsSupportFlag=function(){return this.browserSupportsAjax()?"1":"0"},s.prototype.getScriptLoadSupportLevel=function(){var e=this.createElement("script");return p(e.addEventListener)?"2":d(e.readyState)?"1":"0"},s.prototype.getNavigationTimingSupportFlag=function(){if(this.testUserAgentString(/msie/i)){var e=this.getDocumentProperty("documentMode"),t=this.getDocumentProperty("compatMode");if(e){if(9>e)return"0"}else if("BackCompat"===t)return"0"}return this.getPerformanceObject()?"1":"0"},s.prototype.getHasPostMessageFlag=function(){return p(this.getWindowProperty("postMessage"))?"1":"0"},s.prototype.getResourceTimingSupportFlag=function(){function e(e){var t=/msie (\d+)/i.exec(e);return t?10>=parseInt(t[1],10):!1}var t=this.getPerformanceObject(),r=this.getUserAgentString();return t&&p(t.getEntriesByType)&&!e(r)?"1":"0"},s.prototype.makeAjaxProvidersHandler=function(){var e=this;return function(){e.handleOnGotProviders(this.responseText)}},s.prototype.handleOnGotProviders=function(e){this.providers||(this.providers=this.providersFromJson(e),this.measureNextProvider())},s.prototype.onGotProvidersAsJsonp=function(e){this.providers||this.requestorZoneId!==e.requestor.zoneId||this.requestorCustomerId!==e.requestor.customerId||(this.providers=this.providersFromParsed(e.providers),this.measureNextProvider())},s.prototype.providersFromJson=function(e){var t;try{t=JSON.parse(e)}catch(r){}return this.providersFromParsed(t)},s.prototype.providersFromParsed=function(e){var t=[];if(e)for(var o=0;o<e.length;o++)t.push(new r(e[o],this));return t},s.prototype.measureNextProvider=function(){if(0<this.providers.length)this.currentProvider=this.providers.shift(),this.currentProvider.beginMeasurements();else{this.clearCdxDiv();for(var e=0;e<this.onSessionFinished.length;e++)this.onSessionFinished[e]()}},s.prototype.requestProvidersAjax=function(){this.makeAjaxGetRequest(this.makeProvidersUrl(null),this.makeAjaxProvidersHandler())},s.prototype.requestProvidersJsonp=function(){var e=this.makeProvidersUrl(this.providersJsonpCallbackName);this.insertScript(e)},s.prototype.browserSupportsAjax=function(){var e=this.getXhr();return!(!e||!d(e.withCredentials))},s.prototype.startInitRequestAjax=function(e){this.makeAjaxGetRequest(this.makeInitUrl("xml"),this.makeAjaxInitCallback(e))},s.prototype.makeAjaxInitCallback=function(e){var t=this;return function(){if(this.responseText){var r=/<requestSignature>([^<]+)/.exec(this.responseText);r&&r[1]&&(t.requestSignature=r[1],e())}}},s.prototype.startInitRequestJsonp=function(e){var t=this.makeInitUrl("jsonp"),r=this.createWindowObject("cdx",{},!1);r.f=r.f||this.makeJsonpInitCallback();var o=this.requestorZoneId+";"+this.requestorCustomerId,i=this.createWindowObject("cedexis",{},!1);i.requestors=i.requestors||{},i.requestors[o]=this.makeJsonpInitCallbackForSession(e),this.insertScript(t)},s.prototype.makeJsonpInitCallbackForSession=function(e){var t=this;return function(r){"a"in r&&(t.requestSignature=r.a,e())}},s.prototype.makeJsonpInitCallback=function(){var e=this;return function(t){if("c"in t&&"d"in t){var r=t.c+";"+t.d,o=e.getWindowProperty("cedexis");if(r in o.requestors){var i=o.requestors[r];i&&(delete o.requestors[r],i(t))}}}},s.prototype.makeInitUrl=function(e){var t="https:"===this.getPageProtocol()?"s":"i",r=[];r.push("i1"),r.push(this.samplerId),r.push(this.samplerMajorVersion),r.push(this.samplerMinorVersion),r.push(this.requestorZoneId),r.push(this.requestorCustomerId),r.push(this.transactionId),r.push(t),r=r.join("-");var o=[];return o.push(r+"."+this.domains.init),o.push("i1"),o.push(Math.floor((new Date).getTime()/1e3).toString(10)),o.push(this.transactionId),o.push(e),o="//"+o.join("/"),o+="?seed="+r},s.prototype.makeAjaxGetRequest=function(e,t){var r=this.getXhr();if(r)try{r.open("GET",e,!0),t&&(r.onreadystatechange=function(){var e=!1;return function(){e||200!==this.status||4!==this.readyState||(e=!0,t.call(this))}}()),r.send()}catch(o){}},s.prototype.sendPltReport=function(e){function t(e){return void 0===e?0:e}function r(e){return e.connectEnd<e.connectStart?!1:e.domainLookupEnd<e.domainLookupStart?!1:e.domComplete<e.domLoading?!1:e.fetchStart<e.navigationStart?!1:e.loadEventEnd<e.loadEventStart?!1:e.loadEventEnd<e.navigationStart?!1:e.responseEnd<e.responseStart?!1:!(e.responseStart<e.requestStart)}var o=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd","fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","secureConnectionStart","requestStart","responseStart","responseEnd","domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"],i=this.getPerformanceObject();if(i){var s=i.timing;if(s){for(var n=[this.domains.report,"n1",0],a=0;a<o.length;a+=1)n.push(e.pltSent?"0":t(s[o[a]]));n.push(this.requestSignature),n.push(e.reportTag),n.push(e.pltSent?"0":this.getStartRenderTimestamp()),r(s)&&this.sendReport("//"+n.join("/"))}}return this},s.prototype.getStartRenderTimestamp=function(){var e=this.getWindowProperty("chrome");if(e&&e.loadTimes){var t=e.loadTimes();return Math.round(1e3*t.firstPaintTime)}var r=this.getPerformanceObject();return r&&r.timing&&r.timing.msFirstPaint?Math.round(r.timing.msFirstPaint):0},s.prototype.getXhr=function(){var e=this.getWindowProperty("XMLHttpRequest");return e?new e:void 0},s.prototype.processWindowMessage=function(e){if(this.currentProvider&&"data"in e){var t;try{t=JSON.parse(e.data)}catch(r){}if(t){var o=t.source;"uni"!==o&&"dsa"!==o||this.currentProvider.processWindowMessageData(t)}}},s.prototype.setDocumentCookie=function(e){this.document.cookie=e},s.prototype.getDocumentCookie=function(){return this.document.cookie},s.prototype.getPerformanceObject=function(){return"performance"in this.window?this.window.performance:null},s.prototype.getResourceTimingEntry=function(e){var t=this.window.performance;if(t){var r;if("getEntriesByName"in t&&(r=t.getEntriesByName(e),r&&r.length))return r[r.length-1];if("getEntriesByType"in t){r=t.getEntriesByType("resource");for(var o=r.length;o--;)if(r[o].name===e)return r[o]}}return null},s.prototype.getUserAgentString=function(){return this.window.navigator.userAgent},s.prototype.testUserAgentString=function(e){return e.test(this.window.navigator.userAgent)},s.prototype.testQueryString=function(e){return e.test(this.window.location.search)},s.prototype.createWindowObject=function(e,t,r){return Object.prototype.hasOwnProperty.call(this.window,e)&&!r||(this.window[e]=t),this.window[e]},s.prototype.insertScript=function(e,t,r){var o=this.document.createElement("script");o.async=!0,o.src=e,t&&(o.onload=t),r&&(o.onerror=r),this.addToContainer(o)},s.prototype.insertIframe=function(e,t){var r=this.document.createElement("iframe");r.style.display="none",r.src=e,"function"==typeof t&&r.addEventListener("load",t,!1),this.addToContainer(r)},s.prototype.addToContainer=function(e){var t=this.document.getElementById("cdx");t||(t=this.document.createElement("div"),t.id="cdx",this.document.body.appendChild(t)),t.appendChild(e)},s.prototype.clearCdxDiv=function(){var e=this.document.getElementById("cdx");if(e)for(;e.firstChild;)e.removeChild(e.firstChild)},s.prototype.getCrypto=function(){return this.window.crypto||this.window.msCrypto},s.prototype.createElement=function(e){return this.document.createElement(e)},s.prototype.getDocumentProperty=function(e){return this.document[e]},s.prototype.getWindowProperty=function(e){return this.window[e]},s.prototype.getQueryStringArgument=function(e){var t=this.window.location.search.slice(1);if(t)for(var r=t.split("&"),o=r.length;o--;){var i=r[o].split("=");if(i[0]===e&&i[1])return i[1]}},s.prototype.getPageProtocol=function(){return this.window.location.protocol},s.prototype.clearResourceTimings=function(){var e=this.getPerformanceObject();if(e){var t=e.clearResourceTimings||e.webkitClearResourceTimings;t&&t.call(e)}},s.prototype.setResourceTimingBufferSize=function(e){var t=this.getPerformanceObject();if(t){var r=t.setResourceTimingBufferSize||t.webkitSetResourceTimingBufferSize;r&&r.call(t,e)}},n.prototype.setResourceTimingBufferSize=function(e){var t=this.getPerformanceObject();if(t){var r=t.setResourceTimingBufferSize||t.webkitSetResourceTimingBufferSize;r&&r.call(t,e)}},n.prototype.installResourceTimingBufferFullHandler=function(){var e=this.getPerformanceObject();if(e){var t=this.makeResourceTimingBufferFullHandler();e.addEventListener&&"undefined"!=typeof e.onresourcetimingbufferfull?e.addEventListener("resourcetimingbufferfull",t,!1):e.addEventListener&&"undefined"!=typeof e.onwebkitresourcetimingbufferfull?e.addEventListener("webkitresourcetimingbufferfull",t,!1):"undefined"!=typeof e.onresourcetimingbufferfull?e.onresourcetimingbufferfull=t:this.__clearManually=!0}},n.prototype.makeResourceTimingBufferFullHandler=function(){var e=this;return function(){e.clearResourceTimingBuffer()}},n.prototype.checkBuffer=function(){if(this.__clearManually){var e=300;this.setResourceTimingBufferSize(e);var t=this.getResourceEntries();t&&e-50<t.length&&this.clearResourceTimingBuffer()}},n.prototype.getPerformanceObject=function(){return"performance"in this.__window?this.__window.performance:null},n.prototype.clearResourceTimingBuffer=function(){var e=this.getPerformanceObject();if(e){var t=e.clearResourceTimings||e.webkitClearResourceTimings;t&&t.call(e)}},n.prototype.getResourceEntries=function(){var e=this.getPerformanceObject();return e&&e&&e.getEntriesByType?e.getEntriesByType("resource"):void 0},v.prototype.setRecipient=function(e){this.__recipient=e},v.prototype.getRecipient=function(){return this.__recipient},v.prototype.clearRecipient=function(){this.__recipient=null},v.prototype.makePostMessageHandler=function(){var e=this;return function(t){var r=e.getRecipient();r&&r.handleMessage(t)}},v.prototype.makeResourceTimingBufferFullHandler=function(){var e=this;return function(){var t=e.getRecipient();t&&t.clearResourceTimingBuffer()}},v.prototype.setProviders=function(e){this.__recipient.setProviders(e)},v.prototype.setProviders=v.prototype.setProviders,g.prototype.init=function(e){var t=300;e&&this.__session.setResourceTimingBufferSize(t);var r=this.getResourceEntries();r&&e&&t-50<r.length&&this.clearResourceTimingBuffer(),this.__session.startInitRequest(this.makeInitCallback())},g.prototype.makeInitCallback=function(){var e=this;return function(){e.beginSession()}},g.prototype.beginSession=function(){this.__session.sendPltReport({reportTag:"0",pltSent:!1}).requestProviders()},g.prototype.makeSessionFinishedCallback=function(){return function(){delete e.cedexis.radar.container}},g.prototype.handleMessage=function(e){this.__session.processWindowMessage(e)},g.prototype.clearResourceTimingBuffer=function(){this.__session.clearResourceTimings()},g.prototype.getPerformanceObject=function(){return this.__window.performance},g.prototype.getResourceEntries=function(){var e=this.getPerformanceObject();return e&&e&&e.getEntriesByType?e.getEntriesByType("resource"):void 0},g.prototype.getRadarSession=function(){return this.__session},g.prototype.setProviders=function(e){this.__session.onGotProvidersAsJsonp(e)},e.cedexis=e.cedexis||{},e.cedexis.radar=e.cedexis.radar||{},m(e)||l(e)&&!f(e)||("complete"===t.readyState?I():t.addEventListener("readystatechange",b))}(window,document);