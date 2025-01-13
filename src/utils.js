const cp = require("node:child_process");

function runCommand(...args) {
  return new Promise((resolve, reject) => {
    cp.exec(args.join(" "), (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

module.exports = { runCommand };
