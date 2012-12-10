<?php
    ini_set('user_agent', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.9) Gecko/20071025 Firefox/2.0.0.9');
    $rssUrl = "http://news.google.com/news?hl=en&gl=ca&q=%22burroughs%22+OR+%22mash+up%22&um=1&ie=UTF-8&output=rss";
    $xml = simplexml_load_file($rssUrl);
    $entry = $xml->channel->item;
    $returnMarkup = '';
    for ($i = 0; $i < 4; $i++) {
		// random number, which we'll use later
		$lengthA = rand(3,11);
		$lengthB = rand(5,8);
		// let's parse this beast
        $returnMarkup .= strip_tags($entry[$i]->title);
		$returnMarkup .= ' ';
        $returnMarkup .= strip_tags($entry[$i]->description);
		$fixedMarkup = html_entity_decode($returnMarkup);
		// now let's grab some random words from this
		$words = str_word_count($fixedMarkup,1);
		shuffle($words);
		$start = array_slice($words,1,1);
		$partA = array_slice($words,2,$lengthA);
		$partB = array_slice($words,$lengthA,$lengthB);
		$punc = array('&ndash;', ',', '-', ' ', ';', '&mdash;', '&hellip;', '/', ':');
		shuffle($punc);
		$insPunc = array_slice($punc,0,1);
		// assemble it
		while (list($key, $value) = each($start)) {
			if (strlen($value)<3){
				echo "<p class=\"lead lowercase\">A ";
			}
			else {
				echo "<p class=\"lead lowercase\">$value ";
			}
		}
		while (list($key, $value) = each($partA)) {
			if (strlen($value)<3){
				echo "";
			}
			else {
				echo "$value ";
			}
		}
		while (list($key, $value) = each($insPunc)) {
		html_entity_decode($value);
		echo "<span class=\"punc\">$value </span><span class=\"partB\">";
		while (list($key, $value) = each($partB)) {
			if (strlen($value)<3){
				echo "";
			}
			else {
				echo "$value ";
			}
		
		}
		echo "</span></p>";
	}
    }
?>