const Post = require("../models/Post");
const express = require("express")
const router = express.Router();

router.get("/",async (req,res)=>{
    const posts = await Post.find();
    res.render('show.ejs',{posts});
})

router.get('/new', (req,res)=>{
    res.render('new.ejs');
})

router.post('/', async(req,res)=>{
    const post = new Post({
        title : req.body.title,
        content: req.body.content
    })

    const newPost = await post.save();
    res.redirect('/posts');
})

router.get('/edit/:id', async(req,res)=>{
    const id = req.params.id
    const post = await Post.findById(id)
    res.render('edit.ejs', {post} )
})


router.post('/edit/:id', async(req,res)=>{
    try{

        const post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
    
        post.title = req.body.title;
        post.content = req.body.content;
    
        const updatedPost = await post.save();
        res.redirect('/posts');
    } catch (err){
        res.status(400).json({message: err.message});
    }

})

router.post('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const post = await Post.findByIdAndDelete(id);
        if(post == null){
            return res.status(404).json({message: 'Cannot find post'});
        }
        res.redirect('/posts');
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});



module.exports = router;