import { useEffect, useState } from "react";
import UpdateItem from "./components/UpdateItem";
import axios from 'axios';
// import { use } from "react";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.
const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;

function App() {
  // Get the existing item from the server
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Initialized as true
  const [error, setError] = useState(null);

  // pass the item to UpdateItem as a prop
  const doorId = "1";

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${API_URI}/${doorId}`);
      setItem(response.data); 
    } catch (error) {
      console.error("Error in fetching data", error);
      setError(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchItems();
  }, [doorId]); 

  if (loading) {
    return (
      <>
        <h1>Loading...</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>{`Error in fetching data: ${error}`}</h1>
      </>
    );
  }

  return (
    <div>
      <h1>Update Door Item</h1>
      <UpdateItem item={item} setItem={setItem} />
    </div>
  );
}

export default App;
