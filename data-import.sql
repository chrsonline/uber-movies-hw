LOAD DATA LOCAL INFILE '/Users/chris/Downloads/test.csv'
INTO TABLE `filming_locations`
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
