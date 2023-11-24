import { RadioBrowserApi } from "radio-browser-api";

export default async function GET(req, res) {
  const { limit, language } = req.query;

  const api = new RadioBrowserApi("My Radio App");

  const stations = await api.searchStations({
    limit: parseInt(limit),
    language,
  });
  res.status(200).json(stations);
}
