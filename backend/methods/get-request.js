const fs = require("fs");
const url = require("url");

module.exports = (req, res) => {
  // url nin yol kısmını al
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));
  console.log(baseUrl);
  // url parçalara ayır ve id parametresini al
  const id = req.url.split("/")[3];

  if (req.url === "/api/movies") {
    //1) durum kodunu belirle
    res.status = 200;

    //2)headerları belirle
    res.setHeader("Content-Type", "application/json");

    //3) json dosyasından film verilerini al
    const movies = fs.readFileSync("./data/movies.json", "utf-8");
    console.log(movies);

    //4) cevabı gönder
    res.end(movies);
  } else if (baseUrl === "/api/movies" && id) {
    // bütün filmleri al
    let data = fs.readFileSync("./data/movies.json", "utf-8");

    //json formatındaki veriyi js formatına çevir
    data = JSON.parse(data);

    // filmlerin arasından idsini bildiğimiz filmi seç
    const movie = data.movies.find((item) => item.id == id);
    //eğer ki film bulunduysa filmi gönder
    if (movie) {
      // cevap ayarlarını belirle
      res.writeHead(200, { "Content-Type": "application/json" });
      // cevabı gönder
      res.end(JSON.stringify(movie));
    } else {
      // film bulunamadıysa
      res.writeHead(404, {
        "Content-Type": "application/json",
      });

      // cevabı gönder
      res.end(
        JSON.stringify({
          message: "Gönderidiğiniz id ile eşleşen film bulunamadı.",
        })
      );
    }
  } else {
    // doğru url'e istek atmadıysa hata gönder
    res.writeHead(404, { "Content-Type": "application/json" });

    res.end(
      JSON.stringify({
        title: "Bulunamadı",
        message: "İstek attığınız yol geçersiz",
      })
    );
  }
};
