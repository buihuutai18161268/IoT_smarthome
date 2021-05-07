//This example shows how to read, store and update database using get, set, push and update functions.

#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SimpleDHT.h>

#define WIFI_SSID "AndroidAP"
#define WIFI_PASSWORD "tai100865"
//#define WIFI_SSID "TRET"
//#define WIFI_PASSWORD "tret02091945"
//#define WIFI_SSID "Coffee 24/24 Lau Tret 2"
//#define WIFI_PASSWORD "khachhanglaso1"

#define FIREBASE_HOST "https://ttiots-ff1e4-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "VeWpvhdazRsRKH1xe2mNogFWEEbcxmdsbnPf5Wwj"

//Define FirebaseESP32 data object
FirebaseData fbdo;
int i;
String path;
#define LED 2

int pinDHT11 = 4;
SimpleDHT11 dht11;


byte temperature = 0;
byte humidity = 0;

void setup()
{
  i = 0;

  pinMode(LED, OUTPUT);
  
  Serial.begin(9600);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

 
  //Set database read timeout to 1 minute (max 15 minutes)
  Firebase.setReadTimeout(fbdo, 1000 * 60);
  //tiny, small, medium, large and unlimited.
  //Size and its write timeout e.g. tiny (1s), small (10s), medium (30s) and large (60s).
  Firebase.setwriteSizeLimit(fbdo, "tiny");

  path = "/IoTLab"; 
  Firebase.setDouble(fbdo, path + "/Data",123);

}
void loop()
{
  readDHT11();
  Firebase.setInt(fbdo, path + "/Temp",temperature);
  Firebase.setInt(fbdo, path + "/Humi",humidity);
  
  
  i++;
  if(Firebase.setDouble(fbdo, path + "/Data",i))
  {
    Serial.println("Upload success");  
  }else
  {
    Serial.println("Upload fail");  
  }
  
  if(Firebase.getDouble (fbdo, path + "/DownData"))
  {
    Serial.println("Download success: " + String(fbdo.doubleData()));
    if(fbdo.doubleData() == 1)
      digitalWrite(LED, HIGH);
    else
      digitalWrite(LED, LOW);   
  }else {
    Serial.println("Download fail: " + String(fbdo.doubleData())); 
  }
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
