const usersService= require ('../services/usersService')
const express= require ('express');
const router= express.Router();

//entrypoint: http:/localhost:5000/users
router.get('/', async (req, res) => {
  try{
    const filters=req.query;
    const users= await usersService.getAllUsers(filters)
    res.send(users)
  }
  catch (error){
    res.status(500).send(error)
  }

})

router.get('/:id', async(req, res) => {
 try{
  const {id}= req.params
  const user = await usersService.getUserById(id)
  res.send(user)
 }
 catch (error){
  res.status(500).send(error)
 }
})

router.post('/', async(req, res) => {
  try {
      const empObj= req.body;
      const newEmp= await usersService.addUser (empObj)
      res.status(201).send(`the new user's id is ${newEmp._id}`)
  }
  catch (error){
    res.status(500).send(error)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const dataObj= req.body;
    const prevEmp= await usersService.updateUser(id, dataObj)
    res.status (200).send(prevEmp)
  }
  catch (error) {
    res.status(500).send(error)

  }
})

router.delete('/:id', async(req, res) => {
 try{
  const {id}= req.params;
  const deletedEmp= await usersService.deleteUser(id);
  res.status(201).send(deletedEmp)
 }
 catch(error){
  res.status(500).send(error)
 }
})


module.exports = router;