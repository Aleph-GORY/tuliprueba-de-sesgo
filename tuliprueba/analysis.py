def describe(convos):
    total = male = female = 0
    for conv in convos:
        total += 1
        if conv["male_topic"]:
            male += 1
        else:
            female +=1

    return {
        "total": total,
        "female": female/total,
        "male": male/total
    }