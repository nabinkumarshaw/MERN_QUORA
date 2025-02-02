const express =require('express')
const database =require('../config/db')
const router = express.Router()


const user =require('../model/userModel')
router.use(express.json())
router.use(express.urlencoded({extended:true}))

// router.get("/",async(req,res)=>{
//     //res.send("Hello world")
//     await user.find(
//         // {name:"sathi"}
//     ).then((user)=>{
//         res.send(user.json)
//     })
// })

router.get('/', async (req, res) => {
    try {
      const users = await user.find(); // Fetch all users from the database
      res.status(200).json(users); // Send the users as JSON
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// router.get("/",async(req,res)=>{
//     await user.findOneAndUpdate({
//         name:"nabin"
//     },{
//         name:"nabsat",
//         age:22
//     })
// })

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedUser = await user.findByIdAndDelete(id);
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  });

  router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedUser = await user.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, post } = req.body;  // Updated to 'post'
  try {
      const updatedUser = await user.findByIdAndUpdate(
          id,
          { name, email, post },  // Updated to 'post'
          { new: true }
      );
      if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(updatedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const { name, email, post } = req.body;  // Changed from age to post
  try {
      const userData = await user.create({
          name: name,
          email: email,
          post: post,  // Updated to 'post'
      });
      res.status(201).json(userData);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});


module.exports= router