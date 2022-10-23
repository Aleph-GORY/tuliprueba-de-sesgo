import re

confirmed_convos = []

def paragraph(pg):
            
    for i, dialogue in enumerate(pg['dialogues']):
        # if current line is female
        if dialogue['gender'] == 0:
            # if last line wasn't from same character
            if dialogue['character'] != pg['dialogues'][i-1]['character']:
                # and that person was also female
                if pg['dialogues'][i-1]['gender'] == 0:
                    # Take last 2 and next 2 lines
                    female_convo = pg['dialogues'][i-2:i+3]
                    
                    # Init topic
                    male_topic = False
                        
                    # Go through every line
                    for j in female_convo:
                        # that isn't an action
                        if j['character'] != 'NA':
                            # Clean line and add whitespaces to beginning and end, so the any() function finds the male words
                            clean_line = re.sub(r"[^\w\s']", "", j['line'])
                            conv = ' '+clean_line+' '
                            
                            # Check if line has already been seen or not
                            # If yes - break the loop
                            if conv in confirmed_convos:
                                topic = 'duplicate' # placeholder value to delete easily
                                break
                            else:
                            # If not, add it to seen lines
                                confirmed_convos.add(conv)
                                
                            # Init male_topic inside loop
                            male_topic = False
                                
                            # If any of the male words appear in any of the lines
                            # Markt it as a male topic and break loop
                            topic = next((phrase for phrase in male_words if phrase in conv), "")
                            if topic != "":
                                male_topic = True
                                break
                        
                    convo_topic.append({"female_convo": female_convo, "male_topic": male_topic, "topic": topic})
    
    convo_topic = [i for i in convo_topic if i['topic'] != 'duplicate']
        
    female_convos = json.dumps({"female_convos": convo_topic})
    return female_convos