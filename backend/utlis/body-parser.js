//isteğin body kısmını oluştur
module.exports = async (request) => {
  return new Promise((resolve, reject) => {
    try {
      //isteğin body kısmını belirliyoruz
      let body = "";

      //aldığımız her parçayı body kısmına ekle
      request.on("data", (chunk) => {
        body += chunk;
      });
      // bütün parçaların bitme olayını izle
      request.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(err);
    }
  });
};
