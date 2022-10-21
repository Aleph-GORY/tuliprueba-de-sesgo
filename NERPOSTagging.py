from nltk.tag import hmm
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from itertools import chain
from tqdm import tqdm
from nltk.stem import SnowballStemmer


#Determinación de un stemmer
stemmer = SnowballStemmer('spanish')
# Etiquetado WIKINER: 
# fuente: https://figshare.com/articles/dataset/Learning_multilingual_named_entity_recognition_from_Wikipedia/5462500
# https://doi.org/10.6084/m9.figshare.5462500.v1

# Se pueden encontrar más corpus etiquetados en https://github.com/juand-r/entity-recognition-datasets

#Abre el documento con corpus
ruta = 'C:/Users/user/Documents/Python/hackatonbbva2022/datasets_etiquetados/Wikiner/'
text = open(ruta+'aij-wikiner-es-wp2.txt','r').read().strip().split('\n')


#Corpus NER
corpus_NER = []
#Corpus NER+POS
corpus_FULL = []
#Corpus POS 
corpus_POS = []
for sent in tqdm(text):
    #Guarda oraciones con POS+NER
    tagged_sent = []
    #Guarda oraciones con NER
    NER_sent = []
    POS_sent = []
    for pack in sent.split():
        #Separa en token, POS, NER
        w, pos, ner = pack.split('|')
        #Guarda POS+NER
        tagged_sent.append((w,pos,ner))
        #Guarda NER
        NER_sent.append((w,ner))
        #Guarda POS
        POS_sent.append((w,pos))
    corpus_FULL.append(tagged_sent)
    corpus_NER.append(NER_sent)
    corpus_POS.append(POS_sent)

#Elimina elementos vacíos del corpus NER
corpus_n = [sent for sent in corpus_NER if sent != []]

# Stemizador. Se obtiene la raíz linguistica o semantica de una palabra, facilitando su procesamiento
corpus_p = [[(stemmer.stem(token[0]), token[1][:2]) for token in sent if token[1][:1] != 'F'] for sent in corpus_POS]
#Elimina oraciones vacías
corpus_p = [sent for sent in corpus_p if sent != []]

#Dividimos en evaluación y entrenamiento el etiquetado NER
train_data_n, test_data_n = train_test_split(corpus_n, test_size=0.2)

#Dividimos en evaluación y entrenamiento el etiquetado POS
train_data_p, test_data_p = train_test_split(corpus_p, test_size=0.2)

print(len(train_data_n), len(test_data_n))

#Genera el modelo
HMMNER = hmm.HiddenMarkovModelTrainer()
#Entrena el modelo
NERtagger = HMMNER.train_supervised(train_data_n)

#Genera el modelo
HMMPOS = hmm.HiddenMarkovModelTrainer()
#Entrena el modelo
POStagger = HMMPOS.train_supervised(train_data_p)


#Etiquetas reales POS
Yp = []
#Etiquetas predichas POS
Yp_pred = []
for test_sent in tqdm(test_data_p):
    #Observaciones y emisiones POS
    x,y = zip(*test_sent)
    #Predicción
    y_pred = POStagger.tag(list(x))
    
    #Guarda las etiquetas POS
    Yp.append(list(y))
    Yp_pred.append([tag[1] for tag in y_pred])

print(classification_report(list(chain(*Yp)), list(chain(*Yp_pred))))

#Función de pre-procesamiento
process = lambda sent: [stemmer.stem(w) for w in sent.split()]
#Oración a etiquetar
#sentence = 'presidente andres manuel lopez obrador'
#Etiquetado
#for w,t in POStagger.tag(process(sentence)):
   # print('{}\t{}'.format(w,t))


#Etiquetas reales NER
Y = []
#Etiquetas predichas NER
Y_pred = []
for test_sent in tqdm(test_data_n):
    #Observaciones y emisiones NER
    x,y = zip(*test_sent)
    #Predicción
    y_pred = NERtagger.tag(list(x))
    
    #Guarda las etiquetas NER
    Y.append(list(y))
    Y_pred.append([tag[1] for tag in y_pred])


print(classification_report(list(chain(*Y)), list(chain(*Y_pred))))

#sent = 'presidente andres manuel lopez obrador'
#print(NERtagger.tag(sent.split()))