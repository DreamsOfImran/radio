module.exports = async (req, res) => {
  if(req.method === "GET") {
    // console.log(fetch)
    // const value = await fetch("https://fr1.api.radio-browser.info/json/stations/search?language=tamil&limit=30&hidebroken=true").then(resp => resp.json())
    res.json({ name: "Imran Basha" })
  } else {
    
  }
}
