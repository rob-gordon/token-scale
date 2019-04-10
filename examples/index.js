const { TokenChain, CoreLayout } = require('../src/CoreLayout');
const TokenScale = require('../src/TokenScale');

function createPowerFunction(base = 1, growth = 1.2, decimalPlaces = 2) {
  return size =>
    parseFloat((base * Math.pow(growth, size)).toFixed(decimalPlaces));
}

const fontSize = new TokenScale(createPowerFunction(16, 1.25));
const fontSizeChain = new TokenChain([fontSize], {
  name: 'fontSize',
  wrapProperty: n => ({ '--fontSize': n }),
  unit: 'px',
  fluid: true
});
fontSizeChain.tokenScales[2] = new TokenScale(createPowerFunction(16, 1.25), {
  origin: 1
});
C = new CoreLayout({
  breakpoints: [500, 1000, 1500]
});
C.set(fontSizeChain);

// console.log(C.debug());
console.log(C.write(0, { fontSize: 2 }, false));
console.log(C.write(0, { fontSize: 2 }));
console.log(C.write(1, { fontSize: 2 }));
console.log(C.write(2, { fontSize: 2 }));
