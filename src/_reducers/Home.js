initialState = {
  isLoading: true,
  timer: 0,
  timerEvent: '',
  timerString: '00:00:00'
}

convertIntToTime = (given_seconds) => {
  dateObj = new Date(given_seconds * 1000);
  hours = dateObj.getUTCHours();
  minutes = dateObj.getUTCMinutes();
  seconds = dateObj.getSeconds();

  timeString = hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
  return timeString
}

export default Home = (state = initialState, action) => {
  switch (action.type) {
    //Untuk Menus Umum
    case 'SET_INTERVAL_EVENT':
      return {
        ...state,
        timerEvent: action.payload
      }
      break
    case 'SET_INTERVAL_COUNTER':
      return {
        ...state,
        timer: action.payload,
        timerString: convertIntToTime(action.payload)
      }
      break
    case 'REMOVE_INTERVAL':
      return {
        ...state,
        timerEvent:null,
        timer:0,
        timerString:'00:00:00'
      }
      break
    default:
      return state
      break
  }
}