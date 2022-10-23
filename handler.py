import sys
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    logger.info(f"Ejecutando la prueba Bechdel/Wallace, a la película {event.get('movie_id')}")
    return {
        "results": '¡RESULTADOS DE LA TULIPRUEBA A LA PELÍCULA ' + event.get('movie_id') + '!',
        "dialogues": len(event.get('paragraphs', []))
    }

