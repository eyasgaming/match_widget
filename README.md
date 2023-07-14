# league_widget
shows event main markets for given kambi FOOTBALL league ID.
See index.html for example.

# Usage

1. Add this where ever you want to have the list of events for a league:

   <league-events leagueId="1000094985" loadingText="Loading..." drawText="draw" winText="to win">No Matches currently avaliable</league-events>

2. Add this (or a minified version of it) at the end of the body tag
   <script src="./js/league.js"></script>

3. Add league.js to your project.

Key:

* leagueId = kambi league for CTS or prod taken using https://kambi-explorer.eyasgaming.net/
* loadingText = text to display while the data is loading
* drawText = text to show next to the draw price.
* winText = text to show after the home or away team.
* inner text = message to display if there are no leagues, or an error occured.

# Styling
The component will render with the pages default font (e.g. specified in body style).
You can stlye any component by targeting it under #shaddow-root with external CSS, or simply edit the <style> inside the component source code in league.js

NOTE:
1. This will only work for 1x2 matches.  It wont work for other markets or sports.
1. You specify the league name above the web component.
