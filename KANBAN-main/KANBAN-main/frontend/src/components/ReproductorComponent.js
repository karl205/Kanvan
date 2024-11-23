import React from 'react';
import Player from "@madzadev/audio-player";
import "@madzadev/audio-player/dist/index.css";
const tracks = [
    {
      url: "https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3",
      title: "Madza - Chords of Life",
      tags: ["house"],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Late_Night_Drive.mp3",
      title: "Madza - Late Night Drive",
      tags: ["dnb"],
    },
    {
      url: "https://audioplayer.madza.dev/Madza-Persistence.mp3",
      title: "Madza - Persistence",
      tags: ["dubstep"],
    },
    {
        url: "https://miservidor.com/mipista1.mp3",
        title: "Mi Canción 1",
        tags: ["pop"],
      },
      {
        url: "https://miservidor.com/mipista2.mp3",
        title: "Mi Canción 2",
        tags: ["rock"],
      },
  ];
const ReproductorComponents = () => {
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
        <h2>Reproductor de Música</h2>
      <Player trackList={tracks}></Player>
    </div>
  );
};
export default ReproductorComponents;