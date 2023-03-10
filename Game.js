import Player from "./Player.js";

/**
 *  @param {boolean | object} options
 *
 */
export default class Game {
  constructor(options = false) {
    this.players = [
      new Player("Player 1", options),
      new Player("Player 2", options),
    ];
    this.turn = 0;
    this.winner = null;
    this.options = options;
  }
  /**
   * @param {boolean} log
   *
   * */
  run() {
    this.options.log && console.log("====================================");
    this.options.log && console.log("Game starts!");
    while (this.winner === null) {
      // Turn
      this.players.forEach((player, index) => {
        let otherPlayerIndex = this.players.findIndex((p) => p !== player);
        if (this.turn === 0) {
          // Pick 5 cards
          for (let i = 0; i < 5; i++) {
            this.players[index].pickCard(this.options.log);
          }
        } else {
          // Pick 1 card
          this.players[index].pickCard(this.options.log);
        }
        // Add mana
        this.players[index].addMana(this.options.log, this.turn);
        // Play cards
        while (this.players[index].manapool.current > 0) {
          let action = this.players[index].findAction();
          if (action) {
            let used = this.players[index].useCard(action, this.options.log);
            if (used) {
              this.players[otherPlayerIndex].takeDmg(action.dmg, this.options.log);
            } else {
              break;
            }
          } else {
            break;
          }
        }
        // Check if other player is dead
        if (this.players[otherPlayerIndex].life <= 0) {
          this.winner = player;
        }
      });
      // Next turn
      this.turn++;
    }
    this.options.log && console.log(this.winner.name, "wins!");
    this.options.log && console.log("====================================");
  }
}
