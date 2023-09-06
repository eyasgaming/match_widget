# match_widget
shows event main markets for given kambi FOOTBALL league ID.
See index.html for example.

# Usage

1. Add this where ever you want to have the list of events for a league:

   ```<eyas-match-container matchId="1019426498" prod="true" loadingText="Loading..." drawText="draw" winText="to win" layout="horizontal">No Matches currently avaliable</eyas-match-container>```

2. Add this (or a minified version of it) at the end of the body tag
   ```<script src="./js/match.js"></script>```

3. Add match.js to your project.

Key:

* leagueId = kambi league for CTS or prod taken using https://kambi-explorer.eyasgaming.net/
* loadingText = text to display while the data is loading
* drawText = text to show next to the draw price.
* winText = text to show after the home or away team.
* inner text = message to display if there are no leagues, or an error occured.
* prod = true or false, false is non prod (different kambi data and points to our UAT site)

# Styling
The component will render with the pages default font (e.g. specified in body style).

You can stlye any component by targeting it under #shaddow-root with external CSS, or simply edit the <style> inside the component source code in league.js

# Limitations
1. This will only work for 1x2 matches.  It wont work for other markets or sports.
1. You specify the league name above the web component.

# Testing
New merges to main will be deployed to https://wonderful-plant-00df5e403.3.azurestaticapps.net/
