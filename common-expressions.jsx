// Wiggle Position (random movement)
// Apply to Position property
// wiggle(frequency, amplitude)
wiggle(2, 30);

// Time (linear movement, e.g., rotation)
// Apply to Rotation property
// time * degrees per second
time * 50;

// Loop Out (ping-pong, cycle, continue)
// Apply to any property with keyframes
// loopOut(type = "cycle", numKeyframes = 0)
loopOut("cycle");

// Smooth (eases abrupt value changes)
// Apply to any property
// smooth(width = .2, samples = 5)
smooth(.2, 5);

// Bounce (after keyframe, bounces value)
// Apply to Position, Scale, Rotation, etc.
n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time){
    n--;
  }
}
if (n == 0){
  value;
}else{
  t = time - key(n).time;
  amp = .05;
  freq = 4.0;
  decay = 2.0;
  value + amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
}

// Value At Time (get value from another layer/property)
// Apply to any property
// thisComp.layer("Layer Name").transform.position.valueAtTime(time - .1);

// Random (random static value)
// Apply to any property
// random(min, max)
random(10, 100);

// Delay (follow another layer with delay)
// Apply to property you want to delay
delay = .5; // seconds
thisComp.layer("Controller").transform.position.valueAtTime(time - delay);

// Convert Expression to Slider Control
// Useful for using sliders to control properties
effect("Slider Control")("Slider");

// Posterize Time (force stepped animation)
// Apply to any property
// posterizeTime(fps)
posterizeTime(12);
value;

// Linear Interpolation (map one range to another)
// Useful for linking properties
// linear(input, inputLow, inputHigh, outputLow, outputHigh)
linear(thisComp.layer("Controller").transform.position[0], 0, 1920, 0, 100);

// Expression Control using Checkbox
// Useful for toggling effects
if (effect("Checkbox Control")("Checkbox") == 1){
  value + 50;
}else{
  value;
}
