"use strict";

class InvalidSpam extends Error {}

class SpamFilter {
  constructor(spams, word = null) {
    this._word = word;
    this._filters = new Map();

    let keys = Object.keys(spams);
    if (keys.length > 0)
      for (let key of keys)
        this._filters.set(key, spams[key]);
  }

  get filter() { return this._filters }

  filter() {
    if (!this._word)
      throw new InvalidSpam("No word to filter");

    let filtered = null;
    for (let filter of this._filters) {
      let regex = new RegExp("\\b("+ filter[0] +
                    ")\\b", "ig");
      filtered = this._word.replace(regex, 
                  this._filters.get(filter[0]));
    }

    return filtered;
  }

  addSpam(spams) { 
    let keys = Object.keys(spams);
    if (keys.length < 1)
      throw new InvalidSpam("Spam Objecg is invalid")
    for (let key of keys)
      this._filters.set(key, spam[key])

    return this;
  }

  removeSpam(key) {
    if (this._filters.has(key))
      this._filters.remove(key)

    return this;
  }

  set word(word) { this._word = word }
}



let swap = new SpamFilter({fuck: "fvck", damn: 
"dawn"}, "fuck you man, and damn you");

console.log(swap.filter());
//swap.filter();
