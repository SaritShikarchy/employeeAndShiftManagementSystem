import axios from 'axios'
import { todayStr } from '../utils/dateUtils';
//const PORT = 'http://localhost:5000';
const PORT = import.meta.env.VITE_BACKEND_URL;

export async function actionsAllowedClientUtils(userId){

  if (!userId) {
    console.error('actionsAllowedClientUtils: missing userId');
    return { ok: false, reason: 'NO_USER', msg: 'missing userId' };
  }

try {
  
    await axios.post(`${PORT}/userAction`, {userId}, { timeout: 10000 });
    console.log(userId)
    return { ok: true };
  } catch (err) {
    const status = err.response?.status;

    if (!err.response) {
      //network issues
      console.error('actionsAllowed network error', err.message);
      return { ok: false, reason: 'NETWORK', msg: 'network error' };
    }

    if (status === 403) return { ok: false, reason: 'DAILY_LIMIT', msg: err.response?.data?.error };
    if (status === 404) return { ok: false, reason: 'NOT_FOUND',  msg: err.response?.data?.error };

    console.error('actionsAllowed error:', err);
    return { ok: false, reason: 'SERVER', msg: 'server error' };
  }
}