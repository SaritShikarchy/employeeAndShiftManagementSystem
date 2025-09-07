
import {Routes, Route, Link} from 'react-router-dom'
//import Department from './pages/Department';
import Login from './pages/Login';
import Employees from './pages/Employees';
import EditEmployee from './pages/EditEmployee';
import NewEmployee from './pages/NewEmployee'
import Departments from './pages/Departments'
import EditDepartment from './pages/EditDepartment'
import NewDepartment from './pages/NewDepartment'
import Shifts from './pages/Shifts'
import EditShift from './pages/EditShift'
import NewShift from './pages/NewShift'





const App= () => {
 

return(
  <>
  
  <Routes>
  <Route path='/' element={<Login/>}></Route>
  {/* once you have '/employees' in the address row then move to <Employees/> componnent */}
  <Route path='/employees' element={<Employees/>}></Route>
  <Route path='/editEmployee/:id' element={<EditEmployee/>}></Route>
  <Route path='/newEmployee' element={<NewEmployee/>}></Route>
  <Route path='/departments' element={<Departments/>}></Route>
  <Route path='/editDepartment/:id' element={<EditDepartment/>}></Route>
  <Route path='/newDepartment' element={<NewDepartment/>}></Route>
  <Route path='/shifts' element={<Shifts/>}></Route>
  <Route path='/editShift/:id' element={<EditShift/>}></Route>
  <Route path='/newShift' element={<NewShift/>}></Route>
  </Routes>


       
  </>
);

};

export default App;