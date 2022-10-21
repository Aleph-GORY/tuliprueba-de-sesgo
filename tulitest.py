import nertworkx as nx

def class Personaje(nombre,genero):
    def __init__(self,nombre,genero):
        
        self.nombre = nombre
        self.genero = genero
    def getNombre():
        return self.nombre
    def getGenero():
        return self.genero #femenino/masculino


def personajes_con_dialogo( list(Personaje) personajes_con_dialogo):
    Grafo = nx.Graph()
    for i in personajes_con_dialogo: 
        Grafo.add_node(i.getNombre())
        for j in personajes_con_dialogo:
            Grafo.add_node(j.getNombre())
            if(personajes_con_dialogo[i].existeUnDialogo(i, j)):
                Grafo.add_edge("{},{}".format(i.getNombre(),j.getNombre()), weight = 1) #Sumar algun valor por cada conversación registrada entre dos personajes.


def dosMujeresHablan(Personaje a, Personaje b):
    if((Grafo.hasEdge(a,b)) and (a.getGenero() == b.getGenero() == 'femenino')):
        return True
    else:
        return False

def hayAlMenos2Mujeres(list personajes_con_dialogo):
    c = 0
    for personaje in personajes_con_dialogo:
        if(personaje.getGenero() == 'femenino'):
            c += 1
        if(c >= 2):
            return True
    return False
# x es igual a la pregunta ¿Hay al menos dos mujeres?
# y es igual a la pregunta ¿Estas dos sostienen una conversacion?
# z es un valor entre [0,1], una función de contexto de conversaciones, para saber si en general podemos afirmar que la conversación trata o no de un hombre. Z muy cercanos a 0 
# indica que posiblemente la conversación trate de un hombre.
def Tulitest((bool x, bool y, float z)):
    w = False
    if((x) and (y) and (z >=0.75)):
        w = True
    return w