class statusCache {

  constructor() {
    this.json = {
      "bolopo": {
        "status":"offline",
        "last":"｢(ﾟﾍﾟ)",
        "desc":"Haiku Generator",
      },
      "frogeye": {
        "status":"offline",
        "last":"σ(´し_｀〃)ゞ",
        "desc":"Crystal Ball for the Ultimate Socialite.",
      },
      "jordan": {
        "status":"offline",
        "last":"( ?´_ゝ｀)",
        "desc":"Jordan.",
      },
      "emoji":{
        "status":"offline",
        "last":"ヽ(。ヘ°)ノ",
        "desc":"Overnight Tracking",
      },
      "cuckwatch":{
        "status":"offline",
        "last":"(^～^;)ゞ",
        "desc":"Cuck Retweeter.",
      }
    };
  };

  get() {
    return(this.json);
  };

  push(x) {
    Object.assign(this.json, x);  
  };
}

module.exports = statusCache;
