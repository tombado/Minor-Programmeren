import csv
lines =[]
date = []
temp = []

with open ("C:\Users\Gebruiker\Documents\GitHub\Minor-Programmeren\week 3\KNMI_20161231.csv") as csvfile:
    reader = csv.DictReader(csvfile)

    
    b = -1
    for row in reader:
        b = b+1
        
        if (b >= 11):
        	lines.append(row)




	for i in range(0, len(lines)):
		
		#myDict = dict((key,value) for key, value in lines.iteritems() if key == None)
		#print myDict
		print i
		#myDictDate = dict.values(myDict)[0][0]
		#myDictTemp = dict.values(myDict)[0][1]
		

		#date.append(myDictDate)
		#temp.append(myDictTemp)
print lines[0]



	




myDict = dict((key,value) for key, value in lines[0].iteritems() if key == None)
print myDict
print dict.values(myDict)[0]