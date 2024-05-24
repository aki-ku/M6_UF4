import { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: "AIzaSyCrQA_EKSLpjdoQUmysdOqHek3s53IwrvU",

  authDomain: "peli-a91a1.firebaseapp.com",

  projectId: "peli-a91a1",

  storageBucket: "peli-a91a1.appspot.com",

  messagingSenderId: "639984858847",

  appId: "1:639984858847:web:2768f867f4e837fbb7db6a",

  measurementId: "G-C8SZ42NN69"

};

firebase.initializeApp(firebaseConfig);

function AddMovie() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [image, setImage] = useState('');
  const [rate, setRate] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const db = firebase.firestore();
    db.collection("Movies").add({
      title,
      description,
      duration: Number(duration),
      image,
      rate: Number(rate),
      year: Number(year)
    }).then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      setTitle('');
      setDescription('');
      setDuration('');
      setImage('');
      setRate('');
      setYear('');
      alert('La película ha sido añadida correctamente');
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: '0 auto' }}>
    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Títol" required style={{ margin: '10px 0', padding: '10px' }} />
    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripció" required style={{ margin: '10px 0', padding: '10px' }} />
    <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duració" required style={{ margin: '10px 0', padding: '10px' }} />
    <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enllaç de la imatge" required style={{ margin: '10px 0', padding: '10px' }} />
    <input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="Nota" required style={{ margin: '10px 0', padding: '10px' }} />
    <input type="number" value={year} onChange={(e) => setYear(e.target.value)} placeholder="Any" required style={{ margin: '10px 0', padding: '10px' }} />
    <button type="submit" style={{ margin: '10px 0', padding: '10px', cursor: 'pointer' }}>Afegir</button>
  </form>
  );
}
 
export default AddMovie;