<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>SF Movie Search</title>

	<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>
	<link href='css/app.css' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
	<script type="text/template" id="actor-list">
		<% if (actor_1) { %>
		   <li> <%= actor_1 %> </li>
		<% } %>
		<% if (actor_2) { %>
		   <li> <%= actor_2 %> </li>
		<% } %>
		<% if (actor_3) { %>
		   <li> <%= actor_3 %> </li>
		<% } %>
		<% if (!actor_1 && !actor_2 && !actor_3) { %>
		  <li> No actor information found. </li>
		<% } %>
	</script>

	<script type="text/template" id="marker-info">
		<br />
		<% if (location) { %>
		<p class='infowindow-element'><b><%= location %></b></p><br />
		<% } %>
		<% if (facts) { %>
		<p class='infowindow-element'><b>Fun Facts:</b><br /> <%= facts  %><br /><br />
		<% } %>
		<p class='infowindow-element'><b>Actors:</b></p>
	</script>

	<script type="text/template" id="info-window">
		<br />
		<% if (location) { %>
		<p class='infowindow-element'><b><%= location %></b></p><br />
		<% } %>
		<% if (facts) { %>
		<p class='infowindow-element'><b>Fun Facts:</b><br /> <%= facts  %><br /><br />
		<% } %>
		<p class='infowindow-element'><b>Actors:</b></p>
	</script>

	<script type="text/template" id="movie-search-information">
		<% if (title) { %>
			<b class="title-text"> <%= title %></b><br /><br />
		<% } %>
		<% if (production_company) { %>
			<b>Production Company: </b><%= production_company %><br />
		<% } %>
		<% if (release_year) { %>
			<b>Release year: </b><%= release_year %><br />
		<% } %>
		<% if (distributor) { %>
			<b>Distributor: </b><%= distributor %><br />
		<% } %>
		<% if (director) { %>
			<b>Director: </b><%= director %><br />
		<% } %>
		<% if (writer) { %>
			<b>Writer: </b><%= writer %><br />
		<% } %>
	</script>
</head>
<body>
	<div id="search">
			<input type="text" id="search-term" placeholder="Search movie titles" autofocus></input>
			<div id="autocomplete">
				<ul></ul>
			</div>
	</div>

	<div id="results-for"></div>
	<div id="map"></div


	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.3.3/underscore-min.js" type="text/javascript"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min.js" type="text/javascript"></script>
	<script src="js/models.js"></script>
	<script src="js/collections.js"></script>
	<script src="js/views.js"></script>
	<script src="js/app.js"></script>
</body>
</html>
