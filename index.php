<!doctype html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>&times; &#x34e;</title>
	<meta name="description" content="cut up">
	<meta name="author" content="Nick Heer">
	<meta name="viewport" content="width=560">
	<link rel="apple-touch-icon-precomposed" href="http://nickheer.com/cutup/apple-touch-icon-precomposed.png">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<link href="css/bootstrap-readable.min.css" rel="stylesheet" media="screen">
	<link href="css/bootstrap-responsive.min.css" rel="stylesheet" media="screen">
	<link href="css/additional.css" rel="stylesheet" media="screen">
	<meta http-equiv="refresh" content="30"> <!-- a new poem every minute -->
</head>
<body>
<div class="container span6 middlealign">
	<div class="navbar navbar-inverse">
	  <div class="navbar-inner">
	    <a class="brand" href="#" onClick="location.reload(true); return false;"><strong>&times; cut up</strong></a>
	  </div>
	</div>	
	<div class="span5">
		<?php include('rss.php');?>
	</div>
	
	<footer><a href="#about" role="button" class="btn btn-large btn-inverse" data-toggle="modal">?</a></footer>
	
	<div class="modal hide fade" id="about">
	  <div class="modal-header">
	    <button type="button" class="close btn-inverse" data-dismiss="modal" aria-hidden="true">&times;</button>
	    <h3>About</h3>
	  </div>
	  <div class="modal-body">
  		<p><strong>cut up</strong> is a contemporary adaptation of the <a href="http://en.wikipedia.org/wiki/Cut-up_technique">cut-up technique</a>, as made popular by the dadaists, and as closely associated with William S. Burroughs.</p>
  		<p><strong>cut up</strong> pulls in recent news articles about William S. Burroughs, cuts those articles up, and reassembles them to form short open poems, akin to the physical technique.</p>
  		<p>You can add the app to your home screen on an iOS device and run it from there for a full-screen experience. The page refreshes every 30 seconds to give you brand new poetry, or you can refresh the page sooner by tapping the title in the toolbar.</p>
  		<p><strong>cut up</strong> was created by <a href="http://nickheer.com">Nick Heer</a>. It is built with PHP on <a href="http://twitter.github.com/bootstrap/">Bootstrap</a> with a modified <a href="http://bootswatch.com/readable">Readable</a> theme.</p>
	    
	  </div>
	</div>
</div>
<script src="/mint/?js" type="text/javascript"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>
<script src="js/bootstrap-modal.js" type="text/javascript"></script>
<script type="text/javascript">
$('#modal-from-dom').modal(options)
</script>
</body>
</html>
