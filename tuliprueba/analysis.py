import math

def describe(total, female_convos):
    male = no_male = 0
    for conv in female_convos:
        if conv["male_topic"]:
            male += 1
        else:
            no_male +=1

    return {
        # "clasificación": True,
        "conversaciones-totales": total,
        "conversaciones-mujeres": len(female_convos),
        "conversaciones-mujeres-prcnt": round(100*len(female_convos)/total, 4),
        "centradas-en-hombres": male,
        "no-centradas-en-hombres": no_male,
        "pasan-la-prueba": round(100*no_male/len(female_convos), 4)
    }