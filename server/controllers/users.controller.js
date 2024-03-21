
import bcrypt from "bcrypt";
import gamesModel from '../models/gameSchema.js';
import mongoose from "mongoose";

export const getUserDataController = async (req, res) => {
    const userId = req.params.userId;
    const getUserData = await gamesModel.find({_id: userId});

    res.send(getUserData);
}

export const signInController = async (req, res) => {
    const {email, username, password, repeatPassword} = req.body;
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
                games: [
                    {
                        obtained: [],
                        onCartorFavorite: []
                    }
                ]
            })
            await newUser.save();
            res.send(newUser);
        }else{
            console.log("el usuario ya existe");
            res.sendStatus(203);
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
            console.log("el usuario SI existe");
            res.send(accountData);
        }else{
            console.log("la contrasena es incorrecta");
            res.sendStatus(200);
        }
    }else{
        console.log("la cuenta no existe");
        res.sendStatus(200);
    }
    
}

export const addFavoriteGame = async (req, res) => {
    const {id, gameId, title, thumbnail, releaseDate, gamePrice, gameDiscount} = req.body;
    const findUser = await gamesModel.find({_id: id});

    if(findUser.length > 0){
        const setdiscount = (2 / 100) * gameDiscount;
        const total = 10 - setdiscount;
        
        const checkIfIsInFavorites = await gamesModel.find(
            {
                _id: id,
                "games.onCartorFavorite.$[].favorite": true,
                "games.onCartorFavorite.$[].gameId":gameId
            }
        );

        if(checkIfIsInFavorites.length > 0){
            res.sendStatus(200);
        }else{
            const checkIfGameExists = await gamesModel.find(
                {
                    _id: id,
                    "games.onCartorFavorite.favorite": false,
                    "games.onCartorFavorite.gameId":gameId
                }
            );
            if(checkIfGameExists.length > 0){ 
                console.log("el juego esta en el carro");
                const updateGameList = await gamesModel.updateOne(
                    {_id: id},
                    {
                        $set:{
                            "games.$[].onCartorFavorite.$[i].favorite":true,
                            "games.$[].onCartorFavorite.$[i].gameId": gameId,
                            "games.$[].onCartorFavorite.$[i].title": title,
                            "games.$[].onCartorFavorite.$[i].thumbnail": thumbnail,
                            "games.$[].onCartorFavorite.$[i].releaseDate":releaseDate,
                            "games.$[].onCartorFavorite.$[i].price": gamePrice,
                            "games.$[].onCartorFavorite.$[i].discount": gameDiscount,
                            "games.$[].onCartorFavorite.$[i].totalñ": total
                        }
                    },
                    {
                        arrayFilters:[
                            {"i.gameId": { $eq: gameId }}
                        ]
                    }
                    
                )
                 res.send(updateGameList);
            }else{
                console.log("el juego nunca fue agregado a nada");
                const updateGameList = await gamesModel.updateOne(
                    {_id: id},
                    {
                        $addToSet:{
                            "games.$[].onCartorFavorite":{
                                    favorite: true,
                                    gameId: gameId,
                                    title: title,
                                    thumbnail: thumbnail,
                                    releaseDate: releaseDate,
                                    price:gamePrice,
                                    discount:gameDiscount,
                                    total:total,
                                    onPosesion:false
                            }
                        }
                    }
                )
                 res.send(updateGameList);
            }
        }
    }else{
        res.sendStatus(400);
    }
}

export const deleteFavoriteGame = async (req, res) => {
    const sessionId = req.params.sessionId;
    const gameId = req.params.gameId;
    
    await gamesModel.updateOne(
        {_id: sessionId},
        {
            $pull:{
                "games.$[].onCartorFavorite": {_id: gameId}
            }
        }
    )

}

export const addToCartController = async (req, res) => {
    const {sessionId, gameId, title, thumbnail, releaseDate, gamePrice, gameDiscount} = req.body;
    const sessionIdObject = new mongoose.Types.ObjectId(sessionId);
    console.log(sessionId);
   const findOnFavorites = await gamesModel.find(
    {
        _id: sessionId,
        "games.onCartorFavorite.favorite": true,
        "games.onCartorFavorite.gameId":gameId
    }
    );

    if(findOnFavorites.length > 0){  
        console.log("existe en favoritos", sessionId);
        const setdiscount = (2 / 100) * gameDiscount;
        const total = 10 - setdiscount;

            await gamesModel.updateOne(
                {_id: sessionId},
                {
                    $set:{
                        "games.$[].onCartorFavorite.$[i].favorite":false,
                        "games.$[].onCartorFavorite.$[i].gameId": gameId,
                        "games.$[].onCartorFavorite.$[i].title": title,
                        "games.$[].onCartorFavorite.$[i].thumbnail": thumbnail,
                        "games.$[].onCartorFavorite.$[i].releaseDate":releaseDate,
                        "games.$[].onCartorFavorite.$[i].price":gamePrice,
                        "games.$[].onCartorFavorite.$[i].discount": gameDiscount,
                        "games.$[].onCartorFavorite.$[i].total":total
                    }
                },
                {
                    arrayFilters:[
                        {"i.gameId": { $eq: gameId }}
                    ]
                }
            )
    }else{ 
        console.log("no existe en favoritos");
        const checkIfGameExists = await gamesModel.find(
            {
                _id: sessionId,
                "games.onCartorFavorite.favorite": false,
                "games.onCartorFavorite.gameId":gameId
            }
           
            );
        if(checkIfGameExists.length > 0){
            console.log("El juego ya ha sido agregado al carro");
            res.sendStatus(200);
        }else{ 
            console.log("no fue agregado a ningun lado, agregando al carro");
            const setdiscount = (2 / 100) * 20;
            const total = 10 - setdiscount;

            await gamesModel.updateOne(
                { _id: sessionId },
                {
                        $addToSet:{
                        "games.$[].onCartorFavorite":{
                                    favorite: false,
                                    gameId: gameId,
                                    title: title,
                                    thumbnail: thumbnail,
                                    releaseDate: releaseDate,
                                    price:gamePrice,
                                    discount:gameDiscount,
                                    total:total,
                                    onPosesion: false
                                }
                            
                        }
                    
                }
            )
            res.sendStatus(200);
        }
    }
}

export const checkHttpRequest = async (req, res) => {
    const allUsers = await gamesModel.find();
    res.send(allUsers);
}

export const deleteAll = async (req, res) => {
    console.log("entro");
    await gamesModel.deleteMany();  
    res.sendStatus(200);
}

export const purchaseController = async (req, res) => {
    const {userId, cardNumber, securityNumber, purchaseFlag, totalPurchase} = req.params;
    console.log("todos los juegos: ", userId, cardNumber, securityNumber, purchaseFlag, totalPurchase);
    const purchaseId = Date.now();
    await gamesModel.updateOne(
        {_id: userId},
        {
            $set:{
                "games.$[i].onCartorFavorite.$[x].favorite": null,
                "games.$[i].onCartorFavorite.$[x].totalPurchase": totalPurchase,
                "games.$[i].onCartorFavorite.$[x].purchaseId": purchaseId,
                "games.$[i].onCartorFavorite.$[x].onPosesion": true
            }
        },
        {
            arrayFilters: [
                {"i.onCartorFavorite": {$exists: true}},
                {"x.favorite": false}
            ]
        })
    res.sendStatus(200);
}


export const changeProfileController = async (req, res) => {
    const {userId, fileUri} = req.params;
    console.log(userId, " ", fileUri);
}

export const changeNLController = async (req, res) => {
    const {userId, name, lastname} = req.params;
    
    await gamesModel.updateOne(
        {_id: userId},
        {
            $set:{
                name: name,
                lastname: lastname
            }
        }
    )
    res.sendStatus(200);
}

export const changeUsernameController = async (req, res) => {
    const {userId, username} = req.params;
    await gamesModel.updateOne(
        {_id: userId},
        {
            $set:{
                username: username
            }
        }
    )
    res.sendStatus(200);
}

export const changePasswordController = async (req, res) => {
    const {userId, oldPassword, newPassword, confirmNewPassword} = req.params;
    const findPassword = await gamesModel.find({ _id: userId, password: oldPassword }); 

    console.log(findPassword);

    if(findPassword) { 

        if(newPassword === confirmNewPassword) {
        await gamesModel.updateOne(
            {_id: userId},
            {
                $set:{
                    password: newPassword
                }
            }
        )
        res.sendStatus(400);

        }else{
            res.send("The passwords doesn't match");
        }
    }else{
        res.send("the passwords doesn't exists");
    }

}