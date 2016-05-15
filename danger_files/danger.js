function getQuery(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (chrome.extension.inIncognitoContext) {
      queryCheck = getQuery("q",details.url)
      if (queryCheck != null) {
        console.log("Woot!")
        console.log(queryCheck)
        console.log(chrome.extension.inIncognitoContext)
      }      
    }
    },{urls: ["*://www.google.com/*"]},["responseHeaders"]);