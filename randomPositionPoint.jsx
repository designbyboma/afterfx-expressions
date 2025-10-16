/* gera valor randomico de de positon em x, y de acordo com o slider control */

// Referência ao Point Control (mínimo e máximo)
pMin = thisComp.layer("Null 1").effect("Min Point")("Point");   // Ex: (0, 0)
pMax = thisComp.layer("Null 1").effect("Max Point")("Point");   // Ex: (1080, 1920)

// Controle de atualização
seedRandom(Math.floor(timeToFrames(time) / 5), true); // muda a cada 5 frames (ajuste o divisor se quiser mais/menos frequência)

// Gera valor aleatório entre os limites
x = random(pMin[0], pMax[0]);
y = random(pMin[1], pMax[1]);

[x, y];
