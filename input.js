const { UP_KEY, LEFT_KEY, DOWN_KEY, RIGHT_KEY } = require('./constants.js');

let connection;

const msg = 'Say: ';
const hello = 'Hello there!';
const stay = 'Stay a while...';
const listen = '...and listen!';

const setupInput = function (conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', (key) => {
    handleUserInput(key);
  });
  return stdin;
};

let func;

const handleUserInput = (key) => {
  const stdout = process.stdout;
  const interval = function (key) {
    func = setInterval(() => {
      connection.write(key);
    }, 100);
  };
  if (key === '\u0003') {
    stdout.write('Exited snake game. Bye bye.\n');
    process.exit();
  }
  if (key === 'w') {
    clearInterval(func);
    interval(UP_KEY);
  }
  if (key === 'a') {
    clearInterval(func);
    interval(LEFT_KEY);
  }
  if (key === 's') {
    clearInterval(func);
    interval(DOWN_KEY);
  }
  if (key === 'd') {
    clearInterval(func);
    interval(RIGHT_KEY);
  }
  if (key === 'h') {
    connection.write(msg + hello);
  }
  if (key === 'j') {
    connection.write(msg + stay);
  }
  if (key === 'k') {
    connection.write(msg + listen);
  }
};

module.exports = { setupInput };
