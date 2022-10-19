# Funcionamiento de la solución

La tuliprueba recibe un evento json con la siguiente estructura

```json
{
    "prueba" : "Bechdel",
    "titulo" : "Trainspotting"
}
```

para recibir un resultado exitoso, el título de la película debe ser uno de los títulos a los que el equipo tiene acceso a su respectivo guión cinematográfico.

El resultado de la prueba es un reporte de las estadísticas relevantes que el modelo calcula a través de la ejecución de las siguientes partes. 

## Procesamiento de guión

### Conseguir el guión y metadatos de la película

Los guiones cinematrográficos son la entrada principal al clasificador, se obtendrán de una de las siguientes fuentes de información

1. API Opensubtitles
1. [100 guiones en castellano gratis](http://escribirenserie.com/mas-100-guiones-castellano-gratis/)
1. [Guiones nominados al oscar](https://bloguionistas.com/descargar-guiones/)

también pueden estar guardados en memoria.

Los metadatos de la película son datos extra que mejoran el análisis del texto al dar contexto al clasificador y se usan para el frontend del sitio web. Metadatos clave son el nombre de lxs protagonistas, reparto, año de publicación, portada. Se obtienen de una de las siguientes fuentes de información

1. API Películas

### Separar las conversaciones

Se procesa el texto del guion para generar una lista de las conversdaciones ordenada cronológicamente. Las conversaciones son diccionarios con la siguiente estructura

```json
{
    "participantes" : ["Mark", "Spud", "SlickBoy"],
    "contenido" : <transcripción de la conversación>,
    "duracion": <tamaño del contenido>,
    "dist": <distribución frecuencial de cada palabra> 
}
```

## Clasificación

Cada conversación es clasificada en si cumple o no la prueba de Bechdel y en qué medida.

## Análisis
Una vez se han clasificado todas las conversaciones se genera un reporte 