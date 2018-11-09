class statusCache {

  constructor() {
    this.json = {};
    this.message = 'Hello! I am alive.'
  };

  get() {
    return(this.json);
  };

  push(x) {
    Object.assign(this.json, x);  
  };
}

module.exports = statusCache;
