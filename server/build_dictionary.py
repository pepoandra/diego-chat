import sys
import re
import json

global input_msg
global full_dict


full_dict = {}
if (len(sys.argv) < 2):
		raise Exception("Enter at least 1 (ONE) text file, please.  Thank you kindly.")
for textFile in sys.argv[1:]:
	fileContent = ""
	try:
		thisFile = open(textFile, "r")
		fileContent = (re.sub(r'([^\s\w.!?-]|_|\n)+', ' ', thisFile.read().lower()))
	except IOError:
		print "ERROR 404: FILE NOT FOUND"
	thisFile.close()
	prev_word = ''
	for word in fileContent.replace('-', ' ').split(" "):
		if "%s-%s" % (prev_word,word) in full_dict and word != '':
			full_dict["%s-%s" % (prev_word,word)]+= 1
		elif prev_word != '' and word != '':
			full_dict["%s-%s" % (prev_word,word)] = 1
		if word != '':
			prev_word = word

with open('result.json', 'w') as fp:
    json.dump(full_dict, fp)