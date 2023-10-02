const template = document.createElement('template');

// Change special characters to ASCII
function convertEuropeanToAscii(input) {
    const europeanToAscii = {
        'Á': 'A', 'á': 'a',
        'Â': 'A', 'â': 'a',
        'À': 'A', 'à': 'a',
        'Ã': 'A', 'ã': 'a',
        'É': 'E', 'é': 'e',
        'Ê': 'E', 'ê': 'e',
        'È': 'E', 'è': 'e',
        'Í': 'I', 'í': 'i',
        'Î': 'I', 'î': 'i',
        'Ì': 'I', 'ì': 'i',
        'Ó': 'O', 'ó': 'o',
        'Ô': 'O', 'ô': 'o',
        'Ò': 'O', 'ò': 'o',
        'Õ': 'O', 'õ': 'o',
        'Ú': 'U', 'ú': 'u',
        'Û': 'U', 'û': 'u',
        'Ù': 'U', 'ù': 'u',
        'Ç': 'C', 'ç': 'c',
        'Ä': 'A', 'ä': 'a',
        'Ë': 'E', 'ë': 'e',
        'Ï': 'I', 'ï': 'i',
        'Ö': 'O', 'ö': 'o',
        'Ü': 'U', 'ü': 'u',
        'ß': 'ss',
    };
    
    return input.replace(/[ÁáÂâÀàÃãÉéÊêÈèÍíÎîÌìÓóÔôÒòÕõÚúÛûÙùÇçÄäËëÏïÖöÜüß]/g, match => europeanToAscii[match] || match);
}
/****
 * 
 * usage:    <eyas-match-container matchId="1019426462" prod="true" loadingText="Loading..." drawText="draw" winText="to win" layout="horizontal">No Matches currently avaliable</eyas-match-container>
 *
 ***/

template.innerHTML = `
    <style>
    :root {
        --green: #00b925;
        --blue: #06379d;
      }
      
      #match {
        display: flex;
        flex-wrap: wrap;
      }
      
      .event_data {
        min-width: 432px;
        flex-grow: 1;
        max-width: 432px;
        flex-direction: column;
        margin: 5px;
        padding: 5px;
        border-radius: 28px;
        background: #ffffff;
        
        height: 315px;
        box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
        color: black;
        position: relative;
      }
      
      .event_name {
        margin: 5px 15px 15px 15px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        white-space: normal;
        max-width: 350px;
      }
      
      .event_date {
        margin: 20px 40px 10px;
        display: block;
        font-size: 16px;
        position: absolute;
        top: 0;
        right: 0;
      }
      
      .bet_offers {
        display: grid;
        grid-auto-rows: 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        text-transform: uppercase;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-top: 30px !important;
        font-size: 12px;
        margin-right: 10px;
      }
      
      a {
        background-color: #e9e9e9;
        text-decoration: none;
        width: 94px;
        color: var(--blue);
        font-size: 19px;
        display: block;
        padding: 14px 15px;
        border-radius: 4px;
        text-align: center;
        margin: 19px -15px 20px -5px;
        transition: 300ms;
        box-shadow: 3px 2px 4px rgba(0, 0, 0, 0.2);
        
      }
      
      a:hover {
        background-color: #faf7b6;
      }
      
      .outcome_name {
        margin: 10px 8px 5px 8px;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 12%;
        text-overflow: ellipsis;
        white-space: normal;
        max-width: 150px;
      }
      
      .outcome_odds {
        margin-left: 11%;
      }
      
      .outcome_shirts {
        margin-left: 25%;
      }
      
      img {
        width: 82px;
        height: 94px;
      }
      
      .draw {
        margin-top: 97px;
      }
      
      button {
        margin-left: 5px;
        background-color: var(--blue);
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.5s ease-in-out;
        border: 3px solid var(--blue);
      }
      
      button img {
        width: 40px;
        height: 50px;
        transition: 400ms;
        margin-left: 50px !important;
      }
      
      button img:hover {
        transform: rotate(180deg);
      }

      .event_test {
        background-color: black;
        border-radius: 28px 28px 0 0;
        color: yellow;
        margin-left: -5px;
        width: 442px;
        margin-top: -5px;
    }
    
       .event_test img {
        width: 20%; /* Make the image fill the entire div */
        height: 20%; /* Make the image fill the entire div */
        padding: 12px 5px 6px 5px; /* Optional: just make the image look better */
        margin-left: 20px;
    }



    </style>
    <div id ="match" >
    
    </div>
  `

class Match extends HTMLElement {

    affiliateId = "AN2548500601"

    // Do not edit anyething below this line
    nonProdUrl = "https://graphql.cts.kambicdn.com"
    prodUrl = "https://graphql.kambicdn.com"

    nonProdTarget = "https://lancebet-com-uat.eyasgaming.net/home"
    prodTarget = "https://www.lancebetting.com/home"

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.url = this.prod ? this.prodUrl : this.nonProdUrl;
        this.target = this.prod ? this.prodTarget : this.nonProdTarget;

        this.layout = this.getAttribute('layout');

        this.isHorizontalLayout = this.layout === 'horizontal';

        this.stylesChanged = true; //to control de styles



        //  this.leagueId = this.getAttribute('leagueId');
    }



    get matchId() {
        return this.getAttribute('matchId');
    }

    // should be "true" or "false"
    get prod() {
        return this.getAttribute('prod') !== 'false';
    }

    get winText() {
        return this.getAttribute('winText');
    }

    get drawText() {
        return this.getAttribute('drawText');
    }

    get loadingText() {
        return this.getAttribute('loadingText');
    }


    connectedCallback() {
        this.$match = this._shadowRoot.querySelector('#match');
        this.$match.innerHTML = this.loadingText;
        //   this.$odds.href = this.target + "?affiliateId=" + this.affiliateId // default url in case no odds found.
        this.getEvents(this.matchId);

        let currentImageIndex = 0;

        const $container2 = document.createElement('div');
        $container2.style.position = 'relative';



        // Add #league to container
        this.$match = this._shadowRoot.querySelector('#match');
        $container2.appendChild(this.$match);

        // Add to container to shadow DOM
        this._shadowRoot.appendChild($container2);

    }

    changeStyles() {

        if (!this.stylesChanged) {
            this.$match.style.display = 'flex';
            this.$match.style.flexWrap = 'nowrap';
            this.$match.style.overflowX = 'auto';


            const eventName = this.$match.querySelectorAll('.event_name');
            eventName.forEach(item => {


            });

            const outcomeDate = this.$match.querySelectorAll('.event_date');
            outcomeDate.forEach(item => {

            });

            const outcomeNames = this.$match.querySelectorAll('.outcome_name');
            outcomeNames.forEach(item => {
                item.style.marginLeft = '1%';
            });

            const outcomeShirt = this.$match.querySelectorAll('.outcome_shirts');
            outcomeShirt.forEach(item => {
                item.style.marginLeft = '25%';
            });



            const outcomeOdds = this.$match.querySelectorAll('.outcome_odds');
            outcomeOdds.forEach(item => {
                item.style.marginLeft = '10%';
            });

            this.stylesChanged = true;
        } else {
            this.$match.style.display = '';
            this.$match.style.flexWrap = '';

            const eventItems = this.$match.querySelectorAll('.event_data');
            eventItems.forEach(item => {
                item.style.width = '';
                item.style.minWidth = '';
                item.style.flexGrow = '';
            });

            const eventName = this.$match.querySelectorAll('.event_name');
            eventName.forEach(item => {
                item.style.fontSize = '';
                item.style.whiteSpace = '';
                item.style.maxWidth = '';
            });

            const outcomeDate = this.$match.querySelectorAll('.event_date');
            outcomeDate.forEach(item => {
                item.style.fontSize = '';
            });

            const outcomeNames = this.$match.querySelectorAll('.outcome_name');
            outcomeNames.forEach(item => {
                item.style.marginLeft = '';
                item.style.textOverflow = '';
                item.style.whiteSpace = '';
                item.style.maxWidth = '';
            });

            const outcomeShirt = this.$match.querySelectorAll('.outcome_shirts');
            outcomeShirt.forEach(item => {
                item.style.marginLeft = '';
            });

            const outcomeOdds = this.$match.querySelectorAll('.outcome_odds');
            outcomeOdds.forEach(item => {
                item.style.marginLeft = '';
            });

            this.stylesChanged = false;
        }
    }


    getEvents(matchId) {
        const footballId = 1000093190;
        const data = JSON.stringify({
            query: `
                query Event {
                    event(
                        offering: "eyasgamingbr"
                        market: "BR"
                        onlyMain: true
                        groupId: ${footballId}
                    ) {
                        events {
                            id
                            name
                            englishName
                            start
                            betOffers {
                                id
                                betOfferType {
                                    id
                                    englishName
                                    name
                                }
                                outcomes {
                                    id
                                    englishLabel
                                    odds
                                    criterion {
                                        type
                                        name
                                    }
                                    betOfferId
                                    status
                                    
                                }
                            }
                            name
                            homeName
                            awayName
                            start
                            group
                            
                        }
                    }
                }`
        });




        const response = fetch(
            this.url,
            {
                method: 'post',
                body: data,
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    Authorization:
                        'eyas_gaming',
                },
            }
        ).then((response) => response.json())
            .then((data) => this.renderLeage(data.data.event.events.slice(0, 100))) // Limit to the first 15 events
            .catch((error) => this.$match.innerHTML = this.textContent);
    }

    renderLeage(events) {

        if (events == null || events.length == 0) {
            this.$match.innerHTML = this.textContent;
            return;
        }

        //Creating a list of all events ids
        const eventIds = events.map((event) => event.id);
        //Selecting a random event id
        const randomEventId = eventIds[Math.floor(Math.random() * eventIds.length)];
        //Selecting the event with the random id
        const selectedEvent = events.find((event) => event.id === randomEventId);

        this.$match.innerHTML = "";

        const imageLance = `https://theme.zdassets.com/theme_assets/11560444/d924dd3464cd1b98b303e3fa883cbbbd9aa9a4cd.svg`

        const $event = document.createElement('div');
        $event.className = "event_data";

        const $eventTest = document.createElement('div');
        $eventTest.className = "event_test";
        $event.appendChild($eventTest);

        const $eventLogo = document.createElement('img');
        $eventLogo.src = imageLance;
        $eventLogo.className = "event_logo";
        $eventTest.appendChild($eventLogo);

        var localDate = new Date(selectedEvent.start);

        // BR local hour correction 
        localDate.setHours(localDate.getHours() - 5);

        const day = localDate.getDate().toString().padStart(2, '0');
        const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
        const hours = localDate.getHours().toString().padStart(2, '0');
        const minutes = localDate.getMinutes().toString().padStart(2, '0');

        const formattedDate = `${day}/${month} ${hours}:${minutes}`;


        const $eventDate = document.createElement('div');
        $eventDate.innerHTML = formattedDate;
        $eventDate.className = "event_date";
        $eventTest.appendChild($eventDate);


        selectedEvent.betOffers.forEach((betOffer) => {

            if (betOffer.betOfferType.englishName !== "Match") {
                return;
            }


            const $betOffer = document.createElement('div');
            $betOffer.className = "bet_offers";

            betOffer.outcomes.forEach((outcome) => {

                const $outcome = document.createElement('div');
                $outcome.className = this.getOutcomeDivName(outcome);

                const $outcomeName = document.createElement('div');
                $outcomeName.className = "outcome_name";
                const teamValue = $outcome.className === "home" ? "home" : "away";


                const teamName = selectedEvent[`${teamValue}Name`]?.toLowerCase().replace(/\s/g, '-') || '';
                const asciiTeamName = convertEuropeanToAscii(teamName);
                const outcomeText = this.getOutcomeText(selectedEvent, outcome);
                const teamPrinted = selectedEvent[`${teamValue}Name`]?.toLowerCase().replace(/\s/g, '-').replace(/-\w{2}$/, '');

                const truncatedName = teamPrinted.length > 13 ? teamPrinted.substring(0, 13) + '...' : teamPrinted;

                if ($outcome.className !== "draw") {

                    $outcomeName.innerHTML = truncatedName;
                } else {
                    $outcomeName.innerHTML = `${outcomeText}`;
                }



                //Home or away shirt

                const imageUrlFinal = `https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/${asciiTeamName}-${teamValue}.png.webp`

                const imageUrlFinalAux = `https://lancebet-com-prod.eyasgaming.net/content/dam/eyas-web/images/team-colours/football/generic-${teamValue}.png.webp`;



                //shirts on the screen

                if ($outcome.className !== "draw") {
                    const $greetingDiv = document.createElement('div');
                    $greetingDiv.className = "outcome_shirts";
                    const $teamImage = document.createElement('img');
                    $teamImage.src = imageUrlFinal;
                    $teamImage.onerror = () => {
                        // If an error exist use URL alternative
                        $teamImage.src = imageUrlFinalAux;
                    };
                    $greetingDiv.appendChild($teamImage);
                    $outcome.appendChild($greetingDiv);

                }


                const $outcomeOdds = document.createElement('div');
                $outcomeOdds.className = "outcome_odds";

                const $outcomeLink = document.createElement('a');
                $outcomeLink.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + outcome.id + "||append|lance";
                $outcomeLink.innerText = (Number(outcome.odds) / 1000).toFixed(2).toLocaleString();
                $outcomeLink.target = "lancebet";




                $outcomeOdds.appendChild($outcomeLink);
                $outcome.appendChild($outcomeName);

                $outcome.appendChild($outcomeOdds);
                $betOffer.appendChild($outcome);
            });
            $event.appendChild($betOffer);
        });
        this.$match.appendChild($event);

    }

    renderPrice(price) {

        this.$odds.innerHTML = (Number(price) / 1000).toFixed(2).toLocaleString();
        this.$odds.href = this.target + "?affiliateId=" + this.affiliateId + "&coupon=single|" + this.id + "||append|lance";
    }

    getOutcomeDivName(outcome) {
        if (outcome.englishLabel == "1") {
            return "home";
        }
        else if (outcome.englishLabel == "X") {
            return "draw";
        }
        else if (outcome.englishLabel == "2") {
            return "away";
        }
    }  // getOutcomeDivName

    getOutcomeText(event, outcome) {
        if (outcome.englishLabel == "1") {
            return event.homeName + " " + this.winText;
        }
        else if (outcome.englishLabel == "X") {
            return this.drawText
        }
        else if (outcome.englishLabel == "2") {
            return event.awayName + " " + this.winText;
        } else {
            console.error("Outcome text not found for outcome: ", outcome, " and event: ", event);
        }

    }


}







window.customElements.define('eyas-match-container', Match);