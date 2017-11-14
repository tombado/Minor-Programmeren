import csv
import json

lines =[]
date = []
temp = []

with open ("C:\Users\Gebruiker\Documents\GitHub\Minor-Programmeren\week 3\KNMI_20161231.csv") as csvfile:
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
	myDictTemp = float(dict.values(myDict)[0][1]) / 10

	
	if myDictDate[-2:] == "01":
		month += 1

		
	monthInput.append(months[month])	
	date.append(myDictDate)
	temp.append(myDictTemp)



#print json.dumps([{'Date': Date, 'Temperature': Temperature} for Date, Temperature in zip(date, temp)])

data = [{'Date': Date, 'Temperature': Temperature} for Date, Temperature in zip(monthInput, temp)]
with open('data.txt', 'w') as outfile:
    json.dump(data, outfile)



		


	




