//  HC05     RX, TX
//  UNO       1, 0
int led1 = 9;
String docchuoi;
//======================================
void setup() {
  Serial.begin(9600);
  pinMode(led1, OUTPUT);
}
//======================================
void loop() {
    while (Serial.available()) {  //Kiểm tra nếu có một byte sẵn sàng thì đọc
    delay(10);  //   Trễ nhằm cho nó ổn định
    char c = Serial.read();  //Tiến hành đọc serial
    docchuoi += c;   //tạo chuỗi dữ liệu "bật" , "tắt"
  }
  if (docchuoi.length() >0) {
//=====================================    
    Serial.println(docchuoi);
    if (docchuoi == "bật") { 
      digitalWrite(led1, HIGH);
    }   
    
    else if(docchuoi== "tắt") { 
      digitalWrite(led1, LOW);
    }   
  }
  docchuoi=""; 
}
