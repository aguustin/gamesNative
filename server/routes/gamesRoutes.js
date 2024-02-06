import { Router } from "express";
import { getUserDataController, addFavoriteGame, deleteFavoriteGame, addToCartController, deleteAll, purchaseController } from "../controllers/users.controller.js";

const router = Router();

//like games routes

router.get('/userData/:userId', getUserDataController);

router.post('/addFavorite', addFavoriteGame);

router.delete('/deleteFavorite/:sessionId/:gameId', deleteFavoriteGame);


//add to cart games routes

router.post('/addToCart', addToCartController);

router.get('/gamesOnCart');

router.delete('/deleteGameOnCart');

//games buyed

router.post('/buyGames');

router.get('/gameOnList');

router.delete('/deleteAll', deleteAll);

router.put('/purchase/:userId/:cardNumber/:securityNumber/:purchaseFlag/:totalPurchase', purchaseController);

export default router;