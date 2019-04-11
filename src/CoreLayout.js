const TokenScale = require('./TokenScale');
const TokenChain = require('./TokenChain');

const defaultArgs = {
  breakpoints: [1000]
};

class CoreLayout {
  constructor(_args) {
    let args = { ...defaultArgs, ..._args };
    Object.assign(this, args);
    this.tokenChains = [];
  }

  set(tokenChain) {
    this.tokenChains.push(tokenChain);
    // i dont like this pattern at all
    tokenChain.coreLayout = this;
  }

  get(name) {
    return (
      this.tokenChains.filter(tokenChain => tokenChain.name === name)[0] ||
      false
    );
  }

  debug() {
    console.log('-----------------------------------------');
    this.breakpoints.forEach((breakpoint, i) => {
      console.log(`B: ${breakpoint}`);
      this.tokenChains.forEach(tokenChain => {
        if (i in tokenChain.tokenScales) {
          console.log(
            `\tTc — ${tokenChain.name}: ${tokenChain.tokenScales[i].get()}`
          );
        }
      });
    });
    console.log('-----------------------------------------');
  }

  // Takes an object with chain names and the argument to pass to get()
  write(breakpointIndex, names, fluid = null) {
    // need to check for type compliance here...
    return Object.keys(names).map(name => {
      if (this.tokenChains.map(x => x.name).includes(name)) {
        const tokenChain = this.tokenChains.filter(x => x.name === name)[0];
        return tokenChain.write(breakpointIndex, names[name], fluid);
      }
    });
  }
}

module.exports = CoreLayout;
