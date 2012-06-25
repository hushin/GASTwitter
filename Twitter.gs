function t_update(){    
    gtw.update("hoge" + Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
}

function t_getTimeline(){
    //Browser.msgBox(gtw.home_timeline());
    var tl = gtw.home_timeline();
    var tw;
    for (var i in tl){
        tw = tl[i];
        Logger.log(tw.created_at + " " + tw.user.screen_name + ":" + tw.text);
    }
}

var gtw = ({
    init: function(){
        var oAuthConfig = UrlFetchApp.addOAuthService("twitter");
        oAuthConfig.setAccessTokenUrl("http://api.twitter.com/oauth/access_token");
        oAuthConfig.setRequestTokenUrl("http://api.twitter.com/oauth/request_token");
        oAuthConfig.setAuthorizationUrl("http://api.twitter.com/oauth/authorize");
        oAuthConfig.setConsumerKey(ScriptProperties.getProperty("twitterConsumerKey"));
        oAuthConfig.setConsumerSecret(ScriptProperties.getProperty("twitterConsumerSecret"));
        return this;
    },
    get: function(resourceURL){
        var options =
        {
          "oAuthServiceName" : "twitter",
          "oAuthUseToken" : "always",
          "method" : "GET"
        };
        var o;
        try{
            var result = UrlFetchApp.fetch("http://api.twitter.com/" + resourceURL, options);
            o  = Utilities.jsonParse(result.getContentText());
        } catch (e) {
            Logger.log(e);
        }
        //Logger.log(result.getResponseCode());
        return o;
    },
    post: function(resourceURL){
        var options =
        {
          "oAuthServiceName" : "twitter",
          "oAuthUseToken" : "always",
          "method" : "POST"
        };
        var result;
        try{
            result = UrlFetchApp.fetch("http://api.twitter.com/" + resourceURL, options);
        } catch (e) {
            Logger.log(e);
        }
        //var o  = Utilities.jsonParse(result.getContentText());
        //Logger.log(result.getResponseCode());
        return result;
    },
    update: function(text){
        var encodedTweet = encodeURIComponent(text);
        this.post("1/statuses/update.json?status=" + encodedTweet);
    },
    home_timeline: function(){
        return this.get("1/statuses/home_timeline.json");
    }
}).init();
