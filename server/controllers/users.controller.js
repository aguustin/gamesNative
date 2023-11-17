import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import gamesModel from '../models/gameSchema.js';

export const signInController = async (req, res) => {
    const {email, username, password, repeatPassword} = req.body;
    console.log(email, " ", username, " ", password, " ", repeatPassword);
    const userExist = await gamesModel.find({email: email});

    if(userExist.length > 0){
        res.sendStatus(203);
    }else{
        if(password === repeatPassword){
            const hash = await bcrypt.hash(password, 12);
      
            const newUser = new gamesModel({
                email: email,
                username: username,
                password: hash,
            })
            await newUser.save();
            res.send(newUser);
        }else{
            res.sendStatus(404);
        }
    }
}

export const loginController = async (req, res) => {
    const {email, password} = req.body;
    console.log(email);
    const accountData = await gamesModel.find({email: email});

    if(accountData.length > 0){
        const confirmPassword = await bcrypt.compare(password, accountData[0].password);

        if(confirmPassword){
            res.send(accountData);
        }else{
            res.sendStatus(203);
        }
    }else{
        res.sendStatus(203);
    }

}

export const addFvoriteGame = async (req, res) => {
    const {id, gameId, title, thumbail, gamePrice, gameDiscount} = req.body;
    console.log(gameId);
    const findUser = await gamesModel.find({_id: id});

    if(findUser.length > 0){
        const total = (gamePrice % gameDiscount);

        const checkIfGameExists = await gamesModel.find({'games.onCartorFavorite.favorite': false}); //esto busca en todos lados, arreglar

        if(checkIfGameExists){
            const updateGameList = await gamesModel.update(
                {_id: id},
                {
                    $addToSet:{
                        "games.$[i].onCartorFavorite":{
                            favorite: true,
                            title: title,
                            thumbnail: thumbail,
                            price:price,
                            discount:discount,
                            total:total
                        }
                    }
                },
                {
                    arrayFilters:[{
                        "i._id": gameId
                    }]
                }
            )

             res.send(updateGameList);
        }else{
            res.sendStatus(403);
        }
    }else{
        res.sendStatus(400);
    }
}

export const checkHttpRequest = async (req, res) => {
    const allUsers = await gamesModel.find();
    res.send(allUsers);
}
