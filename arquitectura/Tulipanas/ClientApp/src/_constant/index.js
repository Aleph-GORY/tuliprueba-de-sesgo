/** AUX **/
export const validateMessages = {
    "default": "Error de validación del campo",
    "required": "Este campo es requerido",
    "enum": "${label} debe ser uno de [${enum}]",
    "whitespace": "El campo no puede estar en blanco",
    "date": {
        "format": "El formato de fecha es inválido",
        "parse": "No se puede convertir a una fecha",
        "invalid": "Fecha inválida"
    },
    "types": {
        "string": "El campo no es un texto válido",
        "method": "El campo no es un método válido",
        "array": "El campo no es un array válido",
        "object": "El campo no es un objeto válido",
        "number": "El campo no es un número válido",
        "date": "El campo no es una fecha válido",
        "boolean": "El campo no es un bool válido",
        "integer": "El campo no es un int válido",
        "float": "El campo no es un float válido",
        "regexp": "El campo no es un campo válido",
        "email": "El campo no es un email válido",
        "url": "El campo no es una url válido",
        "hex": "El campo no es un hex válido"
    },
    "string": {
        "len": "Debe tener ${len} caracteres",
        "min": "Debe tener al menos ${min} caracteres",
        "max": "Debe tener hasta ${max} caracteres",
        "range": "Debe tener entre ${min}-${max} caracteres"
    },
    "number": {
        "len": "El valor debe ser igual a ${len}",
        "min": "El valor mínimo es ${min}",
        "max": "El valor máximo es ${max}",
        "range": "El valor debe estar entre ${min}-${max}"
    },
    "array": {
        "len": "Debe ser ${len}",
        "min": "Al menos ${min}",
        "max": "A lo mucho ${max}",
        "range": "El monto debe estar entre ${min}-${max}"
    },
    "pattern": {
        "mismatch": "El campo no coincide con lo esperado"
    }
};

/** CONSTANTS **/

export const CAMBIAR_CONTRA = 'CAMBIAR_CONTRA';
export const CAMBIAR_CONTRA_SUCCESS = 'CAMBIAR_CONTRA_SUCCESS';
export const CAMBIAR_CONTRA_ERROR = 'CAMBIAR_CONTRA_ERROR';