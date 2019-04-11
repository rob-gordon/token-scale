const Token = require('./Token');
const Delta = require('./Delta');

const defaultArgs = {
  breakpoints: [1000]
};

class CoreLayout {
  constructor(_args) {
    let args = { ...defaultArgs, ..._args };
    Object.assign(this, args);
    this.deltas = [];
  }

  set(delta) {
    this.deltas.push(delta);
    // i dont like this pattern at all
    delta.coreLayout = this;
  }

  get(name) {
    return this.deltas.filter(delta => delta.name === name)[0] || false;
  }

  debug() {
    console.log('-----------------------------------------');
    this.breakpoints.forEach((breakpoint, i) => {
      console.log(`B: ${breakpoint}`);
      this.deltas.forEach(delta => {
        if (i in delta.tokens) {
          console.log(`\tTc — ${delta.name}: ${delta.tokens[i].get()}`);
        }
      });
    });
    console.log('-----------------------------------------');
  }

  // Takes an object with chain names and the argument to pass to get()
  write(breakpointIndex, names, fluid = null) {
    // need to check for type compliance here...
    return Object.keys(names).map(name => {
      if (this.deltas.map(x => x.name).includes(name)) {
        const delta = this.deltas.filter(x => x.name === name)[0];
        return delta.write(breakpointIndex, names[name], fluid);
      }
    });
  }
}

module.exports = CoreLayout;
