#define BLYNK_PRINT Serial


#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>
#include <SimpleDHT.h>

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "R4txN3R4EID5h4MWHI0rz8DFMbCOkeeU";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "AndroidAP";
char pass[] = "tai100865";
//char ssid[] = "TRUONG";
//char pass[] = "123456789";

int pinDHT11 = 4;
SimpleDHT11 dht11;
byte temperature = 0;
byte humidity = 0;
WidgetLED led1(V1);
WidgetLCD lcd(V6);

BlynkTimer timer;

// V1 LED Widget is blinking
// day du lieu len app blynk
void blinkLedWidget() // kiem tra xem co ket noi voi blynk chua
{
  if (led1.getValue()) {
    led1.off();
    Serial.println("LED on V1: off");
  } else {
    led1.on();
    Serial.println("LED on V1: on");
  }
}

// phong khach
BLYNK_WRITE(V0)
{
    int pinvalue0 = param.asInt();
    // String i = param.asStr();
    // double d = param.asDouble();
    digitalWrite(25,pinvalue0);
    // gui ve app blynk
    // Blynk.virtualWrite(V2,pinvalue);
}

// phong bep
BLYNK_WRITE(V2)
{
    int pinvalue1 = param.asInt();
    // String i = param.asStr();
    // double d = param.asDouble();
    digitalWrite(26,pinvalue1);
    // gui ve app blynk
    // Blynk.virtualWrite(V2,pinvalue);
}

// phong ngu
BLYNK_WRITE(V3)
{
    int pinvalue2 = param.asInt();
    // String i = param.asStr();
    // double d = param.asDouble();
    digitalWrite(27,pinvalue2);
    // gui ve app blynk
    // Blynk.virtualWrite(V2,pinvalue);
}

// DHT- nhiet do do am
void sendSensor()
{
  // You can send any value at any time.
  // Please don't send more that 10 values per second.
  Blynk.virtualWrite(V5, humidity);
  Blynk.virtualWrite(V4, temperature);
  Serial.print("Nhiet do: " +String(temperature));
  Serial.println("  Do am: " +String(humidity)); 
}

void setup()
{
  // Debug console
  Serial.begin(9600);
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print("dang ket noi....");
  }

  Serial.println("WiFi da ket noi");  

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 80);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8080);

  timer.setInterval(1000L, blinkLedWidget);
  timer.setInterval(1000L, sendSensor);
  
  pinMode(25,OUTPUT);
  pinMode(26,OUTPUT);
  pinMode(27,OUTPUT);
}

void loop()
{
  readDHT11();
  Blynk.run();
  timer.run();
  delay(1000);
}

void readDHT11()
{
  // start working...
  Serial.println("=================================");
  Serial.println("Sample DHT11...");
  
  // read without samples.
  if (dht11.read(pinDHT11, &temperature, &humidity, NULL)) {
    Serial.print("Read DHT11 failed.");
  }  
}
