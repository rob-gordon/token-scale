const Token = require('./Token');

class Delta {
  constructor(tokens, options = {}) {
    if (tokens === null) {
      throw new Error('array of type Token required');
    }
    if (tokens instanceof Token) {
      this.tokens = [tokens];
    } else {
      this.tokens = tokens.slice(0);
    }

    this.id = Delta.createID();

    if (!('name' in options)) {
      throw new Error('You must pass options with a name');
    }
    this.name = options.name;
    this.wrapProperty =
      'wrapProperty' in options ? options.wrapProperty : n => n;
    this.fluid = 'fluid' in options ? options.fluid : false;
    this.unit = 'unit' in options ? options.unit : '';
  }

  getNextValidIndex(curIndex) {
    let nextValidBreakpoint = curIndex + 1;
    const highestValidIndex = this.tokens.lastIndexOf(this.tokens.slice(-1)[0]);
    while (
      !(nextValidBreakpoint in this.tokens) &&
      nextValidBreakpoint <= highestValidIndex
    ) {
      nextValidBreakpoint = nextValidBreakpoint + 1;
    }
    return nextValidBreakpoint > highestValidIndex
      ? false
      : nextValidBreakpoint;
  }

  write(breakpointIndex, arg, fluid = null) {
    if (breakpointIndex in this.tokens) {
      const token = this.tokens[breakpointIndex];
      if (
        !this.fluid ||
        fluid === false ||
        breakpointIndex === this.coreLayout.breakpoints.length - 1
      ) {
        return this.wrapProperty(`${token.get(arg)}${this.unit}`);
      } else {
        // get next valid breakpoint
        const nextBreakpoint = this.getNextValidIndex(breakpointIndex);
        const token2 = this.tokens[nextBreakpoint];
        const breakpointDiff =
          this.coreLayout.breakpoints[nextBreakpoint] -
          this.coreLayout.breakpoints[breakpointIndex];
        return this.wrapProperty(
          `calc(${token.get(arg)}${this.unit} + ${token2.get(arg) -
            token.get(arg)} * ((100vw - ${
            this.coreLayout.breakpoints[breakpointIndex]
          }px) / ${breakpointDiff}))`
        );
      }
    } else {
      // if the breakpoint doesn't exist
      // we'll check for the next one down...
      // (because they're looking up / optimistic)
      return null;
    }
  }

  // can pass format function to filter output and add unit or anythign like that...
}

Delta.createID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

module.exports = Delta;
