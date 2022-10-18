# TuliPrueba de sesgo

Solución del equipo Tulipanas para la detección de sesgo en películas. Hackathon BBVA 2022

## Objetivo

Desarrollar un clasificador de películas y series basado en la Prueba de Bechdel un método para evaluar el sesgo de género en libretos de cine. Los resultados del modelo serán presentados en un sitio web interactivo, con información acerca de la prueba en que está inspirado.

## Descripción de la prueba

[Wikipedia] 

Virginia Wolf critica que en la mayor parte de la literatura de ficción la presencia de un personaje femenino se debe solamente a su vínculo con un personaje masculino existente, y la relevancia del personaje femenino deriva de dicho vínculo.

El test aparece mencionado por primera vez en 1985, en una tira cómica llamada The Rule, en la página 22 de Dykes to Watch Out For, una de las protagonistas declara que sólo está dispuesta a ver una película si cumple con los siguientes requisitos:

1. Aparecen al menos dos personajes femeninos.
1. Que mantienen una conversación.
1. Que no tiene como tema un hombre.

Una versión posterior exige que, además, las dos mujeres sean personajes con nombre, no simples figurantes. También se ha señalado que la conversación entre las mujeres no debe centrarse en relaciones personales afectivas: por ejemplo, no superaría el test una conversación entre dos hermanas sobre su padre.

## Estructura de la solución

La solución consiste en un clasificador desplegado en una función lambda de AWS, que tenga como entradas el título de una película o episodio de una serie y que a través de análisis de texto de los subtítulos otorgue estadísticas del número de conversaciones que cumplen la prueba de Bechdel.

### Fuentes de información

1. API Opensubtitles
2. API Películas
3. [100 guiones en castellano gratis](http://escribirenserie.com/mas-100-guiones-castellano-gratis/)
4. [Guiones nominados al oscar](https://bloguionistas.com/descargar-guiones/)

### Ejecutar funcion localmente

    python-lambda-local -f handler tuliprueba.py event.json