LOAD DATA LOCAL INFILE '/Users/chris/Downloads/test.csv'
INTO TABLE `filming_locations`
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(title, release_year, location, facts, production_company, distributor, director, writer, actor_1, actor_2, actor_3, misc);
