import peluqueria from '../assets/Cards/Peluqueria.jpg'
import paseos from '../assets/Cards/Paseos.jpg'
import veterinaria from '../assets/Cards/Veterinario.jpg'
import entrenamiento from '../assets/Cards/Entrenador.jpg'
import pelu1 from '../assets/Peluqueria/pelu1.jpg'
import pelu3 from '../assets/Peluqueria/pelu3.jpg'
import pelu4 from '../assets/Peluqueria/pelu4.jpg'

const mockServices = [
    {
        title: 'Peluqueria',
        description: 'Nuestros servicios de peluquería están diseñados para mantener a tus mascotas luciendo y sintiéndose bien. Desde cortes de pelo hasta baños y cuidados de piel, cada sesión es un momento de mimo.',
        image: peluqueria
    },
    {
        title: 'Paseos',
        description: 'Llevamos a tus peludos a disfrutar de paseos divertidos y seguros, asegurándonos de que tengan la actividad física que necesitan y, al mismo tiempo, explorando nuevos entornos.',
        image: paseos
    },
    {
        title: 'Veterinaria',
        description: 'Ofrecemos acceso a veterinarios de confianza que brindan atención médica de calidad, desde chequeos regulares hasta cuidados especiales, asegurando la salud y felicidad de tus mascotas.',
        image: veterinaria
    },
    {
        title: 'Entrenamiento',
        description: 'Contamos con entrenadores experimentados que utilizan métodos positivos para enseñar habilidades y buenos modales a tus mascotas, garantizando una convivencia armoniosa en el hogar.',
        image: entrenamiento
    },
]

const mockLocales = [
    {
        name: "Veterinarias Güemes",
        location: "Av. Marcelo T. de Alvear 1085 local 1",
        tel: "0351 469-1453",
        ig: "VeterinariaGuemes",
        calification: 4,
        img: pelu1
    },
    {
        name: "DACOR VETERINARIA - PET SHOP",
        location: "Gral. Simón Bolívar 945",
        tel:"0351 678-4060",
        ig: "Dacorveterinaria",
        calification: 5,
        img: pelu3
    },
    {
        name: "Pipispet",
        location: "Venezuela 109, Nueva Cordoba, esquina Buenos Aires",
        tel:"0351 398-3934",
        ig:"Pipispet",
        calification: 3,
        img: pelu4
    }
]
export { mockLocales, mockServices };
