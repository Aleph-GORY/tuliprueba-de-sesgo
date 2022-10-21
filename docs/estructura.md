# Funcionamiento de la solución

La tuliprueba recibe un evento json con la siguiente estructura

```json
{
    "prueba": "Bechdel",
    "titulo": "título de la película"
}
```

para recibir un resultado exitoso, la película debe ser unq a la que el equipo tiene acceso a su respectivo guión cinematográfico.

El resultado de la prueba es un reporte de las estadísticas relevantes que el modelo calcula a través de la ejecución de las siguientes partes:

## Obtención y procesamiento de guión

Los guiones cinematrográficos son los datos brutos que deben ser procesados y estructurados para ser clasificados. Se obtienen de una de las siguientes fuentes de información

1. API Opensubtitles
1. [100 guiones en castellano gratis](http://escribirenserie.com/mas-100-guiones-castellano-gratis/)
1. [Guiones nominados al oscar](https://bloguionistas.com/descargar-guiones/)

estos guiones también pueden estar preprocesados en memoria.

Los metadatos de la película son datos extra que mejoran el análisis del texto y se usan para el frontend del sitio. Los metadatos clave son el nombre de lxs protagonistas, reparto, año de publicación y la portada. Se obtienen de una de las siguientes fuentes de información

1. API Películas

Una vez obtenido el guión, se procesa el texto para generar una lista de las conversdaciones ordenadas cronológicamente. Las conversaciones tienen la siguiente estructura

```json
{
    "participantes": ["Personaje 1", ... , "Personaje n"],
    "contenido": "transcripción de la conversación",
    "duracion": <numero de palabras intercambiadas en la conversación>,
    "dist": <distribución frecuencial de las palabras principales> 
}
```

El resultado del proceso es un evento de la forma
```json
{
    "titulo": "titulo de la película",
    "metadatos": {
        "personajes": ["Personaje 1", ... , "Personaje n"],
        "reparto": ["Actor/a 1", ... , "Actor/a n"],
        "portada": <imagen de portada>
    },
    "conversaciones": [{conversacion 1}, ... , {conversacion n}]
}
```

## Clasificación de las conversaciones

En base a los metadatos de la película, cada conversación es clasificada en **pasa** o **no pasa** la prueba Bechdel y calcula un porcentaje de confianza de la clasificación.
El funcionamiento del clasificador se describe en la [documentación del clasificador](./clasificador.md).

El resultado de la clasificación es un evento de la forma 

```json
{
    "titulo": "titulo de la película",
    "metadatos": {
        "personajes": ["Personaje 1", ... , "Personaje n"],
        "reparto": ["Actor/a 1", ... , "Actor/a n"],
        "portada": <imagen de portada>
    },
    "conversaciones": [{conversacion 1}, ... , {conversacion n}],
    "etiquetas": ["etiqueta 1", ... , "etiqueta n"],
    "confianza": [<procentage 1>, ... , <procentage n>],
}
```

## Análisis
Una vez se han clasificado todas las conversaciones se genera un reporte con las siguientes estadísticas

1. Porcentaje de funciones en cada etiqueta.
1. Histograma de los porcentajes de confianza.
1. Mapa de calor de confianza vs etiqueta.
1. Conversaciones seleccionadas por representar con alto grado de coinfianza la prueba de sesgo.
1. Una conclusión del análisis.

```json
{
    "titulo": "titulo de la película",
    "metadatos": {
        "personajes": ["Personaje 1", ... , "Personaje n"],
        "reparto": ["Actor/a 1", ... , "Actor/a n"],
        "portada": <imagen de portada>
    },
    "conversaciones-selectas": [{conversacion 1}, ... , {conversacion n}],
    "histogramas": <frecuencia de confianza y de etiquetas>,
    "conclusion": "Conclusión del análisis"
}
```

## Presentación de resultados

Los resultados se presentan en un sitio web con tres páginas:

- Página de inicio.
- Página de búsqueda de pelíulas.
- Página de presentación de los resultados del análisis.
