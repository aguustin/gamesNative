import axios from 'axios';
 
 export const getAllGames = async () => {
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

export const getGamesByCategories = async (category) => {
  const getGameByCat = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
    params: {
      category: category
    },
    headers: {
      'X-RapidAPI-Key': 'b95cd8f5b3mshae593b0e9afbb60p18f6ebjsn2ae06509ece9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  
  try {
    const res = await axios.request(getGameByCat);
    return res.data
  } catch (error) {
    console.error(error);
  }
}

export const gameDetails = async (gameId) => {

  const options = {
    method: 'GET',
    url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
    params: {id: gameId},
    headers: {
      'X-RapidAPI-Key': 'b95cd8f5b3mshae593b0e9afbb60p18f6ebjsn2ae06509ece9',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
  
export const favoritesRequest = async (likedGame) => await axios.post('/addFavorite', likedGame)
  
