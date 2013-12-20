var test = require('tap').test,
    createSimulator = require('..'),
    physics = require('ngraph.physics.primitives');

test('Can step without bodies', function (t) {
  var simulator = createSimulator();
  t.equals(simulator.bodies.length, 0, 'Thee should be no bodies');
  simulator.step(1);
  t.end();
});

test('Does not update position of one body', function (t) {
  var simulator = createSimulator();
  var body = new physics.Body(0, 0);
  simulator.addBody(body);

  simulator.step(1);
  t.equals(simulator.bodies.length, 1, 'Number of bodies is 1');
  t.equals(simulator.bodies[0], body, 'Body points to actual object');
  t.equals(body.pos.x, 0, 'X is not changed');
  t.equals(body.pos.y, 0, 'Y is not changed');
  t.end();
});

test('Updates position for two bodies', function (t) {
  var simulator = createSimulator();
  var body1 = new physics.Body(-1, 0);
  var body2 = new physics.Body(1, 0);
  simulator.addBody(body1);
  simulator.addBody(body2);

  simulator.step(1);
  t.equals(simulator.bodies.length, 2, 'Number of bodies is 2');
  t.ok(body1.pos.x !== 0, 'Body1.X has changed');
  t.ok(body2.pos.x !== 0, 'Body2.X has changed');

  t.equals(body1.pos.y, 0, 'Body1.Y has not changed');
  t.equals(body2.pos.y, 0, 'Body2.Y has not changed');
  t.end();
});

test('add spring should not add bodies', function (t) {
  var simulator = createSimulator();
  var body1 = new physics.Body(-1, 0);
  var body2 = new physics.Body(1, 0);

  simulator.addSpring(body1, body2, 10);

  t.equals(simulator.bodies.length, 0, 'Should not add two bodies');
  t.equals(simulator.bodies.length, 0, 'Should not add two bodies');
  t.end();
});

test('Spring affects bodies positions', function (t) {
  var simulator = createSimulator();
  var body1 = new physics.Body(-10, 0);
  var body2 = new physics.Body(10, 0);
  simulator.addBody(body1);
  simulator.addBody(body2);
  // If you take this out, bodies will repel each other:
  simulator.addSpring(body1, body2, 1);

  simulator.step(1);

  t.ok(body1.pos.x > -10, 'Body 1 should move towards body 2');
  t.ok(body2.pos.x < 10, 'Body 2 should move towards body 1');

  t.end();
});
