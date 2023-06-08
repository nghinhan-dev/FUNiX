import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [formData, setFormData] = useState({
    songTitle: "",
  });

  const [favList, setFavList] = useState([]);

  useEffect(() => {
    // This effect will be triggered when the form is submitted
    async function postNewFavSong() {
      try {
        const res = await fetch("http://localhost:3000/add-song", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        console.log(data.songTitle);
        setFavList((prevState) => [...prevState, `${data.songTitle}`]);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
      }
    }

    formData.songTitle !== "" && postNewFavSong();
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update the form data
    setFormData({
      songTitle: e.target.elements.songTitle.value,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          name="songTitle"
          type="text"
          placeholder="Enter your favorite song"
        />
        <button type="submit">Add New Song</button>
      </form>

      <hr />
      <h3>Favorite Songs</h3>
      <ul>
        {favList.map((song) => {
          return <li key={uuidv4()}>{song}</li>;
        })}
      </ul>
    </>
  );
}

export default App;
