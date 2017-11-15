import csv
import json

lines =[]
date = []
rain = []

with open ("KNMIregen.txt") as csvfile:
    reader = csv.DictReader(csvfile)

    
    b = -1
    lines = []
    for row in reader:
    	
    	
        b = b+1
        
        if (b >= 11):
        	lines.append(row)
    
        

month = -1
months =["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "okt", "nov", "dec"]

monthInput = []
for i in range(0, len(lines)):
		
	myDict = dict((key,value) for key, value in lines[i].iteritems() if key == None)
	
		
		
	myDictDate = dict.values(myDict)[0][0]
	myDictRain = int(dict.values(myDict)[0][1])

	
	if myDictDate[-2:] == "01":
		month += 1

		
	monthInput.append(months[month])	
	date.append(myDictDate)
	rain.append(myDictRain)





data = [{'Date': Date, 'Rain': Rain} for Date, Rain in zip(monthInput, rain)]

with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)



		


	




