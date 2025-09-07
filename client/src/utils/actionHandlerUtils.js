//actionHandlerUtils checks if the res is ok or not
// in case res is different from ok, send adjusted alert to screen and navigate to Login page.
// in case of res is ok then nothing is done

//navigate is an Hook, so we can't define it in a function, therefore we move it from the component
export function actionHandlerUtils(res, navigate) {

  if (!res.ok) {
    if (res.reason === 'DAILY_LIMIT') {
      alert('no more action allowed today');
    } else if (res.reason === 'NOT_FOUND') {
      alert('no daily record found for user');
    } else {
      alert('server error');
    }
    navigate('/');
    return false;
  }
  return true;
}