const TokenScale = require('./TokenScale');

class TokenChain {
  constructor(tokenScales, options = {}) {
    if (tokenScales === null) {
      throw new Error('array of type TokenScale required');
    }
    if (tokenScales instanceof TokenScale) {
      this.tokenScales = [tokenScales];
    } else {
      this.tokenScales = tokenScales.slice(0);
    }

    this.id = TokenChain.createID();

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
    const highestValidIndex = this.tokenScales.lastIndexOf(
      this.tokenScales.slice(-1)[0]
    );
    while (
      !(nextValidBreakpoint in this.tokenScales) &&
      nextValidBreakpoint <= highestValidIndex
    ) {
      nextValidBreakpoint = nextValidBreakpoint + 1;
    }
    return nextValidBreakpoint > highestValidIndex
      ? false
      : nextValidBreakpoint;
  }

  write(breakpointIndex, arg, fluid = null) {
    if (breakpointIndex in this.tokenScales) {
      const tokenScale = this.tokenScales[breakpointIndex];
      if (
        !this.fluid ||
        fluid === false ||
        breakpointIndex === this.coreLayout.breakpoints.length - 1
      ) {
        return this.wrapProperty(`${tokenScale.get(arg)}${this.unit}`);
      } else {
        // get next valid breakpoint
        const nextBreakpoint = this.getNextValidIndex(breakpointIndex);
        const tokenScale2 = this.tokenScales[nextBreakpoint];
        const breakpointDiff =
          this.coreLayout.breakpoints[nextBreakpoint] -
          this.coreLayout.breakpoints[breakpointIndex];
        return this.wrapProperty(
          `calc(${tokenScale.get(arg)}${this.unit} + ${tokenScale2.get(arg) -
            tokenScale.get(arg)} * ((100vw - ${
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

TokenChain.createID = () => {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};

module.exports = TokenChain;
