import React, { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import { DataDTO } from "./model/data.model";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function App() {
  const socket = io("http://localhost:3000");

  const [inputUrl, setInputUrl] = useState<string>("");

  socket.on("received", (data) => {
    console.log(data);
  });

  function enviar() {
    const data: DataDTO = {
      url: inputUrl,
    };
    socket.emit("downloadImage", JSON.stringify(data));
  }

  return (
    <div className="App">
      <div className="grid">
        <div className="flex col">
          <label className="ml-2">Url</label>
          <InputText
            className="mr-2"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
          />
          <Button className="ml-2" onClick={enviar}>
            Enviar
          </Button>
        </div>
      </div>
      <h1>Imagens</h1>
    </div>
  );
}

export default App;
