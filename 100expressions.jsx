time*45                                   // Rotation: gira continuamente (°/s = 45)
wiggle(3,30)                              // Qualquer prop: agita (3 Hz, 30 px/°/%)
posterizeTime(8); wiggle(5,20)            // Qualquer prop: wiggle com fps limitado
valueAtTime(time-(index-1)*0.05)          // Stagger por index (atraso 0.05s)
loopOut("cycle")                          // Qualquer prop com 2+ KFs: loop
loopOut("pingpong")                       // Ping-pong
loopOut("offset")                         // Loop com deslocamento cumulativo
Math.sin(time*2*Math.PI)*50               // Oscilador (-50..50) p/ Position/Rotation
clamp(value,0,100)                        // Limitar valor numérico (Opacity)
linear(time,0,1,0,100)                    // Mapeia 0–1s para 0–100 (Opacity)
ease(time,0,1,0,100)                      // Mesmo do de cima com easing
seedRandom(index,true); random(0,100)     // Número random estável por layer
seedRandom(index+time,false); random(0,1) // Random mudando no tempo
random([0,0],[1920,1080])                 // Vetor aleatório entre 2 pontos
value + random([-10,-10],[10,10])         // Jitter leve em Position
[value[0]+100, value[1]]                  // Segue só no X (Position)
[thisComp.width/2, thisComp.height/2]     // Centraliza na comp (Position)
[value[0], value[1]+Math.sin(time)*50]    // Balanço vertical (Position)
length(thisLayer.position, [0,0])         // Distância do canto (número)
lookAt(toWorld(anchorPoint), thisComp.layer("Null 1").toWorld([0,0,0])) // Orientação 3D
radiansToDegrees(Math.atan2(value[1],value[0])) // Ângulo de vetor (Rotation 2D)
thisComp.frameDuration                     // Duração de um frame (número)
Math.round(effect("Slider")("Slider"))     // Slider arredondado
Math.floor(time)%2?0:100                   // Piscar 1Hz (Opacity)
(Math.sin(time*10)>0)?100:0                // Piscar rápido (Opacity)
valueAtTime(time-.1)                       // Amostra 0.1s atrás
100 - value                                // Inverte (Opacity)
value*[-1,1]                               // Espelha X (Scale/Position vetorial)
value*[1,-1]                               // Espelha Y
value*[2,2]                                // Dobra (Scale)
value*linear(time,0,2,0,1)                 // “fade-in” em 2s (Opacity/Scale)
ease(value,0,100,0,1)                      // Reaproveitar range de entrada (ex: Slider→0..1)
valueAtTime(marker.key(1).time)            // Congela no 1º marcador
marker.numKeys? (time>marker.key(1).time?0:100) : value // Some após 1º marker (Opacity)
thisComp.layer("Null 1").transform.position // Segue outro ponto (Position)
[thisComp.layer("A").position[0], thisComp.layer("B").position[1]] // X de A + Y de B
value + [index*20,0]                       // Escadinha por index no X
value + [0,index*20]                       // Escadinha por index no Y
valueAtTime(time-index*.03)                // Delay proporcional ao index
length(thisLayer.position, thisComp.layer("Alvo").position) // Distância a um alvo
linear(length(position,thisComp.layer("Alvo").position),0,500,100,0) // Opacity por distância
(toComp(anchorPoint))[0]                   // Coordenada X em espaço de comp
(toComp(anchorPoint))[1]                   // Coordenada Y em espaço de comp
fromComp([thisComp.width/2,thisComp.height/2]) // Ponto centro em espaço local
valueAtTime(time%key(numKeys).time)        // Loop manual até último KF
value + wiggle(2,10) - value               // Apenas variação do wiggle (remove base)
(time-inPoint)*100                         // Contador linear após inPoint (Source Text num)
(time<outPoint)?value:0                    // Some após outPoint (Opacity)
Math.abs(Math.sin(time))*100               // Pulso 0..100 (Opacity)
ease(Math.sin(time*2*Math.PI),-1,1,0,100)  // Pulso suavizado (Opacity)
posterizeTime(12); value                   // Congela prop a 12 fps
effect("Checkbox")("Checkbox")?value*2:value // Dobro com checkbox (Scale)
clamp(thisLayer.position[0],100,thisComp.width-100) // Trava X nos limites (Position X)
[clamp(value[0],100,thisComp.width-100), value[1]] // Trava X mantendo Y
value + [Math.cos(time)*50, Math.sin(time)*50] // Órbita (Position)
value * (1 + 0.1*Math.sin(time*3))         // Respiração (Scale)
index%2? value : -value                    // Alterna sinal por par/ímpar
(index-1)*thisComp.frameDuration           // Sequência temporal por index (Time Remap)
loopIn("continue")                         // Continua tendência antes do 1º KF
loopOut("continue")                        // Continua tendência após último KF
(thisComp.layer("Audio Amplitude").effect("Both Channels")("Slider")) // Amplitude de áudio
linear(thisComp.layer("Audio Amplitude").effect("Both Channels")("Slider"),0,50,100,120) // Scale pelo áudio
ease(time%1,0,1,0,100)                     // Sobe 0→100 a cada 1s (saw)
(time%2<1)? value : -value                 // Inverte a cada 1s
valueAtTime(Math.max(inPoint,time-.2))     // Atraso com clamp no inPoint
Math.min(value, effect("Max")("Slider"))   // Aplica teto via Slider
Math.max(value, effect("Min")("Slider"))   // Aplica piso via Slider
thisComp.layer(index-1).transform.position // Copia posição da layer anterior
thisComp.layer(index+1).transform.position // Copia da próxima (se existir)
random([value[0]-20,value[1]-20],[value[0]+20,value[1]+20]) // Tremor em volta
value + noise(time*2)*20                   // Ruído Perlin-like (AE: noise) se disponível
rgbToHsl(value)[0]                         // Hue do valor de cor atual
hslToRgb([time%1,1,.5])                    // Cor arco-íris animada (Color)
sampleImage([width/2,height/2],[10,10],true,time)[0]*100 // Lê luminância no centro (0..100)
text.sourceText.toUpperCase()              // Texto: maiúsculas (Source Text)
text.sourceText.toLowerCase()              // Texto: minúsculas (Source Text)
(""+Math.round(effect("Slider")("Slider"))) // Texto a partir de Slider (inteiro)
(effect("Slider")("Slider")).toFixed(2)    // Texto com 2 casas decimais
value + [random(-5,5),random(-5,5)]        // Micro-jitter 2D
thisLayer.hasParent? parent.position : value // Segue pai se existir
valueAtTime(time - framesToTime(3))        // Amostra 3 frames atrás
value + (valueAtTime(time-.05)-value)*-0.5 // “inércia” simples
ease(length(velocity),0,100,0,50)          // Intensidade por velocidade (ex: motion blur fake)
velocityAtTime(time)[0]                    // Velocidade no eixo X
length(velocity)                           // Módulo da velocidade
value + normalize([random(-1,1),random(-1,1)])*20 // Passo aleatório normalizado
normalize(value)*(length(value)+10)        // Empurra 10 na direção atual
(toWorld([0,0,0]))[2]                      // Z em mundo (para 3D)
value*Math.pow(0.5,time)                   // Decaimento exponencial
ease(time-inPoint,0,1,0,100)               // Fade-in 1s após inPoint (Opacity)
ease(outPoint-time,0,1,0,100)              // Fade-out 1s antes do outPoint
(index-1)*20 + value                       // Offset linear por index (numérico)
value*(1 + (index-1)*.05)                  // Escalonar por index (Scale)
thisComp.layer("Null 1").transform.position + [100,-50] // Segue com offset
length(position, thisComp.layer("Alvo").position)<200?100:0 // Aparece perto do alvo (Opacity)
temporalWiggle(2,30)                       // Wiggle temporal (se disponível na sua versão)
smooth(6,5)                                // Suaviza variações rápidas
valueAtTime(key(1).time + (time-inPoint))  // Reproduz a partir do 1º KF após inPoint
timeToFrames(time)%2? value : value*0.9    // “pulsinho” a cada frame alternado
value + [0, ease(Math.sin(time),-1,1,-30,30)] // Balanço vertical suave (Position)
