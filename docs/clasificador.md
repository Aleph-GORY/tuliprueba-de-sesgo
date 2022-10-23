# Funcionamiento del clasificador

Pseudocódigo del algoritmo que determina si una conversación entre un conjunto de personajes cumple la prueba de Bechdel.

## Inputs

```json
{
    "prueba": "Bechdel",
    "titulo": "título de la película"
}
```


## Outputs

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