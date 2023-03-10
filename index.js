import Game from "./Game.js";
const winners = [];
for (let index = 0; index < 250; index++) {
  let game = new Game({ log: false, maxlife: 30 });
  game.run();
  winners.push({ player: game.winner.name, turn: game.turn });
}

console.log("====================================");
console.log(
  "Player 1 wins",
  winners.filter((w) => w.player === "Player 1").length,
  "times"
);
console.log(
  "Player 2 wins",
  winners.filter((w) => w.player === "Player 2").length,
  "times"
);
console.log(
  "Median turn",
  winners.reduce((acc, w) => acc + w.turn, 0) / winners.length
);
console.log("====================================");
