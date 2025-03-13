#include <Servo.h>

#define DIR_PIN 5      // Direction pin connected to DIR on A4988
#define STEP_PIN 2     // Step pin connected to STEP on A4988
#define ENABLE_PIN 8   // Enable pin connected to EN on A4988
#define SERVO1_PIN 11  // Servo for y-axis
#define SERVO2_PIN 10  // Servo for z-axis
#define SERVO3_PIN 9   // Servo for z-axis

const int HomingSwitchX = 12;  // Pin for homing switch (X-axis)
const int DefaultSteps = 100;  // Default location 100 steps away from the homing switch

Servo yServo;  // Servo object for Y-axis control
Servo zServo;  // Servo object for Z-axis control
Servo gripServo;

// Define homing angles for the servos
const int HOMING_ANGLE_Y = 70;  // Set this to the desired Y-axis angle at home position
const int HOMING_ANGLE_Z = 90;  // Set this to the desired Z-axis angle at home position

void setup() {
  pinMode(DIR_PIN, OUTPUT);
  pinMode(STEP_PIN, OUTPUT);
  pinMode(ENABLE_PIN, OUTPUT);
  pinMode(HomingSwitchX, INPUT_PULLUP);  // Initialize homing switch with pull-up resistor

  digitalWrite(ENABLE_PIN, LOW);  // Enable motor driver

  yServo.attach(SERVO1_PIN);
  zServo.attach(SERVO2_PIN);
  gripServo.attach(SERVO3_PIN);

  Serial.begin(9600);  // Start serial communication at 9600 baud rate

  Homing_XAxis();  // Perform homing on X-axis with servos positioned at homing angles
}

void loop() {
  // Define arrays for steps and coordinates for each box
  int steps[3] = { 3100, 2900, 3300 };                             // Steps to move to each box
  int coordinates[][2] = { { 10, 20 }, { 10, 35 }, { 10, 30 } };  // YZ coordinates for each box
  int BinNumber[3] = { 1, 2, 3 };                                  // Bin numbers for each box

  for (int i = 0; i < 3; i++) {
    // Move along the X-axis to the object position
    Move_xLinear(steps[i]);
    delay(1000);  // Wait to simulate reaching the object
                  // Drop any item at the initial position
                  // delay(1000);
    // Move along the Y and Z coordinates to the object
    Move_YZ(coordinates[i][0], coordinates[i][1]);

    delay(1000);  // Wait before picking up
    pick();       // Pick the object
    delay(1000);

    // Move to bin position
    Move_YZ(70, 90);  // Adjust based on your bin drop-off coordinates
    delay(1000);

    // Move the object to the correct bin based on BinNumber
    if (BinNumber[i] == 1) {
      MoveInverse_xLinear(1800);  // Move to Bin 1
    } else if (BinNumber[i] == 2) {
      MoveInverse_xLinear(2000);  // Move to Bin 2
    } else {
      MoveInverse_xLinear(2200);  // Default case
    }
    delay(1000);
    // Drop the item into the bin
    drop();
    delay(1000);

    // Return to pick position for next object
    Homing_XAxis();
    delay(1000);
  }
}

// Function to home the X-axis using the homing switch
void Homing_XAxis() {
  // Once X-axis is homed, move servos to homing angles
  Move_YZ(HOMING_ANGLE_Y, HOMING_ANGLE_Z);  // Move Y-axis servo to homing angle

  digitalWrite(DIR_PIN, LOW);

  // Move the X-axis until it hits the homing switch
  while (digitalRead(HomingSwitchX) == HIGH) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);
  }

  MoveAwayFromHome(DefaultSteps);  // Move X-axis a specified distance away from the home switch
}

// Function to move X-axis away from home
void MoveAwayFromHome(int steps) {
  digitalWrite(DIR_PIN, HIGH);  // Set direction away from the homing switch

  for (int i = 0; i < steps; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);  // Control the speed
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);  // Control the speed
  }
}
// Function to move the X-axis forward (towards the object)
void Move_xLinear(int steps) {
  //int steps = 500;  // Example number of steps to move forward

  digitalWrite(DIR_PIN, HIGH);  // Set direction forward
  for (int i = 0; i < steps; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);  // Control the speed
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);  // Control the speed
  }
}

// Function to move the X-axis backward (return to initial position)
void MoveInverse_xLinear(int steps) {
  //int steps = 500;  // Example number of steps to move back

  digitalWrite(DIR_PIN, LOW);  // Set direction backward
  for (int i = 0; i < steps; i++) {
    digitalWrite(STEP_PIN, HIGH);
    delayMicroseconds(1000);  // Control the speed
    digitalWrite(STEP_PIN, LOW);
    delayMicroseconds(1000);  // Control the speed
  }
}

void Move_YZ(int targetAngleY, int targetAngleZ) {
  int currentAngleY = yServo.read();
  int currentAngleZ = zServo.read();
  int stepDelay = 12;  // Adjust for smoothness

  // Determine direction of movement for both servos
  bool moveUpY = currentAngleY < targetAngleY;
  bool moveUpZ = currentAngleZ < targetAngleZ;

  // Loop until both servos reach their target angles
  while ((moveUpY ? currentAngleY < targetAngleY : currentAngleY > targetAngleY) || (moveUpZ ? currentAngleZ < targetAngleZ : currentAngleZ > targetAngleZ)) {
    // Update Y-axis servo angle if it hasn't reached the target
    if (moveUpY ? currentAngleY < targetAngleY : currentAngleY > targetAngleY) {
      currentAngleY += moveUpY ? 1 : -1;
      yServo.write(currentAngleY);
    }

    // Update Z-axis servo angle if it hasn't reached the target
    if (moveUpZ ? currentAngleZ < targetAngleZ : currentAngleZ > targetAngleZ) {
      currentAngleZ += moveUpZ ? 1 : -1;
      zServo.write(currentAngleZ);
    }

    delay(stepDelay);  // Delay for smooth motion
  }
}

// Function to pick an object (close the gripper)
void drop() {
  int startAngle = 0;  // Starting angle (gripper open)
  int endAngle = 50;   // Final angle (gripper closed)
  int stepDelay = 12;  // Delay between steps for smooth movement

  for (int angle = startAngle; angle <= endAngle; angle++) {
    gripServo.write(angle);  // Move the servo to the current angle
    delay(stepDelay);        // Wait before the next step
  }

  delay(1000);  // Optional delay after reaching the final position
}

// Function to drop an object (open the gripper)
void pick() {
  int startAngle = 50;  // Starting angle (gripper closed)
  int endAngle = 0;     // Final angle (gripper open)
  int stepDelay = 12;   // Delay between steps for smooth movement

  for (int angle = startAngle; angle >= endAngle; angle--) {
    gripServo.write(angle);  // Move the servo to the current angle
    delay(stepDelay);        // Wait before the next step
  }

  delay(1000);  // Optional delay after reaching the final position
}
