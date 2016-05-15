function getQuery(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function executeSpeak(msg) {
  msg.voice = window.speechSynthesis.getVoices().filter(function(voice) { return voice.lang == "en-GB" })[0]
  window.speechSynthesis.speak(msg)
}


chrome.webRequest.onCompleted.addListener(
  function(details) {
    if (chrome.extension.inIncognitoContext) {
      queryCheck = getQuery("q",details.url)
      if (queryCheck != null) {
        var msg = new SpeechSynthesisUtterance("Are you sure you really want to look up: " + queryCheck);
        var voices = window.speechSynthesis.getVoices();
        msg.lang = "en-GB"
        msg.voice = voices.filter(function(voice) { return voice.lang == "en-GB" })[0];
        executeSpeak(msg);
      }      
    }
    },{urls: ["*://www.google.com/*"]},["responseHeaders"]);
