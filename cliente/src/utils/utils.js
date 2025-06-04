import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/es';

dayjs.extend(utc);

export function getFecha() {
    return dayjs().format('DD/MM/YYYY HH:mm');  // Fecha en formato dd/mm/aaaa
}

export function getHora() {
    return dayjs().format('HH:mm');  // Hora en formato hh:mm
}

export function formatearFechaLocal(datetimeStr) {
  const date = new Date(datetimeStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


export const mayuscPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }