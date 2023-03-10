import Card from "./Card.js";

/**
 * @class Deck
 */
export default class Deck {
  constructor() {
    const defaultMana = [
      0, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 8,
    ];
    this.cards = [];
    defaultMana.forEach((mana) => {
      let dmg = Math.floor(Math.random() * 3) + 1;
      this.cards.push(new Card(mana, dmg));
    });
    for (let i = this.cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
}
