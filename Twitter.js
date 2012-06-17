function GASTwitter(){
    this.init();
}
GASTwitter.prototype = {
    init: function(){
        var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
        oAuthConfig.setAccessTokenUrl("http://api.twitter.com/oauth/access_token");
        oAuthConfig.setRequestTokenUrl("http://api.twitter.com/oauth/request_token");
        oAuthConfig.setAuthorizationUrl("http://api.twitter.com/oauth/authorize");
        oAuthConfig.setConsumerKey(ScriptProperties.getProperty("twitterConsumerKey"));
        oAuthConfig.setConsumerSecret(ScriptProperties.getProperty("twitterConsumerSecret"));
    },
    post: function(text){
        var options =
        {
          "oAuthServiceName" : "twitter",
          "oAuthUseToken" : "always",
          "method" : "POST"
        };
        var encodedTweet = encodeURIComponent(text);
        var result = UrlFetchApp.fetch("http://api.twitter.com/1/statuses/update.json?status=" + encodedTweet, options);
        //var o  = Utilities.jsonParse(result.getContentText());
        //Logger.log(o);
        //Logger.log(result.getResponseCode());
        return result;
    }
}
