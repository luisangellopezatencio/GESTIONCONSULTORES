public class MyClass {
class RGB {
Integer red;
Integer green;
Integer blue;
RGB(Integer red, Integer green, Integer blue) {
this.red = red;
this.green = green;
this.blue = blue;
Classes, Objects, and Interfaces
Apex Developer Guide
}
}
static Map<String, RGB> colorMap = new Map<String, RGB>();
static {
colorMap.put('red', new RGB(255, 0, 0));
colorMap.put('cyan', new RGB(0, 255, 255));
colorMap.put('magenta', new RGB(255, 0, 255));
}
}