const runs = 10;

function measureOneLine() {
  const LINE_SIZE = 16; // 64/sizeof(int)
  let result = [];

  // Fill with -1 to ensure allocation
  const M = new Array(runs * LINE_SIZE).fill(-1);

  for (let i = 0; i < runs; i++) {
    const start = performance.now();
    let val = M[i * LINE_SIZE];
    const end = performance.now();

    result.push(end - start);
  }

  return result;
}

function measureNLines() {
  let result = [];

  // TODO: Exercise 1-1

  const totalMeasures=100000; // Nao tem como garantir miss, mas deve ser o suficiente
  const LINE_SIZE = 16; // 64/sizeof(int)
  const M = new Array(totalMeasures * LINE_SIZE).fill(-1);

  //fazer 10 medicoes de 1 - 10kk
  for (let i = 1; i < totalMeasures; i=i*10) {
    const start = performance.now();
    for (let j=0 ; j < i; j++){
        let val = M[ (i * LINE_SIZE) % M.length];
    }
    
    const end = performance.now();
    result.push(end - start);
  }

  /*
  1 Cache Line: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  N Cache Lines: [0, 0, 0, 0, 0.20000000018626451, 0.7000000001862645, 1.5]
 */
  return result;
}

document.getElementById(
  "exercise1-values"
).innerText = `1 Cache Line: [${measureOneLine().join(", ")}]`;

document.getElementById(
  "exercise2-values"
).innerText = `N Cache Lines: [${measureNLines().join(", ")}]`;