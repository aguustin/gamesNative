import mongoose from "mongoose";

const gameSchema = mongoose.Schema({
    userId:{type: String},
    email:{type: String},
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
            price:{type:Number},
            discount:{type:Number},
            total:{type:Number}
        }]
    }]
});

export default mongoose.model("gamesModel", gameSchema);