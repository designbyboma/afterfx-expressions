/* Alterar a cada 5 frames um base 22 caracters da lista */


// Número de caracteres
n = 22;

// Conjunto de caracteres possíveis
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Função que gera string aleatória
function randomCode(n){
  s = "";
  for(i = 0; i < n; i++){
    s += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return s;
}

// Gera novo código a cada 5 frames
seedRandom(Math.floor(timeToFrames(time) / 5), true);
randomCode(n).toLowerCase();
