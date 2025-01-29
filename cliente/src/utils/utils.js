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
