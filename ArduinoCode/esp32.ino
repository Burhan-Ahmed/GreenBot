#include <WiFi.h>
#include <HTTPClient.h>

// Define GPIO pins for 3 sensors
#define trigPin1 4
#define echoPin1 2

#define trigPin2 16
#define echoPin2 17

#define trigPin3 5
#define echoPin3 18

// Replace with your Wi-Fi credentials
const char* ssid = "Proton";
const char* password = "ptclbb4321";

// Your Vercel backend endpoint to post data
const char* serverUrl = "https://green-bot.vercel.app/api/sensors"; 

// Threshold for valid distance readings
const int distanceThreshold = 2; // Minimum valid distance in cm

void setup() {
    Serial.begin(9600);

    // Set pins for each sensor
    pinMode(trigPin1, OUTPUT);
    pinMode(echoPin1, INPUT);

    pinMode(trigPin2, OUTPUT);
    pinMode(echoPin2, INPUT);

    pinMode(trigPin3, OUTPUT);
    pinMode(echoPin3, INPUT);

    WiFi.begin(ssid, password);

    // Wait for connection
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

// Function to measure distance for a given sensor
long measureDistance(int trigPin, int echoPin) {
    long duration, distance;
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    duration = pulseIn(echoPin, HIGH);
    distance = duration * 0.034 / 2;
    return distance;
}

void loop() {
    // Measure distances from all 3 sensors
    long distance1 = measureDistance(trigPin1, echoPin1);
    long distance2 = measureDistance(trigPin2, echoPin2);
    long distance3 = measureDistance(trigPin3, echoPin3);

    // Debugging output
    Serial.print("Distance 1: ");
    Serial.print(distance1);
    Serial.println(" cm");

    Serial.print("Distance 2: ");
    Serial.print(distance2);
    Serial.println(" cm");

    Serial.print("Distance 3: ");
    Serial.print(distance3);
    Serial.println(" cm");

    // Check if all distances are valid before sending
    if (distance1 >= distanceThreshold && 
        distance2 >= distanceThreshold && 
        distance3 >= distanceThreshold) {

        if (WiFi.status() == WL_CONNECTED) {
            HTTPClient http;

            // Specify the request destination
            http.begin(serverUrl);
            http.addHeader("Content-Type", "application/json");

            // Create JSON data with all sensor readings
            String jsonData = String("{\"sensor1\":") + distance1 +
                              ",\"sensor2\":" + distance2 +
                              ",\"sensor3\":" + distance3 + "}";

            // Send the request
            int httpResponseCode = http.POST(jsonData);

            if (httpResponseCode > 0) {
                String response = http.getString(); // Get the response
                Serial.println(httpResponseCode);   // Print return code
                Serial.println(response);           // Print response
            } else {
                Serial.print("Error on sending POST: ");
                Serial.println(httpResponseCode);
            }

            // Close connection
            http.end();
        } else {
            Serial.println("WiFi Disconnected");
        }
    } else {
        Serial.println("Invalid distance reading, ignoring...");
    }

    delay(500); // Delay before the next loop
}
