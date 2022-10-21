from asyncore import write
import file_parser

import NERPOSTagging

directory = 'C:/Users/user/Documents/Python/hackatonbbva2022/guiones_txt/'

pelicula_sents = file_parser.documents_sents.copy()
POStagger = NERPOSTagging.POStagger
NERtagger = NERPOSTagging.NERtagger



file = open("reporte/1.txt", "w")

for sent in  pelicula_sents['C:/Users/user/Documents/Python/hackatonbbva2022/guiones_txt\\blade_runner.txt']:
    for w,t in NERtagger.tag(sent.split()):
        print('{},{} '.format(w,t))
        file.write('\n {}\t{}\n'.format(w,t))

    for w,t in POStagger.tag(NERPOSTagging.process(sent)):
        print('{}\t{}'.format(w,t))
        file.write('{}\t{}'.format(w,t))
file.close()