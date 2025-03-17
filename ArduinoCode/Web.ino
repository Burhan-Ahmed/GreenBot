#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h> // MQTT for AWS IoT
#include <ArduinoJson.h>

// Define GPIO pins for sensors
#define trigPin1 4
#define echoPin1 2

#define trigPin2 16
#define echoPin2 17

#define trigPin3 5
#define echoPin3 18

// Wi-Fi Credentials
const char* ssid = "Proton";
const char* password = "ptclbb4321";

// Vercel API Endpoint
const char* serverUrl = "https://green-bot.vercel.app/api/sensors";

// AWS IoT Core Details
const char* aws_mqtt_server = "al1d3resj96ir-ats.iot.us-east-1.amazonaws.com";  // Your AWS IoT Endpoint
const char* mqtt_topic = "sensors/data";   // Topic to publish data
const char* aws_client_id = "Plastic_Bin"; // Unique device name

// Certificates (Replace with your AWS IoT certificates)
const char* aws_root_ca = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";

const char* aws_cert = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVAPpEUhlBglXwFETs61o5FceHAK9aMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yNTAzMTcxODIy
MjhaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDPpfutc89cNCgpe0uf
qpeZJaXnE31l5fL37dAhnoD6YBW69tKRBul6FWxvISb2S3EJNq+hWKgsAmjrFQKg
1TKXX04eXh7HkIHrUQs37KRQss5cyvpk0r6H3t/peG7g0EhdJVIX8MfB8EVJQ5/F
z9tKwbtj+mjZaLR0JEvMTmczvpT9YDjJeHrs5ztAHLhq1Egy+b/DPqdxz24VC0Pr
H4NHY6UyGEPK6xKNtjhEhvCsaYU7VHzTxjtwyEjYFmLRjvQWi9dBSFNklK1C7iAf
XmGxDDTnG7o8xcymzJqRJeyuuqiGC8wR0XN66vmWDvsMW0+GB4t5rc++h9LqGNZX
n1WBAgMBAAGjYDBeMB8GA1UdIwQYMBaAFKHffPKequbxHs9bbZQ4fc8F2tyMMB0G
A1UdDgQWBBQzVPUeMtZq/Ec/IMqudHf52W5r0DAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAU+iO8cM5Tee2EEN13rNuF3ls
VyvPKFFVQOezPsZ6riRBk0sA1EE1eJoElv79ufONpJ6/Pst+HKnGoloOcNSsFEJ+
154aNyrJEf4NejNUlsJhQCHe4Plks6JkjUTx55hxEFW8/fTOK5GYnHJXqIB/k9Ja
k+Ifx48Trnn8Bv3+2eTrnrkmSxckhhRajgNU3ZNcXOZUd6KCtnJ3/QJ7EO0l6I7K
caVO+6SSkg+OOltj0NmqACbRa6WfUcYhvk9TMyTxysmJEf1MUYaPoEmpJ+4Zddzm
Diwj+V6uUZhqFv5CbSwNADzKgIB93L13mwaZKJGcCJ7+dMVxPpHm2G2EyJYnqA==
-----END CERTIFICATE-----

)EOF";

const char* aws_private_key = R"EOF(
-----BEGIN RSA PRIVATE KEY-----
MIIEpgIBAAKCAQEAz6X7rXPPXDQoKXtLn6qXmSWl5xN9ZeXy9+3QIZ6A+mAVuvbS
kQbpehVsbyEm9ktxCTavoVioLAJo6xUCoNUyl19OHl4ex5CB61ELN+ykULLOXMr6
ZNK+h97f6Xhu4NBIXSVSF/DHwfBFSUOfxc/bSsG7Y/po2Wi0dCRLzE5nM76U/WA4
yXh67Oc7QBy4atRIMvm/wz6ncc9uFQtD6x+DR2OlMhhDyusSjbY4RIbwrGmFO1R8
08Y7cMhI2BZi0Y70FovXQUhTZJStQu4gH15hsQw05xu6PMXMpsyakSXsrrqohgvM
EdFzeur5lg77DFtPhgeLea3PvofS6hjWV59VgQIDAQABAoIBAQCmlSIzJJVWAwG1
RZSFovW7hthxaNFQzgj9nWs7jU0rj6nfM+P5NPJZXpZ/ELmRHTSxj42WgulnZQeG
kHRrUp4jkfG5qwhGUUfo4Dt/wfiQROIIz03RVMBFgCdhxZwt/uoOz8HsMt4OWBM9
k2K57uaeMo2Cx4EV6UnbYsLsRHnGp8tt8Gl8o2OpzepXk6WgUkfFpWswIagBBAv1
7AxFLcW3VYZy9ogU5yK7WnldyYIW6Dw1GgJYHnmfDvOcG0qjh8/spqp/Zi42/5pS
goL/aR7+VNF/oK2d1z/WK80gMB8OAd8yCeErIrKxfcCjjP2XHRPMxqumGmYZFBeC
kcArlNWBAoGBAPXQ7aClqlaOeUM1gYak/8lxdF/fMGgIrIwYwXD54USFd3hjYJAt
0lRFBfPzzgTAaILmAGjkgMIeXVlOtd/p8YhEszECU+ox6Muog7yCqX7mdU0A4Uj3
EXJyBu6MrZiuxnTD2BHATAVSRYH6/FzHS7aHPMH+6FewacMX+6GzVKXfAoGBANhA
QY4atJZcAbymbbX13BcuDuAFBn7QOblZCSavhO5VWCn2JyG3qp/jbIsXhnBcS2T5
wh+IRnpstVK8QVDlCDa+amCRdERIusFDBSl8FS+SFsA5MBgnm+avB0DCkyGudZ48
yEeJwC6lD3y9wKfBHRmmAYOdBUruNEMg6P6+XbCfAoGBAOY8PQV1hViy80MO73V0
P5um5zAQtJ8MWMiTO0Oc1/A87gxVUBFayaBiUdQPa8wphvnrgUC9nRe0JwzJ2zGR
RcezSP7DRmOZQYjXGiRLYYPZSM7J3zhfKPk/cdym6MWUFY8yC8N8j/d/+lhnA03G
4NRiUHcHUQko07aGVQo8FDGTAoGBAMth24XP3goP7F5F1Kcu3Vk7qyfL8ijwo2mL
sIyexRH2WF3WsUUH3URU+2/xpzIjy5DjSUyouUhI11xBy9hOH6SE/71k74mNMX+0
DbXPiolcB2OwJWiCUCDsepDQrtodn2c8WUzW5FW6Tc+PExNzD3Bg7cmfsyuezq5X
1GpKFgmXAoGBALd8wYt6hgSobTNk7noznVQRsdEpU9FOMBcq45JALcH8kBoUBAty
Tf8hO9+AlRf6B9zLCW9MpAta/dR/hnwhwArlRsRjT3bIOfHKMeyLYrML7UOzUNub
7qcNJP/gWYvadK0XNmwI2QrUULVUtXqoIyH4wk7HIyBGy2QQ4kfTTdXG
-----END RSA PRIVATE KEY-----

)EOF";

// Threshold for valid readings
const int distanceThreshold = 0;

// MQTT & WiFi Clients
WiFiClientSecure wifiClient;
PubSubClient client(wifiClient);

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

// Function to send data to Vercel API
void sendDataToVercel(long d1, long d2, long d3) {
    if (WiFi.status() == WL_CONNECTED) {
        HTTPClient http;
        http.begin(serverUrl);
        http.addHeader("Content-Type", "application/json");

        // Create JSON payload
        String jsonData = String("{\"sensor1\":") + d1 +
                          ",\"sensor2\":" + d2 +
                          ",\"sensor3\":" + d3 + "}";

        int httpResponseCode = http.POST(jsonData);
        if (httpResponseCode > 0) {
            Serial.println("Data sent to Vercel: " + http.getString());
        } else {
            Serial.println("Error sending to Vercel: " + String(httpResponseCode));
        }
        http.end();
    } else {
        Serial.println("WiFi Disconnected");
    }
}

// Function to send data to AWS IoT
void sendDataToAWS(long d1, long d2, long d3) {
    if (!client.connected()) {
        Serial.println("Reconnecting to AWS IoT...");
        if (client.connect(aws_client_id)) {
            Serial.println("Connected to AWS IoT");
        } else {
            Serial.println("AWS IoT Connection Failed!");
            return;
        }
    }

    // Create JSON payload
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["sensor1"] = d1;
    jsonDoc["sensor2"] = d2;
    jsonDoc["sensor3"] = d3;
    
    char buffer[200];
    serializeJson(jsonDoc, buffer);
    
    // Publish data
    if (client.publish(mqtt_topic, buffer)) {
        Serial.println("Data sent to AWS IoT");
    } else {
        Serial.println("Failed to send data to AWS IoT");
    }
}

void setup() {
    Serial.begin(115200);

    // Set sensor pins
    pinMode(trigPin1, OUTPUT);
    pinMode(echoPin1, INPUT);

    pinMode(trigPin2, OUTPUT);
    pinMode(echoPin2, INPUT);

    pinMode(trigPin3, OUTPUT);
    pinMode(echoPin3, INPUT);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");

    // Configure AWS IoT Certificates
    wifiClient.setCACert(aws_root_ca);
    wifiClient.setCertificate(aws_cert);
    wifiClient.setPrivateKey(aws_private_key);

    // Connect to AWS IoT
    client.setServer(aws_mqtt_server, 8883);
    if (client.connect(aws_client_id)) {
        Serial.println("Connected to AWS IoT");
    } else {
        Serial.println("AWS IoT Connection Failed!");
    }
}

void loop() {
    // Measure distances
    long distance1 = measureDistance(trigPin1, echoPin1);
    long distance2 = measureDistance(trigPin2, echoPin2);
    long distance3 = measureDistance(trigPin3, echoPin3);

    // Debug output
    Serial.printf("D1: %ld cm, D2: %ld cm, D3: %ld cm\n", distance1, distance2, distance3);

    if (distance1 >= distanceThreshold && distance2 >= distanceThreshold && distance3 >= distanceThreshold) {
        // Send data to both AWS IoT and Vercel in parallel
        sendDataToVercel(distance1, distance2, distance3);
        sendDataToAWS(distance1, distance2, distance3);
    } else {
        Serial.println("Invalid distance readings, skipping transmission...");
    }

    delay(2000); // Wait before next cycle
}
