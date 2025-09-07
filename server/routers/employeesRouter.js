const employeesService= require ('../services/employeesService')
const express= require ('express');
const router= express.Router();

//entrypoint: http:/localhost:5000/employees
router.get('/', async (req, res) => {
  try{
    const filters=req.query;
    const employees= await employeesService.getAllEmployees(filters)
    res.send(employees)
  }
  catch (error){
    res.status(500).send(error)
  }

})

router.get('/:id', async(req, res) => {
 try{
  const {id}= req.params
  const employee = await employeesService.getEmployeeById(id)
  res.send(employee)
 }
 catch (error){
  res.status(500).send(error)
 }
})

router.post('/', async(req, res) => {
  try {
      const empObj= req.body;
      const newEmp= await employeesService.addEmployee (empObj)
      res.status(201).json(newEmp)
  }
  catch (error){
    res.status(500).send(error)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const dataObj= req.body;
    const prevEmp= await employeesService.updateEmployee(id, dataObj)
    res.status (200).send(prevEmp)
  }
  catch (error) {
    res.status(500).send(error)

  }
})

router.delete('/:id', async(req, res) => {
 try{
  const {id}= req.params;
  const deletedEmp= await employeesService.deleteEmployee(id);
  res.status(201).send(deletedEmp)
 }
 catch(error){
  res.status(500).send(error)
 }
})


module.exports = router;