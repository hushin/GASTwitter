function t_update(){    
  gtw.update("hoge" + Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'"));
  
}

function t_getTimeline(){
  var tl = gtw.home_timeline();
  var tw;
  for (var i in tl){
    tw = tl[i];
    Logger.log(tw.created_at + "@" + tw.user.screen_name + ":" + tw.text);
  }
}

var gtw = ({
  init: function(){
    this.accessor = {
      consumerKey: ScriptProperties.getProperty("twitterConsumerKey"),
      consumerSecret: ScriptProperties.getProperty("twitterConsumerSecret"),
      token: ScriptProperties.getProperty("twitterAccessToken"),
      tokenSecret: ScriptProperties.getProperty("twitterAccessTokenSecret")
    };
    return this;
  },
  connect: function(resourceURL, method){
    var action = "http://api.twitter.com/" + resourceURL;
    var message = { method: method, action: action, parameters: {}, };
    OAuth.SignatureMethod.sign(message, this.accessor);
    
    OAuth.completeRequest( message, this.accessor );
    var url = OAuth.addToURL(action, message.parameters);
    
    try{
      var response = UrlFetchApp.fetch(url, {method: message.method });
      if (response.getResponseCode() == 200) {
        return Utilities.jsonParse(response.getContentText());
      } else {
        return null;
      }
    } catch (e) {
      Logger.log(e);
      return null;
    }
  },
  get: function(resourceURL){
    return this.connect(resourceURL, "GET");
  },
  post: function(resourceURL){
    return this.connect(resourceURL, "POST");
  },
  update: function(text){
    var encodedTweet = encodeURIComponent(text);
    this.post("1/statuses/update.json?status=" + encodedTweet);
  },
  home_timeline: function(){
    return this.get("1/statuses/home_timeline.json");
  }
}).init();
