
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <SimpleDHT.h>

//#define WIFI_SSID "D305_SV_2.4Ghz"
//#define WIFI_PASSWORD "132132132"
#define WIFI_SSID "AndroidAP"
#define WIFI_PASSWORD "tai100865"

#define FIREBASE_HOST "https://ttiots-ff1e4-default-rtdb.firebaseio.com/"
#define FIREBASE_AUTH "VeWpvhdazRsRKH1xe2mNogFWEEbcxmdsbnPf5Wwj"
//Define FirebaseESP32 data object
FirebaseData fbdo;
int i;
String path;
String path1;
#define LED 2

const int ledPin = GPIO_NUM_16;//LED BUILD IN   //16 sử dụng tương ứng với GPIO16

// setting PWM properties
const int freq = 5000;
const int ledChannel = 0;
const int resolution = 8;


byte temperature = 0;
byte humidity = 0;

void setup()
{
  i = 0;
 ledcSetup(ledChannel, freq, resolution);
  ledcAttachPin(ledPin, ledChannel);
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

  path = "/phongkhach"; 
  path1 = "/PHONGBEP";
  Firebase.setDouble(fbdo, path + "/sodem",123);

}
void loop()
{
 
  
  
  i++;
  if(i==100)
  i=0;
  if(Firebase.setDouble(fbdo, path + "/sodem",i))
  {
    Serial.println("Upload success");  
  }else
  {
    Serial.println("Upload fail");  
  }
  
  if(Firebase.getString (fbdo, path1 + "/CANHBAO"))
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
  }else {
    Serial.println("Download fail: " + String(fbdo.doubleData())); 
  }
  delay(1000);
}
