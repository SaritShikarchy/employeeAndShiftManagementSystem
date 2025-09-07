const departmentsService= require ('../services/departmentsService')
const express= require ('express');
const router= express.Router();

//entrypoint: http:/localhost:5000/departments
router.get('/', async (req, res) => {
  try{
    const filters=req.query;
    const departments= await departmentsService.getAllDepartments(filters)
    res.send(departments)
  }
  catch (error){
    res.status(500).send(error)
  }

})

router.get('/:id', async(req, res) => {
 try{
  const {id}= req.params
  const department = await departmentsService.getDepartmentById(id)
  res.send(department)
 }
 catch (error){
  res.status(500).send(error)
 }
})

router.post('/', async(req, res) => {
  try {
      const departmentObj= req.body;
      const newDepartment= await departmentsService.addDepartment (departmentObj)
      //json(newEmp) -> in order to get the new department
      res.status(201).json(newDepartment)
  }
  catch (error){
    res.status(500).send(error)
  }
})

router.put('/:id', async(req, res) => {
  try{
    const {id} = req.params;
    const dataObj= req.body;
    const prevDepartment= await departmentsService.updateDepartment(id, dataObj)
    res.status (200).send(prevDepartment)
  }
  catch (error) {
    res.status(500).send(error)

  }
})

router.delete('/:id', async(req, res) => {
 try{
  const {id}= req.params;
  const deletedDepartment= await departmentsService.deleteDepartment(id);
  res.status(201).send(deletedDepartment)
 }
 catch(error){
  res.status(500).send(error)
 }
})


module.exports = router;