// =============================================================
// CORE MOTION EXPRESSIONS
// =============================================================

// Wiggle Position (random but smooth movement)
// Apply to Position or any property
// wiggle(frequency, amplitude)
wiggle(2, 30);

// Wiggle with Slider Controls (link frequency & amplitude)
// Apply to Position, add Slider Controls named Frequency & Amplitude
freq = effect("Frequency")("Slider");
amp = effect("Amplitude")("Slider");
wiggle(freq, amp);

// Wiggle Only on X Axis (lock Y & Z)
// Apply to 2D/3D Position
freq = 2;
amp = 40;
w = wiggle(freq, amp);
if (value.length > 2){
  [w[0], value[1], value[2]];
}else{
  [w[0], value[1]];
}

// Time-based Rotation (continuous spin)
// Apply to Rotation property
// time * degrees per second
time * 50;

// Value Follows Another Layer with Delay (trailing motion)
// Apply to property you want to offset (e.g., Position)
delay = .5; // seconds
thisComp.layer("Controller").transform.position.valueAtTime(time - delay);

// Follow Target with Spring (elastic catch-up)
// Apply to Position, reference a layer named "Target"
target = thisComp.layer("Target").transform.position;
stiffness = 5; // higher = snappier
mass = 1;
damping = .7; // closer to 1 = less overshoot
delta = target - value;
force = delta * stiffness;
accel = force / mass;
vel = velocity + accel * thisComp.frameDuration;
value + vel / (1 + damping);

// Orbit Around Point (circular motion)
// Apply to Position, requires Slider Controls for Radius & Speed
radius = effect("Radius")("Slider");
speed = effect("Speed")("Slider");
center = thisComp.layer("Center").transform.position;
angle = time * speed;
[center[0] + Math.cos(angle) * radius, center[1] + Math.sin(angle) * radius];

// Look At Two Points (3D layer auto-orients)
// Apply to Orientation of a 3D layer
from = toWorld(anchorPoint);
targetPos = thisComp.layer("Target").toWorld(thisComp.layer("Target").anchorPoint);
lookAt(from, targetPos);

// Parent Scale Compensation (keep child scale at 100%)
// Apply to Scale of child layer to neutralize parent scaling
parentScale = parent.transform.scale / 100;
if (value.length > 2){
  [value[0]/parentScale[0], value[1]/parentScale[1], value[2]/parentScale[2]];
}else{
  [value[0]/parentScale[0], value[1]/parentScale[1]];
}

// =============================================================
// TIMING, LOOPS, AND VELOCITY TOOLS
// =============================================================

// Smooth (softens abrupt changes in noisy data)
// Apply to any property
// smooth(width = .2, samples = 5)
smooth(.2, 5);

// Ease between Two Values (set custom ranges)
// Apply where you need a gentle interpolation
ctrl = effect("Slider Control")("Slider");
ease(ctrl, 0, 100, 20, 80);

// Clamp Value (prevent it from going outside range)
// Apply anywhere a limit is needed
clamp(value, 0, 100);

// Posterize Time (create stepped animation)
// Apply before property expression
posterizeTime(12);
value;

// Loop Out Keyframes (cycle through keys)
// Apply to property with keyframes
loopOut("cycle");

// Ping-Pong Loop (plays forward then backward)
// Apply to property with keyframes
loopOut("pingpong");

// Loop with Extra Hold Frames
// Apply to property with keyframes; holds last key for 12 frames
loopOutDuration("cycle", 12 * thisComp.frameDuration);

// Bounce Back After Keyframe (overshoot effect)
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

// Inertial Bounce (natural falloff after movement)
freq = 2;
decay = 4;
n = 0;
if (numKeys > 0){
  n = nearestKey(time).index;
  if (key(n).time > time){
    n--;
  }
}
if (n > 0){
  t = time - key(n).time;
  v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
  value + v * Math.sin(freq * t * 2 * Math.PI)/Math.exp(decay * t);
}else{
  value;
}

// Time Remap Ease Out (slow into last key)
// Apply to Time Remap property
k1 = key(numKeys - 1).time;
k2 = key(numKeys).time;
linear(time, k1, k2, valueAtTime(k1), valueAtTime(k2));

// Value At Time Helper (sample another property)
// Apply to any property
thisComp.layer("Layer Name").transform.position.valueAtTime(time - .1);

// Time Offset by Layer Index (stagger layers)
// Apply to any property referencing same property on master layer
offset = index * .1;
thisComp.layer("Master").transform.position.valueAtTime(time - offset);

// =============================================================
// CONTROLS, RANDOMNESS, AND UTILITY
// =============================================================

// Convert Slider to Degrees (handy for tying UI to rotation)
// Apply to Rotation property with a Slider Control
effect("Slider Control")("Slider");

// Multiplier via Checkbox (toggle boost)
// Apply to any numerical property
if (effect("Checkbox Control")("Checkbox") == 1){
  value * 2;
}else{
  value;
}

// Random Static Value (seeded per layer)
// Apply to any property
seedRandom(index, true);
random(10, 100);

// Noise-based Flicker (subtle brightness variation)
// Apply to Opacity or Exposure controls
seedRandom(time + index, false);
random(75, 100);

// Blink Using Checkbox (toggle visibility)
// Apply to Opacity with Checkbox Control named Blink
blink = effect("Blink")("Checkbox");
if (blink == 1 && Math.sin(time * Math.PI * 2) > 0){
  100;
}else{
  0;
}

// Auto Fade In & Out (based on layer in/out points)
// Apply to Opacity
fadeIn = .5; // seconds
fadeOut = .5; // seconds
fadeUp = clamp(linear(time, inPoint, inPoint + fadeIn, 0, 1), 0, 1);
fadeDown = clamp(linear(time, outPoint - fadeOut, outPoint, 1, 0), 0, 1);
value * fadeUp * fadeDown;

// Marker-driven Hold (switch values on layer markers)
// Apply to any property referencing marker comments
defaultValue = value;
markerValue = defaultValue;
if (thisLayer.marker.numKeys > 0){
  m = thisLayer.marker.nearestKey(time);
  if (m.time <= time){
    markerValue = parseFloat(m.comment);
  }
}
markerValue;

// Delay Driven by Slider (offset animation by custom amount)
// Apply to property you want to offset, add Slider named Delay (seconds)
delayCtrl = effect("Delay")("Slider");
thisProperty.valueAtTime(time - delayCtrl);

// Checkbox-driven Layer Visibility (on/off switch)
// Apply to Opacity
if (effect("Visible")("Checkbox") == 1){
  100;
}else{
  0;
}

// =============================================================
// TEXT AND SHAPE HELPERS
// =============================================================

// Auto-scaling Shape Layer to Fit Text
// Apply to Rectangle Path > Size property
t = thisComp.layer("Text Layer");
pad = 40; // pixels of padding
s = t.sourceRectAtTime(time, false);
[s.width + pad, s.height + pad];

// Typewriter Reveal (per-character delay)
// Apply to Source Text property on a text layer
doc = value;
txt = doc.text;
rate = effect("Characters Per Second")("Slider");
rate = Math.max(1, rate);
chars = txt.length;
idx = Math.floor(linear(time, inPoint, inPoint + chars/rate, 0, chars));
idx = Math.max(0, Math.min(chars, idx));
newDoc = doc;
newDoc.text = txt.substr(0, idx);
newDoc;

// Countdown Timer (mm:ss)
// Apply to Source Text property
startSeconds = 60;
remaining = Math.max(0, startSeconds - (time - inPoint));
minutes = Math.floor(remaining/60);
seconds = Math.floor(remaining % 60);
doc = value;
newDoc = doc;
newDoc.text = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
newDoc;
