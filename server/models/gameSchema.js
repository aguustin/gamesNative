import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    userId:{type: String},
    email:{type: String},
    name:{type: String},
    lastname:{type: String},
    username:{type: String},
    password:{type: String},
    games:[{
        obtained:[{
            gameId:{type:Number},
            title:{type:String},
            thumbnail:{type:String},
            genre:{type:String},
            releaseDate:{type:String},
            screenShots:[{
                shotOne:{type:String},
                shotTwo:{type:String},
                shotThree:{type:String},
                shotFour:{type:String}
            }]
        }],
        onCartorFavorite:[{
            favorite:{type:Boolean},
            gameId:{type:Number},
            title:{type:String},
            thumbnail:{type:String},
            releaseDate:{type:String},
            price:{type:Number},
            discount:{type:Number},
            total:{type:Number},
            totalPurchase: {type:Number},
            purchaseId: {type: Number},
            onPosesion:{type:Boolean}
        }]
    }]
});

export default mongoose.model("gamesModel", gameSchema);