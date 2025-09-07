//toDateInputValue - this function gets the date and convert is to promt date format
export function toDateInputValue(value) {
  if (!value) return '';

  //in case the date format is already: yyyy-MM-dd
  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) return value;

  //in case the date defined as String
  if (typeof value === 'string') {
    const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if (m) return `${m[3]}-${m[2]}-${m[1]}`; 
  }

  let d;

//in case it's defined to number we check if it's written in seconds or miliseconds
  if (typeof value === 'number') {
    d = new Date(value < 1e12 ? value * 1000 : value);
  } else {
//creating date
    d = value instanceof Date ? value : new Date(value);
  }

 //checks that the date is corrcet
  if (!isNaN(d.getTime())) {
    //in order not to have the next day
    const tzOffset = d.getTimezoneOffset() * 60000;
    return new Date(d.getTime() - tzOffset).toISOString().slice(0, 10);
  }

  return '';
}

export function todayISOLocal() {
  const now = new Date();
  const tzOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 10);
}

//this function returns the current date in format dd-mm-yyyy
export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

//this function returns the current date in format: dd/mm/yyyy
export function todayStr() {
    //create object of the current date
    const d = new Date();
    const dd = String (d.getDate()).padStart(2, '0');     
    const mm = String (d.getMonth() + 1).padStart(2, '0'); 
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

// // מחזיר את היום בפורמט dd/MM/yyyy (נוח להצגה/שרת)
// export function todayDDMMYYYY() {
//   const [yyyy, mm, dd] = todayISO().split('-');
//   return `${dd}/${mm}/${yyyy}`;
// }
