const employeesShiftsService= require ('../services/employeesShiftsService')
const express= require ('express');
const router= express.Router();

//entrypoint: http:/localhost:5000/employeesShifts
router.get('/', async (req, res) => {
  try{
    const filters=req.query;
    const employeesShifts= await employeesShiftsService.getAllEmployeesShifts(filters)
    res.send(employeesShifts)
  }
  catch (error){
    res.status(500).send(error)
  }

})

router.get('/:id', async(req, res) => {
 try{
  const {id}= req.params
  const employeeShift = await employeesShiftsService.getEmployeeShiftById(id)
  res.send(employeeShift)
 }
 catch (error){
  res.status(500).send(error)
 }
})

router.get('/emp/:id', async(req, res) => {
 try{
  const {id}= req.params
  const employeeShifts = await employeesShiftsService.getAllEmployeeShiftsByEmpId(id)
  res.send(employeeShifts)
 }
 catch (error){
  res.status(500).send(error)
 }
})


router.post('/', async(req, res) => {
  try {
      const empShiftObj= req.body;
      const newEmpShift= await employeesShiftsService.addEmployeeShift (empShiftObj)
      res.status(201).send(`the new employee-shift's id is ${newEmpShift._id}`)
  }
  catch (error){
    res.status(500).send(error)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const dataObj= req.body;
    const prevEmpShift= await employeesShiftsService.updateEmployeeShift(id, dataObj)
    res.status (200).send(prevEmpShift)
  }
  catch (error) {
    res.status(500).send(error)

  }
})

router.delete('/:id', async(req, res) => {
 try{
  const {id}= req.params;
  const deletedEmpShift= await employeesShiftsService.deleteEmployeeShift(id);
  res.status(201).send(deletedEmpShift)
 }
 catch(error){
  res.status(500).send(error)
 }
})

router.delete('/emp/:id', async(req, res) => {
  console.log("🔴 DELETE /emp/:id called with:", req.params.id);

 try{
  const {id}= req.params;
  const employeeShifts = await employeesShiftsService.getAllEmployeeShiftsByEmpId (id)
  for (const empshift of employeeShifts){
    const shiftIDToDelete=empshift._id;
    await employeesShiftsService.deleteEmployeeShift(shiftIDToDelete)
  }
  res.status(201).send("all related shifts were deleted")
   
 }
 catch(error){
  res.status(500).send(error)
 }
})

module.exports = router;