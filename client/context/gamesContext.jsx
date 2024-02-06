import { useEffect, createContext, useState} from 'react';
import { gameDetails, getGamesByCategories, favoritesRequest, deleteFavGameRequest, addToCartRequest, simplePurchaseRequest, purchaseAllRequest } from '../src/api/gamesRequest';

const GameContext = createContext();

export const GameContextProvider = ({children}) => {
    const [allGames, setAllGames] = useState([]);
    const [searchingGames, setSearchingGames] = useState([]);
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

    const deleteFavGameContext = async (sessionId, gameId) => {
        await deleteFavGameRequest(sessionId, gameId);
    }

    const addToCartContext = async (cartGameData) => {
        await addToCartRequest(cartGameData);
    }

    const purchaseAllContext = async (purchaseObj) => {
        await purchaseAllRequest(purchaseObj)
    }

    return(
        <GameContext.Provider value={{
            allGames, 
            setAllGames,
            searchingGames, 
            setSearchingGames,
            favorites,
            gameDetailState, 
            gameDetailsContext,
            getGamesByCategoriesContext,
            addGameToLikedGamesContext,
            deleteFavGameContext,
            addToCartContext,
            purchaseAllContext
            }}>{children}</GameContext.Provider>
    )
}

export default GameContext;