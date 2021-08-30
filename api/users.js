

module.exports = async (req, res) => {
  console.log(fetch)
  if(req.method === "GET") {
    const value = await fetch("https://fr1.api.radio-browser.info/json/stations/search?language=tamil&limit=30&hidebroken=true").then(resp => resp.json())
    res.json(value)
  } else {
    
  }
}
