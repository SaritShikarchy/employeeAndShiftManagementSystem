//const express= require ('./express')
const jf= require('jsonfile');
const path = require('path');

//const USERS_ACTIONS= 'data/usersActionsData.json'
const USERS_ACTIONS = path.resolve(__dirname, '../data/usersActionsData.json');


//function that returns the date in format: dd/mm/yyyy
function todayStr(){
    const d= new Date()
    //getting only the date with two digits. padStard make sure the the length of day will be 2, in case less then add '0'
    const dd= String(d.getDate()).padStart(2, '0')
    //getMonth return the month in this range 0-11 , therefore 1 is added
    const mm= String(d.getMonth()+1).padStart (2,'0')
    const yyyy= String(d.getFullYear())
    //return `${dd}/${mm}/${yyyy}`;
      return `${dd}/${mm}/${yyyy}`;

}

async function readActions() {
    try{
        const data= await jf.readFile(USERS_ACTIONS)
        //checks if the array existing, if not return an ampty array
        return Array.isArray (data.actions) ? data.actions : []
    }
    //in case of failue we want to return an empty array
    catch{
        //return []
        if (e.code === 'ENOENT') return [];
    throw e;
}
}


function idToString(id)   { return String(id).trim(); }
function dateToString(date) { return String(date).trim(); }

async function writeActions(actionArray) {
      return  jf.writeFile(USERS_ACTIONS, {actions: actionArray}, {spaces: 2})
}


async function findIndexByIdAndDate(id, date) {
    console.log(`${id} id from updateActionAllowd`)
    const allActions= await readActions()
    const idAsString  = idToString(id);
  const dateAsString = dateToString(date);
    const actionIndex=allActions.findIndex ((action)=> (idToString(action.id)=== idAsString) && (dateToString(action.date)=== dateAsString))
    //return an object with array and index, since we need to update the array 
    return {allActions, actionIndex};
}

async function updateActionAllowd (id, date ) {
    console.log(`${id} id from updateActionAllowd`)
    const {allActions, actionIndex} = await findIndexByIdAndDate (id, date)
    if (actionIndex === -1) {
        const err= new Error (`The records with date ${date} and id ${id} wasn't found`)
        err.code= 'NOT FOUND'
        throw err;
    }
    const current = allActions[actionIndex];
    //actionAllowdUser- includes the number of actions that already were allowed for this user today
    let actionAllowdUser= Number (current.actionAllowd);
    const actionMaxActions= Number (current.maxActions);
    if ((actionMaxActions-actionAllowdUser) <= 0) {
            const err= new Error (`The user is not allow to perform any actions today`)
            err.code='DAILY_LIMIT'
            throw err;

    }
    current.actionAllowd = actionAllowdUser + 1
    await writeActions (allActions)
    return current;
}

const getUsers =() => {
    return jf.readFile(USERS_ACTIONS)
}

module.exports= {todayStr, readActions, writeActions, findIndexByIdAndDate, updateActionAllowd, getUsers}