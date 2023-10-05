import axios from 'axios';
 
 export const options = async () => {
    const getAllGames = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
        headers: {
          'X-RapidAPI-Key': 'b95cd8f5b3mshae593b0e9afbb60p18f6ebjsn2ae06509ece9',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    }
    try {
      const res = await axios.request(getAllGames);
      return res.data;
    } catch (error) {
      console.error(error);
    }
};
  
