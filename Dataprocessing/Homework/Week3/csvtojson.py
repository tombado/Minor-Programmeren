# Thomas van Dooren, 10625488, dataprocessing. This file imports a csv file that has been downloaded 
# from the KNMI website: http://projects.knmi.nl/klimatologie/daggegevens/selectie.cgi.
# This file exports a json file.

import csv
import json

lines 		= []
date 		= []
rain 		= []
lineNumber 	= -1

# Open the data file and scan the lines
with open ("KNMIregen.txt") as csvfile:
    reader = csv.DictReader(csvfile)

    for row in reader:
    	
    	# Keep track of the linenumber, so the introduction of the csv file can be skipped.
        lineNumber += 1

        if (lineNumber >= 11):

        	# Add the lines of data we want to lines[] , from line 12 to the end of the file.
        	lines.append(row)
    
        
# Keep track of the months to be able to append each date to the correct month.
# Due to timeshortage and shortage of clever ideas, I will hardcode this. I am sorry.
month 		 = -1
months 		 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"]
monthInput 	 = []
rainSum 	 = 0
counterJan   = 0
counterFeb   = 0
counterMar   = 0
counterApr   = 0
counterMay   = 0
counterJun   = 0
counterJul   = 0
counterAug   = 0
counterSep   = 0
counterOkt   = 0
counterNov   = 0
counterDec   = 0
sumCounter   = 0
monthCounter = 0
sumRain 	 = []

# In this for loop a json data structure is formed.
for i in range(0, len(lines)):
	
	# Find the key None: in the dictionary for every line. This key gives us a list with temperature and date.		
	myDict = dict((key,value) for key, value in lines[i].iteritems() if key == None)
	
		
	# Find the date and rainfall in the dictionary.	
	myDictDate = dict.values(myDict)[0][0]
	myDictRain = int(dict.values(myDict)[0][1])/10
	month = myDictDate[4:6]
	

	# Sum over the values per month, by plussing the different counters.
	if month == "01":
		
		counterJan += myDictRain

	elif month == "02":
		
		counterFeb += myDictRain

	elif month == "03":
		
		counterMar += myDictRain

	elif month == "04":
		
		counterApr += myDictRain

	elif month == "05":
		
		counterMay += myDictRain

	elif month == "06":
		
		counterJun += myDictRain

	elif month == "07":
		
		counterJul += myDictRain

	elif month == "08":
		
		counterAug += myDictRain

	elif month == "09":
		
		counterSep += myDictRain

	elif month == "10":
		
		counterOkt += myDictRain

	elif month == "11":
		
		counterNov += myDictRain

	elif month == "12":
		
		counterDec += myDictRain		

# Create a list that has 12 items in it: total rainfall per month.	
sumRain.append(counterJan)
sumRain.append(counterFeb)
sumRain.append(counterMar)
sumRain.append(counterApr)
sumRain.append(counterMay)
sumRain.append(counterJun)
sumRain.append(counterJul)
sumRain.append(counterAug)
sumRain.append(counterSep)
sumRain.append(counterOkt)
sumRain.append(counterNov)
sumRain.append(counterDec)	
	


# My dataset was not exactly how I wanted it, so I had to make 2 new lists from the ones I calculated earlier.
# I did not have enough time to look at this carefully, so I want to apoligize for the fact that I hardcoded
# This in a pretty ugly way. If I had enough time to figure this out, I would find a clever way of doing this
# By using the dictionary format. 

dataNew = [{'Date': Date, 'Rain': Rain} for Date, Rain in zip(months, sumRain)]

# Open a jsonfile to write the json data in.
with open('data.json', 'w') as outfile:
    json.dump(dataNew, outfile)



		


	



