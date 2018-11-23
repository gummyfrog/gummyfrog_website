class statusCache {

  constructor() {
    this.json = {
      "bolopo": {
        "status":"offline",
        "last":"11:35pm",
        "desc":"Haiku Generator",
      },
      "frogeye": {
        "status":"offline",
        "last":"11:35pm",
        "desc":"Crystal Ball for the Ultimate Socialite.",
      },
      "jordan": {
        "status":"offline",
        "last":"11:35pm",
        "desc":"Jordan.",
      },
      "emoji":{
        "status":"offline",
        "last":"11:35pm",
        "desc":"Overnight Tracking",
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
