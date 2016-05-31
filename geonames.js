
// The Geonames API call. This returns array of 131 objects,
// each of which is a subunit of Aleppo city. All have a 'name' attribute, mostly in Arabic.
function Geonames(){
  api.geonames.org/childrenJSON?lang=ar&geonameId=170063&username=hotspotsm
};

// Mines the larger array of 131 objects for 131 (mostly Arabic) place names.
bulkySearch = Geonames();
parsedSearch = [];
bulkyResults.forEach(arg){
  parsedSearch.push(arg.name)
};

//Searches Twitter for mentions of each place name.
client.filter(track: parsedSearch.join(",")) do |object|
  puts object.text if object.is_a?(Twitter::Tweet)
end
