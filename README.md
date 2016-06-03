As the name suggests, this app is designed to generate a heatmap of Aleppo, Syria.
It proceeds in three steps:

1) It pulls a list of Aleppo's 131 constituent neighborhoods from the GeoNames API.
2) It queries the Twitter API for mentions of those neighborhoods over the last 24 hours.
3) It generates a HeatMapLayer on top of GoogleMaps, indexing the color gradient of 
   specific neighborhoods to the total number of their recent mentions on Twitter.

Mostly a test of stamina in the face of callback hell, this app will probably be rebuilt as a solely GoogleMaps/Twitter interaction.
