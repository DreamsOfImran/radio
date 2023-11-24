import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import ScrollText from "react-scroll-text";
import axios from "axios";

import Loader from "./Loader";

import "react-h5-audio-player/lib/styles.css";

const LIMIT_OPTIONS = [10, 20, 30, 40, 50];

const Radio = () => {
  const playerRef = useRef([]);

  const [loading, setLoading] = useState(false);
  const [stations, setStations] = useState([]);
  const [limit, setLimit] = useState(30);
  const [stationFilter, setStationFilter] = useState("tamil");
  const [favourites, setFavourites] = useState([]);
  const [selectedStation, setSelectedStation] = useState({});

  useEffect(() => {
    const storedFavourites = JSON.parse(
      localStorage.getItem("radio_favourites")
    );
    if (storedFavourites) {
      setFavourites(storedFavourites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("radio_favourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    if (stationFilter !== "favourites") {
      setupApi(stationFilter).then((data) => {
        setStations(data);
      });
    } else {
      setStations(favourites);
    }
  }, [stationFilter, limit]);

  const setupApi = async (stationFilter) => {
    setLoading(true);

    const { data: stations } = await axios.get("/api/radio", {
      params: {
        limit,
        language: stationFilter,
      },
    });

    setLoading(false);

    return stations;
  };

  const filters = ["favourites", "tamil", "english", "hindi", "telugu"];

  const setDefaultSrc = (event) => {
    event.target.src = "/radio.jpg";
  };

  const handleFavourites = (station) => {
    if (favourites.some((f) => f.changeId === station.changeId)) {
      const removeFavourite = favourites.filter(
        (f) => f.changeId !== station.changeId
      );
      setFavourites(removeFavourite);
      if (stationFilter === "favourites") {
        setStations(removeFavourite);
      }
    } else {
      if (stationFilter === "favourites") {
        setStations([...favourites, station]);
      }
      setFavourites([...favourites, station]);
    }
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter) => (
          <span
            key={filter}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
        <select
          className="options"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        >
          {LIMIT_OPTIONS.map((l) => (
            <option key={l} value={l}>
              {l} Stations
            </option>
          ))}
        </select>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="stations">
          {stations &&
            stations.map((station, index) => (
              <div className="station" key={index}>
                <div
                  className="favourite"
                  onClick={() => {
                    handleFavourites(station);
                  }}
                >
                  {favourites.some((f) => f.changeId === station.changeId)
                    ? "♥"
                    : "♡"}
                </div>
                <div className="stationName">
                  <img
                    src={station.favicon || "/radio.jpg"}
                    alt="station logo"
                    className="logo"
                    onError={setDefaultSrc}
                  />
                  <div className="name">{station.name}</div>
                </div>
                <button
                  className={
                    selectedStation.changeId === station.changeId
                      ? "playButton selected"
                      : "playButton"
                  }
                  onClick={() => {
                    setSelectedStation(station);
                  }}
                >
                  {selectedStation.changeId === station.changeId ? (
                    <Loader style={{ fontSize: "5px" }} />
                  ) : (
                    "Play"
                  )}
                </button>
              </div>
            ))}
        </div>
      )}
      <div className="fixedContainer">
        <div className="fixedPlayer">
          <div className="fixedPlayerName">
            <img
              src={selectedStation.favicon}
              alt="station logo"
              className="fixedPlayerLogo"
              onError={setDefaultSrc}
            />
            <ScrollText speed={70} style={{ textAlign: "center" }}>
              {selectedStation.name || "Select a station"}
            </ScrollText>

            {!!Object.keys(selectedStation).length && (
              <div
                className="favourite"
                onClick={() => {
                  handleFavourites(selectedStation);
                }}
              >
                {favourites.some((f) => f.changeId === selectedStation.changeId)
                  ? "♥"
                  : "♡"}
              </div>
            )}

            <AudioPlayer
              ref={playerRef}
              className="player"
              src={selectedStation.urlResolved}
              showJumpControls={false}
              layout="stacked"
              customProgressBarSection={[]}
              customControlsSection={["VOLUME_CONTROLS", "MAIN_CONTROLS"]}
              autoPlayAfterSrcChange={true}
              autoPlay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Radio;
