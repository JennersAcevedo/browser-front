"use client";
import styles from "./page.module.css";
import {  useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchGif = async () => {
    setImages([]); 
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/data/${text}`);
      setImages(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    await fetchGif(); 
    setHistory((prevHistory) => [...prevHistory, text]); 
    setText(''); 
  };

  const handleDelete = async (e) => {
    e.preventDefault(); 
    await axios.delete(`http://localhost:4000/delete`);
    setHistory([]); 
    setImages([]); 
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="text">Buscador:</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Buscar</button>{" "}
        <button onClick={handleDelete}>Eliminar historial</button>
      </form>
      
      <h3>Historial de Búsquedas:</h3>
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      {loading && <p>Cargando imágenes...</p>}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
          maxHeight: "700px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {Array.isArray(images) &&
          images.map((image, index) => (
            <img
              key={index}
              src={image.data}
              alt={`Imagen ${index + 1}`}
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          ))}
      </div>
    </div>
  );
}

