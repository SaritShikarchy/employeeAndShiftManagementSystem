const shiftsService= require ('../services/shiftsService')
const express= require ('express');
const router= express.Router();

//entrypoint: http:/localhost:5000/shifts
router.get('/', async (req, res) => {
  try{
    const filters=req.query;
    const shifts= await shiftsService.getAllShifts(filters)
    res.send(shifts)
  }
  catch (error){
    res.status(500).send(error)
  }

})

router.get('/:id', async(req, res) => {
 try{
  const {id}= req.params
  const shift = await shiftsService.getShiftById(id)
  res.send(shift)
 }
 catch (error){
  res.status(500).send(error)
 }
})

router.post('/', async(req, res) => {
  try {
      const empObj= req.body;
      const newEmp= await shiftsService.addShift (empObj)
      res.status(201).send(`the new shift's id is ${newEmp._id}`)
  }
  catch (error){
    res.status(500).send(error)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const dataObj= req.body;
    const prevEmp= await shiftsService.updateShift(id, dataObj)
    res.status (200).send(prevEmp)
  }
  catch (error) {
    res.status(500).send(error)

  }
})

router.delete('/:id', async(req, res) => {
 try{
  const {id}= req.params;
  const deletedEmp= await shiftsService.deleteShift(id);
  res.status(201).send(deletedEmp)
 }
 catch(error){
  res.status(500).send(error)
 }
})


module.exports = router;