export const setIntervalNya = (timeEvent) => {
  return {
    type:'SET_INTERVAL_EVENT',
    payload : timeEvent
  }
}
export const counterNya = (second) => {
  return {
    type:'SET_INTERVAL_COUNTER',
    payload : second+1
  }
}
export const hapusInterval = () => {
  return {
    type:'REMOVE_INTERVAL'
  }
}