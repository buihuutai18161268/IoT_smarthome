#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SimpleDHT.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd (0x27, 16,2); // Tạo đối tượng LCD và chỉ định các chân

#define WIFI_SSID "AndroidAP"
#define WIFI_PASSWORD "tai100865"

#define FIREBASE_HOST "https://ttiots-ff1e4-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "VeWpvhdazRsRKH1xe2mNogFWEEbcxmdsbnPf5Wwj"

FirebaseData fbdo;
String path;
String path1;
String path2;

#define LED 2
#define ml 25
int pinDHT11 = 4;
SimpleDHT11 dht11;
byte temperature = 0;
byte humidity = 0;

const int ledPin = GPIO_NUM_16; //RX2
// setting PWM properties
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;

String maylanh;
int nhietdoml;
//LCD độ C
byte degree[8] = {
  0B01110,
  0B01010,
  0B01110,
  0B00000,
  0B00000,
  0B00000,
  0B00000,
  0B00000
};

void setup() {
  Serial.begin(9600);
  pinMode(ml, OUTPUT);
  // put your setup code here, to run once:
  ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(ledPin, ledChannel);
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
  path = "/PHONGNGU"; 
  path1 = "/PHONGBEP"; 
  path2 = "/PHONGKHACH";

  lcd.init(); // LCD 16x2
  lcd.backlight();
  lcd.setCursor(0, 0); //(cot,hang) cot:0-15,hang:0-1
  lcd.print("LV");
  lcd.createChar(1, degree); // độ C
  
  lcd.setCursor(5, 0); //(cot,hang) cot:0-15,hang:0-1
  lcd.print("ML:");
  lcd.setCursor(11, 0); //(cot,hang) cot:0-15,hang:0-1
  lcd.print("_");
}

void loop() {
  // put your main code here, to run repeatedly:
     readDHT11();
     Firebase.setInt(fbdo, path + "/NHIETDO",temperature); // GỬI DỮ LIỆU NHIỆT ĐỘ LÊN firebase 
     Firebase.setInt(fbdo, path + "/DOAM",humidity);  //GỬI DỮ LIỆU ĐỘ ẨM LÊN firebase  
     
      if(Firebase.getString(fbdo,path2 + "/MAYLANH"))
      {
        if(fbdo.stringData() == "ON")
        {
           digitalWrite(ml, HIGH);
           lcd.setCursor(8, 0); //(cot,hang) cot:0-15,hang:0-1
           lcd.print("ON ");
        }
        else if(fbdo.stringData()== "OFF")
        {
          digitalWrite(ml, LOW);
          lcd.setCursor(8, 0); //(cot,hang) cot:0-15,hang:0-1
          lcd.print("OFF");
        }
      }

      if(Firebase.getInt(fbdo,path2 + "/NHIETDO"))
      {
        lcd.setCursor(12, 0); //(cot,hang) cot:0-15,hang:0-1
        lcd.print(fbdo.intData());
        lcd.setCursor(14, 0); //(cot,hang) cot:0-15,hang:0-1
        lcd.write(1);
        lcd.setCursor(15, 0);
        lcd.print("C");
      }
      
      if(Firebase.getString (fbdo,path1 + "/CANHBAO"))
  {
    Serial.println("Download success: " + String(fbdo.stringData()));
    if(fbdo.stringData() == "1")
       ledcWrite(ledChannel, 10);
      else if(fbdo.stringData() == "2")
       ledcWrite(ledChannel, 30);
       else if(fbdo.stringData() == "3")
       ledcWrite(ledChannel, 50);
       else if(fbdo.stringData() == "4")
       ledcWrite(ledChannel, 70);
       else if(fbdo.stringData() == "5")
       ledcWrite(ledChannel, 100);
       else if(fbdo.stringData() == "6")
       ledcWrite(ledChannel, 120);
       else if(fbdo.stringData() == "7")
       ledcWrite(ledChannel, 150);
       else if(fbdo.stringData() == "8")
       ledcWrite(ledChannel, 170);
       else if(fbdo.stringData() == "9")
       ledcWrite(ledChannel, 230);
       else if(fbdo.stringData() == "10")
       ledcWrite(ledChannel, 255);   
    else if(fbdo.stringData() == "0")
     ledcWrite(ledChannel, 0);    
    lcd.setCursor(2, 0);
    lcd.print((fbdo.stringData()));
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
  lcd.setCursor(0, 1);
   lcd.print("T=");
   lcd.setCursor(2, 1);
   lcd.print(temperature);
   lcd.setCursor(4, 1);
   lcd.write(1);
   lcd.setCursor(5, 1);
   lcd.print("C");
   
   lcd.setCursor(7, 1);
   lcd.print("H=");
   lcd.setCursor(9, 1);
   lcd.print(humidity);
   lcd.setCursor(11, 1);
   lcd.print("%");
  
  // read without samples.
  if (dht11.read(pinDHT11, &temperature, &humidity, NULL)) {
    Serial.print("Read DHT11 failed.");
  }  
}
