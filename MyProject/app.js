var express = require('express');
var path = require('path');
var app = express();
 
// ประกาศให้ Express ใช้งาน View โดยให้ใช้โฟลเดอร์ views เป็นตัวเก็บไฟล์ jade.
app.set('views', path.join(__dirname, 'views'));
 
// ตั้งค่าให้ Express ใช้ View Engine ชื่อว่า Jade
app.set('view engine', 'jade');


 
// ฟังค์ชัน สำหรับรับ request จาก client และส่ง response กลับไปยัง client
// req คือ request และ res คือ response
// res.render('file') คือการให้ทำการ render ไฟล์ ที่อยู่ในโฟลเดอร์ views
function getHomePage(req, res) {
  
 var items = [
    {code: 'A1', name: 'Soda1', description: 'desc1'}, 
    {code: 'A2', name: 'Soda2', description: 'desc2'}, 
    {code: 'A3', name: 'Soda3', description: 'desc3'}, 
    {code: 'A4', name: 'Soda4', description: 'desc4'}, 
    {code: 'A5', name: 'Soda5', description: 'desc5'}, 
    {code: 'A6', name: 'Soda6', description: 'desc6'}, 
    {code: 'A7', name: 'Soda7', description: 'desc7'}, 
    {code: 'A8', name: 'Soda8', description: 'desc8'}, 
    {code: 'A9', name: 'Soda9', description: 'desc9'}, 
    {code: 'A10', name: 'Soda10', description: 'desc10'}, 
    {code: 'A11', name: 'Soda11', description: 'desc11'}
]; 

    res.render('index.jade', {
      items : items 
    })
}
 
// เมื่อ client เข้าถึงหน้า Home Page ของเว็บไซต์ http://localhost:5555/
// app.get(URL, getHomePage)
// URL - คือ PATH ของเว็บไซต์
// getHomePage คือ callback function ที่มี request และ response
app.get('/', function(request, response){
    response.sendfile('index.html');
});
 
// start server ด้วย port 5555
var server = app.listen(5555, function() {
    console.log('Express.js is running...');
});