const crypto = require("crypto");
const fs = require("fs");
const bodyParser = require("../utlis/body-parser");

module.exports = async (req, res) => {
  if (req.url === "/api/movies") {
    try {
      //1)isteğin body kısmına eriş
      let body = await bodyParser(req);

      //hata kontorlü
      if (!body.title || !body.year || !body.genre || !body.rating) {
        res.writeHead(404);
        res.end("lütfen filmin bütün alanlarını tanımlayınız");
        return;
      }
      //2)yeni film verisine benzersiz id ekle
      body.id = crypto.randomUUID();

      //3)bütün filmleri al ve js verisine çevir
      // bütün filmleri al
      let data = fs.readFileSync("./data/movies.json", "utf-8");

      //json formatındaki veriyi js formatına çevir
      data = JSON.parse(data);
      //4)yeni filmi bütün filmlerin arasına ekle
      data.movies.push(body);

      //5)json dosyasını güncelle
      fs.writeFileSync("./data/movies.json", JSON.stringify(data));

      //6)cliente cevap gönder
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(body));
    } catch (err) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "yol bulunamadı" }));
    }
  }
};
