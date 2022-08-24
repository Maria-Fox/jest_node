/** Textual markov chain generator */

console.log("markov.js ran");

class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter((c) => c !== "");
    this.makeChains();
  }

  // The constructor function splits it on spaces and linebreak characters to make a list of words. It then calls the function which builds a map of chains of word → possible-next-words.

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO

    let chains = new Map();
    // iterable and flexible for keys -  array-like

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
      // simply adding one to index to get the next word OR allowing for null if we hit the last index

      //map method .has(key) THEN .get(key).push(nextWord) to map
      if (chains.has(word)) chains.get(word).push(nextWord);
      else chains.set(word, [nextWord]);
      // if the map does not have the word, set the word as the key, set value for key
    }

    this.chains = chains;
  }

  /** Pick random choice from array */

  // static methods are used to implement functions that belong to the class as a whole, but not to any particular object of it. -randomly pick a starting index based on
  static randomChoice(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // pick index to start w/ using the length of the array, this will be used as a key to retreive a random starting word and random next words in makeText

  //default to 100
  makeText(numWords = 100) {
    let keys = Array.from(this.chains.keys());
    // using static method on class to pick random index=word to start with
    let word = MarkovMachine.randomChoice(keys);
    let out = [];

    // while out length is less than the words passed in AND we have not hit the end/null add the word as a key
    while (out.length < numWords && word !== null) {
      out.push(word);
      word = MarkovMachine.randomChoice(this.chains.get(word));
      console.log(word);
      // use static method randomChoice to get next random word to start w/ from chains based off word/key
    }

    return out.join(" ");
    // return output as string* adding spaces b/w words
  }
}

// let practice = new MarkovMachine("This is in vscode");
// console.log(practice);
// console.log(practice.makeText);

module.exports = {
  MarkovMachine: MarkovMachine,
};
