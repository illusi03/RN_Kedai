export default Constant = {
  host:'http://192.168.1.20:5000/api/v1'
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