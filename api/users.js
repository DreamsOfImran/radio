module.exports = async (req, res) => {
  if(req.method === "GET") {
    fetch("http://de1.api.radio-browser.info/json/servers")
      .then(response => response.json())
      .then(data => res.json(data))
  } else {

  }
}