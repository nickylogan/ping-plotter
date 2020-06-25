const concurrently = require("concurrently");
const chalk = require("chalk");

concurrently(
  [
    {
      command: "yarn:start:electron",
      name: "ELECTRON",
      prefixColor: "blue.bold",
    },
    {
      command: "yarn:start:react",
      name: "REACT",
      prefixColor: "cyan.bold",
    },
  ],
  {
    successCondition: "first",
    killOthers: "success",
  }
).then(
  () => {
    console.log(chalk.green("Process exited successfully"));
  },
  (codes) => {
    console.log(chalk.yellow(`Processes exited with non-zero codes ${codes}`));
  }
);
