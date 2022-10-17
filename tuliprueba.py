import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

def handler(event, context):
    logger.info(f"Ejecutando la prueba {event['prueba']}, a la película {event['titulo']}")
    return "10%"

