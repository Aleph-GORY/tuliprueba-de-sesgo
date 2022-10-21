from collections import Counter
from itertools import chain
from sklearn.decomposition import PCA
from operator import itemgetter
import numpy as np
import matplotlib.pyplot as plt
from tqdm import tqdm
from glob import glob
from nltk.stem import SnowballStemmer
from nltk.corpus import brown, stopwords
import nltk
from nltk.tokenize import word_tokenize, sent_tokenize

#Directorio de la colección
#directory = '/python/hackatonbbva2022/guiones_txt/'
directory = 'C:/Users/user/Documents/Python/hackatonbbva2022/guiones_txt/'



#characters = "¿!¡?.,;-"

characters = ""
charesp = '\x0c'
characters += charesp


#Guarda diccionario {documento:tokens}
documents = {}
documents_sents = {}
for filename in glob(directory+'*'):
    #Lee los documentos
    text = open(filename,'r').read()
    for x in range(len(characters)):
        text = text.replace(characters[x],"")
    alpha = text.strip()
    alpha = text.split("\n")
    alpha = text.strip()
    alpha = text.split("\n")
    





    
    try:
        while True:
            alpha.remove('')
    except ValueError:
        pass
    
    #Guarda documentos en diccionario
    documents[filename] = word_tokenize(text)
    documents_sents[filename] = alpha

#print(documents_sents)

#Guarda los terminos
terms = list(chain(*[tokens for tokens in documents.values()]))
#Frecuencia de terminos
term_frequencies = Counter(terms)
#Total de documentos considerados
num_documents = len(documents)

#print(documents_sents)


def obtenNGramas(listaPalabras, n):
    return [listaPalabras[i:i+n] for i in range(len(listaPalabras)-(n-1))]

#lista_duplas = obtenNGramas(terms,2)
#print(lista_duplas[:10])


#for dupla in lista_duplas:
    #if(lista_duplas[dupla[0][0] ] == ':'):
       # print(lista_duplas[dupla[0][1]])

#print(obtenNGramas(terms,2))

#print(documents)