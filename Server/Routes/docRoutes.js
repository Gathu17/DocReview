const router = require("express").Router()
const Doc = require('../models/Doc')
const {verifyTokenAndAuthorization, verifyCommittee} = require('../middlewares/verifyToken')




//CREATE DOC
router.post('/',verifyTokenAndAuthorization, async (req, res) => {

     const doc = new Doc({
        userId: req.user.id,
        documents: [{name:req.body.name , source: req.body.file}],

     })
     const savedDoc = await doc.save()
     res.status(201).json(savedDoc)
})
//UPDATE DOC
router.patch('/:id',verifyTokenAndAuthorization, async (req, res) => {
    
    if(req.body.file) {
        try{
             const doc = await Doc.findByIdAndUpdate(req.params.id,{$set: {documents: req.body}},{new: true})
             const savedDoc = await doc.save()
             res.status(200).json(savedDoc)
        }catch(error){
           res.status(400).json(error)
        }
       
    }
})
//RETURN DOC TO USER WITH COMMENTS
router.put('/:id',verifyCommittee, async (req, res) => {
    const {comments} = req.body
    if(comments){
       try{
        const doc = await Doc.findById(req.params.id)
        doc.comments = req.body.comments
        const savedDoc = await doc.save()
        res.status(200).json(savedDoc)
       }catch(error){
        res.status(500).json(error)
       }
    }
})
//DELETE DOC
router.delete('/:id',verifyTokenAndAuthorization, async (req, res)=>{
    try {
        await Doc.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router