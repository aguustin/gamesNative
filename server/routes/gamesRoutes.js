import { Router } from "express";
import { addFvoriteGame } from "../controllers/users.controller.js";

const router = Router();

//like games routes

router.post('/addFavorite', addFvoriteGame);

router.get('/obtainLikedGames');

router.delete('/deleteLikedGame');


//add to cart games routes

router.post('/addToCart');

router.get('/gamesOnCart');

router.delete('/deleteGameOnCart');

//games buyed

router.post('/buyGames');

router.get('/gameOnList');

export default router;