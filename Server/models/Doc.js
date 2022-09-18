var {model,Schema} = require("mongoose") 
const docSchema = new Schema({
   userId: {type: String, unique: true},
   documents: [{
    docId: String,
    name: String,
    source: { type: Buffer, contentType: String, required: true}
}],
   comments: [
    {
        body: String,
    }
   ]

},{timestamps: true}
)
module.exports = new model('Doc', docSchema);