module.exports = (req, res) => {
  if(req.method === "GET") {
    res.json([
      { name: "Imran Basha", location: "Chennai" },
      { name: "Nothing comes to mind", location: "Inside my mind" }
    ])
  } else {
    
  }
}