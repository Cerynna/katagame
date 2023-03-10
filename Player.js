import Card from "./Card.js";
import Deck from "./Deck.js";

/**
 * @param {string} name
 * @param {boolean | object} options
 */
export default class Player {
  constructor(name, options = false) {
    this.name = name;
    this.life = options && options.maxlife ? options.maxlife : 30;
    this.manapool = {
      current: 0,
      available: 0,
      max: 10,
    };
    this.deck = new Deck();
    this.hand = [];
  }
  /**
   * @param {int} dmg
   * @param {boolean} log
   */
  takeDmg(dmg, log) {
    log && console.log(this.name, "takes", dmg, "damage");
    this.life -= dmg;
  }
  /**
   * @param {boolean} log
   * @returns {Card}
   */
  pickCard(log) {
    // Bleed Rule (if deck is empty, player loses 1 life)
    if (this.deck.cards.length === 0) {
      this.life -= 1;
      log && console.log(this.name, "has no more cards lost 1 life", this.life);
      return;
    }
    let card = this.deck.cards.pop();
    log && console.log(this.name, "picks", card);
    // Hand Rule (if hand is full, player loses 1 card)
    if (this.hand.length < 5) {
      this.hand.push(card);
    } else {
      log && console.log(this.name, "has no more space in hand");
    }
  }
  /**
   * @param {Card} card
   * @param {boolean} log
   * @returns {boolean}
   * */
  useCard(card, log) {
    if (card.cost <= this.manapool.available) {
      this.manapool.available -= card.cost;
      this.hand.splice(this.hand.indexOf(card), 1);
      log && console.log(this.name, "uses", card);
      return true;
    } else {
      log && console.log(this.name, "can't use", card);
      return false;
    }
  }
  /**
   * @param {boolean} log
   * @param {int} turn
   * */
  addMana(log, turn) {
    if (turn < 10) {
      this.manapool.current = turn + 1;
      this.manapool.available = turn + 1;
    } else {
      this.manapool.current = 10;
      this.manapool.available = 10;
    }
    log && console.log(this.name, "has", this.manapool);
  }
  /**
   * @returns {Card}
   * */
  findAction() {
    return this.hand.find((card) => {
      if (card.cost <= this.manapool.current) {
        return card;
      }
    });
  }
}
