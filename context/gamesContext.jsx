import { createContext, useState} from 'react';
import { gameDetails, getGamesByCategories, favoritesRequest } from '../src/api/gamesRequest';

const GameContext = createContext();

export const GameContextProvider = ({children}) => {
    const [allGames, setAllGames] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [gameDetailState, setGameDetailState] = useState([]);
    
    const gameDetailsContext = async (gameId) => {
        const res = await gameDetails(gameId);
        setGameDetailState([res]);
    }

    const getGamesByCategoriesContext = async (category) => {
        const res = await getGamesByCategories(category);
        setAllGames(res);
    }


    const addGameToLikedGamesContext = async (favoriteGameData) => {
        const favoriteGame = await favoritesRequest(favoriteGameData);
        setFavorites([...favorites, favoriteGame.data]);
    }

    return(
        <GameContext.Provider value={{
            allGames, 
            setAllGames,
            gameDetailState, 
            gameDetailsContext,
            getGamesByCategoriesContext,
            addGameToLikedGamesContext 
            }}>{children}</GameContext.Provider>
    )
}

export default GameContext;