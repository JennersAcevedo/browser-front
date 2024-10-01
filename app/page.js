'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [text, setText] = useState("");
  const [images, setImage] = useState([]);
  const[loading, setLoading]=useState(false)

  
    const fetchGif = async ()=>{
      setImage([])
      setLoading(true);
      try{
        const response = await axios.get(`http://localhost:4000/data/${text}`)
        setImage(response.data.data)
        console.log(response.data.data)
      }catch(error){
        console.log(error);
      }finally{
        setLoading(false);
      }
    }
  
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit =async (e) => {
    e.preventDefault();
    fetchGif()
  };
  const handleDelete =async()=>{
    const response = await axios.delete(`http://localhost:4000/delete`)
  }
  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Buscador:</label>
          <input
            id="text"
            type="text"
            value={text}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Buscar</button> 
      </form>
      <button onClick={handleDelete}>Eliminar</button>
      {loading && <p>Cargando imágenes...</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px', maxHeigh:'400px',overflowY:'auto',border:'1px solid #ccc' }}>
      {images.map((image, index) => (
          <img key={index} src={image.data} alt={`Imagen ${index + 1}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  );
}
