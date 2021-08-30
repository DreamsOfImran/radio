module.exports = async (req, res) => {
  if(req.method === "GET") {
    fetch("https://fr1.api.radio-browser.info/json/stations/search?language=tamil&limit=30&hidebroken=true")
      .then(response => response.json())
      .then(data => res.json(data))
  } else {

  }
}