require_relative './db/connection.rb'

Neighborhood.delete_all
Report.delete_all
User.delete_all
Comment.delete_all


#Neighborhood
the_bronx = Neighborhood.create({
	name: "The Bronx",
	google_name: "Bronx, NY"
	})

queens = Neighborhood.create({
	name: "Queens",
	google_name: "Queens, NY"
	})

staten_Island = Neighborhood.create({
	name: "Staten Island",
	google_name: "Staten Island, NY"
	})

greenpoint = Neighborhood.create({
	name: "Greenpoint",
	google_name: "Greenpoint, Brooklyn"
	})

bedford = Neighborhood.create({
	name: "Bedford",
	google_name: "Bedford, Brooklyn"
	})

crown_heights = Neighborhood.create({
	name: "Crown Heights",
	google_name: "Crown Heights, Brooklyn"
	})

sunset_park = Neighborhood.create({
	name: "Sunset Park",
	google_name: "Sunset Park, Brooklyn"
	})

williamsburg = Neighborhood.create({
	name: "Williamsburg", 
	google_name: "Williamsburg, Brooklyn"
	})

bushwick = Neighborhood.create({
	name: "Bushwick",
	google_name: "Bushwick, Brooklyn"
	})

downtown_brooklyn = Neighborhood.create({
	name: "Downtown Brooklyn",
	google_name: "Downtown Brooklyn, NY"
	})

brooklyn_heights = Neighborhood.create({
	name: "Brooklyn Heights",
	google_name: "Brooklyn Heights, Brooklyn NY"
	})

park_slope = Neighborhood.create({
	name: "Park Slope",
	google_name: "Park Slope, Brooklyn NY"
	})

financial_district = Neighborhood.create({
	name: "Finacial District",
	google_name: "Wall Street, Manhattan, NY"
	})

battery_park_city = Neighborhood.create({
	name: "Battery Park City",
	google_name: "Battery Park City, NY"
	})

tribeca = Neighborhood.create({
	name: "TriBeCa",
	google_name: "TriBeCa, NY"
	})

lower_east_side = Neighborhood.create({
	name: "Lower East Side",
	google_name: "Lower East Side, NY"
	})

two_bridges = Neighborhood.create({
	name: "Two Bridges",
	google_name: "Two Bridges, NY"
	})

soho = Neighborhood.create({
	name: "SoHo",
	google_name: "SoHo, NY"
	})

noho = Neighborhood.create({
	name: "NoHo",
	google_name: "NoHo, NY"
	})

west_village = Neighborhood.create({
	name: "West Village",
	google_name: "West Village, NY"
	})

east_village = Neighborhood.create({
	name: "East Village",
	google_name: "East Village, NY"
	})

chinatown = Neighborhood.create({
	name: "Chinatown",
	google_name: "Chinatown,NY"
	})

chelsea = Neighborhood.create({
	name: "Chelsea",
	google_name: "Chelsea, NY"
	})

midtown = Neighborhood.create({
	name: "Midtown",
	google_name: "Midtown, NY"
	})

little_italy = Neighborhood.create({
	name: "Little Italy",
	google_name: "Little Italy, NY"
	})

alphabet_city = Neighborhood.create({
	name: "Alphabet City",
	google_name: "Alphabet City, NY"
	})

clinton = Neighborhood.create({
	name: "Clinton",
	google_name: "Clinton, NY"
	})

gramercy_park = Neighborhood.create({
	name: "Gramercy Park",
	google_name: "Gramercy Park, NY"
	})

kips_bay = Neighborhood.create({
	name: "Kips Bay",
	google_name: "Kips Bay, NY"
	})

murray_hill = Neighborhood.create({
	name: "Murray Hill",
	google_name: "Murray Hill, NY"
	})

peter_cooper_village = Neighborhood.create({
	name: "Peter Cooper Village",
	google_name: "Peter Cooper Village, NY"
	})

stuyvesant_town = Neighborhood.create({
	name: "Stuyvesant Town",
	google_name: "Stuyvesant Town, NY"
	})

sutton_place = Neighborhood.create({
	name: "Sutton Place",
	google_name: "Sutton Place, NY"
	})

tudor_city = Neighborhood.create({
	name: "Tudor City",
	google_name: "Tudor City, NY"
	})

turtle_bay = Neighborhood.create({
	name: "Turtle Bay",
	google_name: "Turtle Bay, NY"
	})

lincoln_square = Neighborhood.create({
	name: "Lincoln Square",
	google_name: "Lincoln Square, NY"
	})

manhattan_valley = Neighborhood.create({
	name: "Manhattan Valley",
	google_name: "Manhattan Valley, NY"
	})

upper_west_side = Neighborhood.create({
	name: "Upper West Side",
	google_name: "Upper West Side, NY"
	})

lenox_hill = Neighborhood.create({
	name: "Lenox Hill",
	google_name: "Lenox Hill, NY"
	})

roosvelt_island = Neighborhood.create({
	name: "Roosevelt Island",
	google_name: "Roosevelt Island,NY"
	})

upper_east_side = Neighborhood.create({
	name: "Upper East Side",
	google_name: "Upper East Side, NY"
	})

yorkville = Neighborhood.create({
	name: "Yorkville",
	google_name: "Yorkville, NY"
	})

hamilton_heights = Neighborhood.create({
	name: "Hamilton Heights",
	google_name: "Hamilton Heights, NY"
	})

manhattanville = Neighborhood.create({
	name: "Manhattanville",
	google_name: "Manhattanville, NY"
	})

morningsise_heights = Neighborhood.create({
	name: "Morningside Heights",
	google_name: "Morningside Heights, NY"
	})

harlem = Neighborhood.create({
	name: "Harlem",
	google_name: "Harlem, NY"
	})

east_harlem = Neighborhood.create({
	name: "East Harlem",
	google_name: "East Harlem, NY"
	})

randalls_island = Neighborhood.create({
	name: "Randall’s Island",
	google_name: "Randall’s Island, NY"
	})

spanish_harlem = Neighborhood.create({
	name: "Spanish Harlem",
	google_name: "Spanish Harlem, NY"
	})

inwood = Neighborhood.create({
	name: "Inwood",
	google_name: "Inwood, NY"
	})

washington_heights = Neighborhood.create({
	name: "Washington Heights",
	google_name: "Washington Heights, NY"
	})

#User
ralph = User.create( {name: "Ralph Kramden", email: "ralph@dmta.gov", subscribe: true, subscription_neighborhood_id: alphabet_city.id, password: "norton"} )

frank = User.create( {name: "Frank Sinatra", email: "frankie@sinatra.com", subscribe: true, subscription_neighborhood_id: upper_east_side.id, password: "giancana"})

pablo = User.create( {name: "Pablo Picasso", email: "imaginealamp@freeform.nyc", subscribe: false, password: "hemingway"})

norm = User.create( {name: "Norman Mailer", email: "norman@hapers.com", subscribe: true, subscription_neighborhood_id: lower_east_side.id, password: "fortyfive"})

joey = User.create( {name: "Joey Ramone", email: "joey@theramones.com", subscribe: true, subscription_neighborhood_id: queens.id, password: "beatonthebrat"})

#Report
poop = Report.create({user_id: ralph.id, location: "1117 Lexington Ave #4, New York, NY", neighborhood_id: upper_east_side.id, subscribe: true, votes: 15, picture: "http://www.washingtoncitypaper.com/blogs/citydesk/files/2014/02/horsepoop-1024x682.jpg", description: "Biggest dump I've ever seen. Might be human."})

doodoo = Report.create({user_id: frank.id, location: "4001 Broadway, New York, NY", neighborhood_id: washington_heights.id, subscribe: false, votes: 2, picture: "http://s.hswstatic.com/gif/green-pet-poop0-1.jpg", description: "This is so nasty!"})

caca = Report.create({user_id: pablo.id, location: "1559 2nd Ave, New York, NY", neighborhood_id: yorkville.id, subscribe: true, votes: 0, picture: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTYmC2PRZGp4Qi-bAmbXrrzU7lDmoxf7LH1HzRmbIK6YOi-R6wq", description: "I swear it's the same dog that poops here ever night"})

doody = Report.create({user_id: norm.id, location: "1889 Broadway, New York, NY 10023", neighborhood_id: lincoln_square.id, subscribe: false, votes: 4, picture: "http://klagnwindy.podbean.com/mf/web/6ji2y9/Dog_poop.jpg", description: "This has been sitting here for a week!"})

shih = Report.create({user_id: joey.id, location: "145 3rd Ave, New York, NY 10003", neighborhood_id: stuyvesant_town.id, subscribe: true, votes: 0, picture: "http://2.bp.blogspot.com/-lVtKb3jROKw/Tdkaw0MiJyI/AAAAAAAAHbo/XWaOs90oJII/s1600/poop.png", description: "Almost stepped in this!"})

#Comment

poop_comment = Comment.create({user_id: frank.id, report_id: poop.id, content: "that's horse poop, stupid"})

poop_comment2 = Comment.create({user_id: norm.id, report_id: poop.id, content: "lulz, dumbazz"})

doodoo_comment = Comment.create({user_id: joey.id, report_id: doodoo.id, content: "Stepped in it! :-( "})

caca_comment = Comment.create({user_id: ralph.id, report_id: caca.id, content: "are those marshmallows????"})

shih_comment = Comment.create({user_id: norm.id, report_id: shih.id, content: "great pic! lulz"})

