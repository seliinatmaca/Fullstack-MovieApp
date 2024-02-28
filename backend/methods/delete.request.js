const fs = require("fs");

module.exports = (req, res) => {
  // url nin yol kısmını al
  const baseUrl = req.url.substring(0, req.url.lastIndexOf("/"));

  // url parçalara ayır ve id parametresini al
  const id = req.url.split("/")[3];

  if (baseUrl === "/api/movies" && id) {
    //bütün filmleri al
    let data = fs.readFileSync("./data/movies.json", "utf-8");

    //json formatındaki veriyi js formatına çevir
    data = JSON.parse(data);

    //film dizide var mı kontrol et yoksa hata ver
    const foundItem = data.movies.find((item) => item.id == id);

    //film dizi de yoksa hata ver
    if (!foundItem) {
      res.writeHead(404);
      return res.end("id geçersiz");
    }

    //diziden idsi bilinene filmi kaldır
    const filtred = data.movies.filter((item) => item.id != id);
    data.movies = filtred;

    //json dosyasını güncelle
    fs.writeFileSync("./data/movies.json", JSON.stringify(data));

    //cliente cevap gönder
    res.writeHead(204, { "Content-Type": "application/json" });
    res.end();
  } else {
    res.writeHead(404);
    res.end("yol bulunamadı");
  }
};
