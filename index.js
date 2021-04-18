const readline = require("readline");
const Cat = require('./Cat');

let catsNum = 5;
let cats;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askStartingQuestion = () => {
  const questionText =
    "\x1b[32mPick how many cats you would like to spawn (default 5): \x1b[0m";
  return new Promise((resolve) => {
    rl.question(questionText, (answer) => {
      const num = parseInt(answer);
      if (isNaN(num)) {
        console.log(`Only valid number is allowed, number set to defalut.`);
      } else {
        catsNum = num;
        console.log(`You created ${answer} cats!`);
      }

      resolve();
    });
  });
};

const createCats = () => {
  cats = Array.apply(null, Array(catsNum));

  return Promise.all(cats.map((item, i) => new Cat(`Cat ${i + 1}`)));
};

(async function start() {
  // starting game
  console.log(`\x1b[33mHello to War Cat Royal \x1b[0m`);
  await askStartingQuestion();
  cats = await createCats();

  cats.forEach(i=>i.init(cats));


  setInterval(() => {
    const winner = cats.filter((i) => i.health > 0)
    if(winner.length < 2) {
      console.log(`Game over, ${winner[0].name} is winner!`)
      process.exit();
    }
  }, 100)
})();
