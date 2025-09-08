
const express= require ('express')
const { updateActionAllowd, todayStr } = require('../utils/usersActions');
const router= express.Router();

router.post('/', async(req, res) => {
try{
    const {userId}= req.body;
    if (!userId) return res.status(400).json({ error: 'userId is required' });
   
    const date = todayStr(); 
    //updateActionAllowd checks if the record of  user_id+date exist
    //if the record exist then it increase the number of 'actionAllowd'
    //if the record doesn't exist then err is thrown ('DAILY_LIMIT'/ 'NOT FOUND') 
    const rec=await updateActionAllowd (userId, date)
    return res.status(200).json({ ok: true, record: rec });
    }

catch (e) {
  console.error(e);
  if (e.code === 'DAILY_LIMIT') return res.status(403).json({ error: e.message });
  if (e.code === 'NOT FOUND')   return res.status(404).json({ error: e.message });
  return res.status(500).json({ error: 'server error', detail: e.message });
}
})

module.exports =router;
    

