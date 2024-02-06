import axios from 'axios';

export const getUserDataRequest = async (userId) => await axios.get(`http://192.168.100.10:4000/userData/${userId}`)
 
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
  
export const favoritesRequest = async (likedGame) => await axios.post('http://192.168.100.10:4000/addFavorite', likedGame);
  
export const deleteFavGameRequest = async (sessionId, gameId) => await axios.delete(`http://192.168.100.10:4000/deleteFavorite/${sessionId}/${gameId}`);

export const addToCartRequest = async (cartGameData) => axios.post(`http://192.168.100.10:4000/addToCart`, cartGameData);

export const deleteAllRequest = async () => axios.delete('http://192.168.100.10:4000/deleteAll');

export const purchaseAllRequest = async (purchaseObj) => axios.put(`http://192.168.100.10:4000/purchase/${purchaseObj.userId}/${purchaseObj.cardNumber}/${purchaseObj.securityNumber}/${purchaseObj.purchaseFlag}/${purchaseObj.totalPurchase}`);
