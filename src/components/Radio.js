import React, { useEffect, useState } from 'react'
import { RadioBrowserApi } from 'radio-browser-api'
import AudioPlayer from 'react-h5-audio-player'
import defaultImage from '../radio.jpg'
import Loader from './Loader'

import 'react-h5-audio-player/lib/styles.css'

const LIMIT_OPTIONS = [10, 20, 30, 40, 50]

const Radio = () => {
  const [loading, setLoading] = useState(false)
  const [stations, setStations] = useState()
  const [limit, setLimit] = useState(30)
  const [stationFilter, setStationFilter] = useState("tamil")

  useEffect(() => {
    setupApi(stationFilter).then(data => {
      setStations(data)
    })
    // eslint-disable-next-line
  }, [stationFilter, limit])

  const setupApi = async (stationFilter) => {
    setLoading(true)
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App")

    const stations = await api.searchStations({
      language: stationFilter,
      limit: limit
    })
    setLoading(false)

    return stations
  }

  const filters = [
    "tamil",
    "english",
    "hindi",
    "telugu"
  ]

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage
  }

  return (
    <div className="radio">
      <div className="filters">
        {filters.map(filter => (
          <span
            key={filter}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
        <select className="options" value={limit} onChange={(e) => setLimit(e.target.value)}>
          {LIMIT_OPTIONS.map(l => (
            <option key={l} value={l}>{l} Stations</option>
          ))}
        </select>
      </div>
      {loading ? <Loader /> : (
        <div className="stations">
          {stations && stations.map((station, index) => (
            <div className="station" key={index}>
              <div className="stationName">
                <img
                  src={station.favicon}
                  alt="station logo"
                  className="logo"
                  onError={setDefaultSrc}
                />
                <div className="name">{station.name}</div>
              </div>

              <AudioPlayer
                className="player"
                src={station.urlResolved}
                showJumpControls={false}
                layout="stacked"
                customProgressBarSection={[]}
                customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                autoPlayAfterSrcChange={false}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Radio
