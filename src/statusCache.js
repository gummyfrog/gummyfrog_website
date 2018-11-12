class statusCache {

  constructor() {
    this.json = {
      "bolopo": {
        "status":"offline"
      },
      "frogeye": {
        "status":"offline"
      },
      "jordan": {
        "status":"offline"
      },
      "emoji-overnight":{
        "status":"offline"
      }
    };
    this.message = 'Hello! I am alive.';
  };

  get() {
    return(this.json);
  };

  push(x) {
    Object.assign(this.json, x);  
  };
}

module.exports = statusCache;
