
# Name: Thomas van Dooren.      
# Student number: 10625488.
# Data processing, minor programmeren.
# This script scrapes IMDB and outputs a CSV file with highest rated tv series.

import csv
import unicodedata
from pattern.web import URL, DOM
from pattern.web import URL, DOM, plaintext

TARGET_URL = "http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series"
BACKUP_HTML = 'tvseries.html'
OUTPUT_CSV = 'tvseries.csv'

# Create a list for all the movies, and create a list for movie content.
Resultlist = []
totallist =[]

def extract_tvseries(dom):
    
    # Line 28-62: Here I gather the information from the IMDB website by using DOM. Every for loop digs deeper into the HTML data.
    # Line 28-62: Also, I made sure all unicode chars are turned into a similar normal char, so, for example: an o with a trema is changed to an o.
    # Line 28-62: Also, the title,rating,star,genre and runtime are added to Resultlist = [].
    
    
    # Gather the titles.
    for serie in dom.by_tag("div.lister-item-content"):
        Resultlist=[]
        for header in serie.by_tag("h3.lister-item-header"): 
            for title in header.by_tag("a"):
                
                Title = plaintext(title.content)
                Resultlist.append(unicodedata.normalize('NFKD', Title).encode('ascii','ignore'))
                
        # Gather the ratings.        
        for ratingsbar in serie.by_tag("div.ratings-bar"):
            for rating in ratingsbar.by_tag("div.inline-block ratings-imdb-rating"):
                
                    Rating = plaintext(rating.content)
                    Resultlist.append(unicodedata.normalize('NFKD', Rating).encode('ascii','ignore'))
                    
        # Gather the genres.            
        for genre in serie.by_tag("span.genre"):
            
                Genre = plaintext(genre.content)
                Resultlist.append(unicodedata.normalize('NFKD', Genre).encode('ascii','ignore'))
        
        # Gather the stars.            
        for stars in serie.by_tag("p"):
                if "Stars:" in stars:
                    
                    Stars = plaintext(stars.content)
                    Stars = Stars[6:]
                    Resultlist.append(unicodedata.normalize('NFKD', Stars).encode('ascii','ignore'))
                
        # Gather the runtimes.        
        for runtime in serie.by_tag("span.runtime"):
            
                Runtime = plaintext(runtime.content) 
                Runtime = Runtime[:-4]
                Resultlist.append(unicodedata.normalize('NFKD', Runtime).encode('ascii','ignore'))
                
        # Fill totallist with all the series!
        totallist.append(Resultlist)          
    
    return totallist  


def save_csv():
    
    # This function Outputs a CSV file containing highest rated TV-series.
    
    # Open the file, and write in it.
    with open(OUTPUT_CSV, 'wb') as myfile:
        wr = csv.writer(myfile)
        
        # Make header for output file.
        wr.writerow(['Title','Rating','Genre','Actors','Runtime'])
        
        # Iterate over all the series in totallist.
        for i in range(0,len(totallist)):
            
            # Write a row per film.              
            wr.writerow(extract_tvseries(dom)[i])           
    
if __name__ == '__main__':
    
    # Download the HTML file.
    url = URL("http://www.imdb.com/search/title?num_votes=5000,&sort=user_rating,desc&start=1&title_type=tv_series")
    
    html = url.download()
    dom = DOM(url.download(cached=True))
    
    # Save a copy to disk in the current directory, this serves as an backup.
    # of the original HTML, will be used in grading.
    with open(BACKUP_HTML, 'wb') as f:
        f.write(html)

    # Parse the HTML file into a DOM representation.
    dom = DOM(html)

    # Extract the tv series (using the function you implemented).
    tvseries = extract_tvseries(dom)
    

    save_csv()