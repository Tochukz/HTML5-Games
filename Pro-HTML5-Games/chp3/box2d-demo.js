// Declare all the commonly used objects as variables for convenience 
const b2Vec2 = Box2D.Common.Math.b2Vec2;
const b2BodyDef = Box2D.Dynamics.b2BodyDef;
const b2Body = Box2D.Dynamics.b2Body;
const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
const b2World = Box2D.Dynamics.b2World;
const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
const b2RevoluteJointDEf = Box2D.Dynamics.Joints.b2RevoluteJointDef;

let world; 
// 30 pixels on our canvas correspond to 1 meter in the box2d world
const scale = 30;

function init() {
    // Setup te box2dworld that will do mose of the physics calculation
    const gravity = new b2Vec2(0, 9.8); // b2Vec2(x, y) Declare gravity as 9.8 m/s^2 downward. 

    // Allow objects that are at rest to fall asleep and be excluded from calculations
    // This will help improve performance. If an object is asleep, it will wake up if a moving body collides with it. 
    const allowSleep = true;

    world = new b2World(gravity, allowSleep);
}

function createFloow() {
    // A body definition holds all the data needed to construct a rigid body
    const bodyDef = new b2BodyDef;

    bodyDef.type = b2Body.b2_staticBody;
    bodyDef.position.x = 640 / 2 / scale;
    bodyDef.position.y = 450 / scale;

    // A fixture is used to attach a shape to body collision detection 
    // A fixture definition is used to create a fixture
    const fixtureDef = new b2FixtureDef;

    fixtureDef.density = 1.0;
    fixtureDef.friction = 0.5;
    fixtureDef.restitution = 0.2;

    fixtureDef.shape = new b2PolygonShape;
    ficture.shape.SetAsBox(320 / scale, 10 / scale); // 640 pixels wide and 20 pixels tall

    const body = world.CreateBody(bodyDef);
    const fixture = body.CreateFixture(fixtureDef);
}