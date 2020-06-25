const waitOn = require('wait-on');
const electron = require('electron');
const proc = require('child_process');
const chalk = require('chalk');

const TSCWatchClient = require('tsc-watch/client');
const watch = new TSCWatchClient();

let electronProcess = null;

function spawnElectronProcess() {
  // Kill any existing electron process
  if (electronProcess) {
    electronProcess.kill();
  }

  electronProcess = proc.spawn(electron, ['.'], {
    env: { ...process.env, NODE_ENV: 'development' }
  });

  electronProcess.stdout.pipe(process.stdout);
  electronProcess.stderr.pipe(process.stderr);

  electronProcess.on('close', (code) => {
    // Force-killed processes don't return an exit code.
    if (code === null) {
      return;
    }

    // Kill watch process once electron exited.
    console.log(
      chalk.magenta('Electron process exited, killing other processes...')
    );
    watch && watch.kill();
  });
}

// On first successful compilation, wait for the react dev server to start.
watch.on('first_success', () => {
  const { prepareUrls } = require('react-dev-utils/WebpackDevServerUtils');
  const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
  const PORT = parseInt(process.env.PORT, 10) || 3000;
  const HOST = process.env.HOST || '0.0.0.0';

  const urls = prepareUrls(protocol, HOST, PORT);

  console.log(chalk.magenta(
    `Waiting for React to start on ${chalk.bold(urls.localUrlForBrowser)}`
  ));

  waitOn({ resources: [urls.localUrlForBrowser] })
    .then(() => {
      console.log(chalk.cyan(
        `${chalk.bold('React ready!')}, spawning electron process...`
      ));
      spawnElectronProcess();
    })
    .catch((err) => {
      console.log(chalk.red(err));
    });
});

// Spawn an electron process for every successful compilation
watch.on('success', spawnElectronProcess);

// Kill any existing electron process for any compile errors
watch.on('compile_errors', () => {
  if (electronProcess && !electronProcess.killed) {
    electronProcess.kill();
  }

  console.log(chalk.red.bold('Failed to compile, waiting for changes...'));
});

watch.start('--project', 'src/main', '--newLine', 'lf');
