export default Constant = {
  host:'https://kedai-azhari.herokuapp.com/api/v1'
}
export const convertToRupiah = (angka) => {
  let rupiah = '';
  let angkarev = angka.toString().split('').reverse().join('');
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + '.';
  return 'Rp. ' + rupiah.split('', rupiah.length - 1).reverse().join('');
}
// Rupiah to angka
export const convertToAngka = (rupiah) => {
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10);
}

export const convertIntToTime = (given_seconds) => {
  dateObj = new Date(given_seconds * 1000);
  hours = dateObj.getUTCHours();
  minutes = dateObj.getUTCMinutes();
  seconds = dateObj.getSeconds();
  timeString = hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0');
  this.setState({
    waktuNya: timeString
  })
}