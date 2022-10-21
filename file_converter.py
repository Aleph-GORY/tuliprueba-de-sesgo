from io import StringIO
import os

from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.pdfpage import PDFPage
from pdfminer.pdfparser import PDFParser

import re
from unicodedata import normalize

#Convertir PDF a txt.

# Nombre de la pelicula
nombre = input("\n Introduzca el nombre del archivo: \n")
print("¿Es {}.pdf el nombre del archivo? ".format(nombre))

# Abrimos el archivo.
# Importante recorrer una lista de pdfs para automatizar este proceso.
output_string = StringIO()
with open('guiones/Blade_Runner_Ridley_Scott_1982.pdf', 'rb') as in_file:
    parser = PDFParser(in_file)
    doc = PDFDocument(parser)
    rsrcmgr = PDFResourceManager()
    device = TextConverter(rsrcmgr, output_string, laparams=LAParams())
    interpreter = PDFPageInterpreter(rsrcmgr, device)
    for page in PDFPage.create_pages(doc):
        interpreter.process_page(page)

# Creamos el txt con os.
file = open("guiones_txt/"+nombre+".txt", "w")
for word in output_string.getvalue():
    s = word
    s = re.sub(
        r"([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+", r"\1", 
        normalize( "NFD", s), 0, re.I
    )
    s = normalize( 'NFC', s)
    word = s
    file.write(word)
file.close()






#print(output_string.getvalue())