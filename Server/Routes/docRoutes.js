const router = require("express").Router()
const Doc = require('../models/Doc')
const {verifyTokenAndAuthorization, verifyCommittee} = require('../middlewares/verifyToken')
const upload = require('../utils/upload')



//CREATE DOC
router.post('/',verifyTokenAndAuthorization,upload.single('file'), async (req, res) => {
   console.log(req.file)
   
   
     const doc = new Doc({
        userId: req.user.id,
        documents: [{name:req.body.name , file: req.file.filename}],

     })
     const savedDoc = await doc.save()
     res.status(201).json(savedDoc)
})
//GET DOC
router.get('/',verifyTokenAndAuthorization, async (req, res)=>{
    try{
        const doc = await Doc.find( {userId: req.user.id}).sort({createdAt: -1})
        if(doc){
            res.status(200).json(doc)
        }
    }catch(err){
       res.status(500).json({message: err})
    }
    
})
//UPDATE DOC
router.put('/:id',verifyTokenAndAuthorization,upload.single('file'), async (req, res) => {
    if(req.file) {
        try{
            const newDoc = {name: req.body.name, file: req.file.filename}
             const doc = await Doc.find({userId: req.user.id})
             console.log('old',doc[0].documents)
            const docIndex = doc[0].documents.findIndex(d => d.id === req.params.id)
             
             doc[0].documents[docIndex] = newDoc
             console.log('new',doc)
             const savedDoc = await doc[0].save()
             console.log('saved',savedDoc)
             res.status(200).json(savedDoc)
        }catch(error){
           res.status(400).json(error)
        }
       
    }
})
//ADD DOC 
router.patch('/',verifyTokenAndAuthorization, upload.single('file'), async (req, res)=>{
    try{
        const doc = await Doc.find({userId: req.user.id})
        if(doc){
            const newDoc = {name:req.body.name, file: req.file.filename, }
            doc[0].documents.unshift(newDoc)
            const savedDoc = await doc[0].save()  
            res.status(200).json(savedDoc)
        }
    }catch (err){
       res.status(500).json(err)
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