const template = document.createElement('template');

/****
 * 
 * usage:    <league-events leagueId="1000094985" loadingText="Loading..." drawText="draw" winText="to win">No Matches currently avaliable</league-events>
 *
 ***/

template.innerHTML = `
    <style>
        .event_data {
            border: 1px solid #ccc;
            margin: 5px;
            padding: 5px;
            border-radius: 5px;
        }
        .event_name {
            font-weight: bold;
            font-size: 1.2em;
        }
        .event_date {
             padding-left: 10px;
         }

        .bet_offers {
            display: grid;
            grid-auto-rows: 1fr;
            grid-template-columns: 1fr 1fr 1fr;
        }
    </style>
    <div id ="league">
    </div>
  `

class League extends HTMLElement {

    // You can edit these:
    prod = false;
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

      //  this.leagueId = this.getAttribute('leagueId');
    }


    get leagueId() {
        return this.getAttribute('leagueId');
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
        this.$league = this._shadowRoot.querySelector('#league');
        this.$league.innerHTML = this.loadingText;
     //   this.$odds.href = this.target + "?affiliateId=" + this.affiliateId // default url in case no odds found.
        this.getEvents(this.leagueId);
    }

    getEvents(leagueId) {
        const data = JSON.stringify({
            query: `
            query Event {
                event(
                    offering: "eyasgamingbr"
                    market: "BR"
                    groupId:` + leagueId + `
                    onlyMain: true
                ) {
                    events {
                        id
                        englishName
                        groupId
                        state
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
                                participant
                                label
                                prevOdds
                                betOfferId
                                oddsFractional
                                oddsAmerican
                                status
                                cashOutStatus
                                homeScore
                                awayScore
                                occurrence {
                                    occurrenceType
                                    occurrenceTypeLabel
                                }
                            }
                            suspended
                            closed
                            criterion {
                                englishLabel
                                id
                                lifetime
                            }
                        }
                        name
                        homeName
                        awayName
                        start
                        group
                        score {
                            home
                            away
                            info
                            who
                        }
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
         .then((data) => this.renderLeage(data.data.event.events))
         .catch((error) => this.$league.innerHTML = this.textContent);
    }

    renderLeage(events) {

        if (events == null) {
            this.$league.innerHTML = this.textContent;
            return;
        }

        this.$league.innerHTML = "";

        events.forEach((event) => {
            const $event = document.createElement('div');
            $event.className = "event_data";

            const $eventTitle = document.createElement('span');
            $eventTitle.innerHTML = event.name;
            $eventTitle.className = "event_name";
            $event.appendChild($eventTitle);


            var localDate = new Date(event.start);
            const $eventDate = document.createElement('span');
            $eventDate.innerHTML = localDate.toLocaleString();
            $eventDate.className = "event_date";
            $event.appendChild($eventDate);

            event.betOffers.forEach((betOffer) => {


                const $betOffer = document.createElement('div');
                $betOffer.className = "bet_offers";

                betOffer.outcomes.forEach((outcome) => {
                    const $outcome = document.createElement('div');
                    $outcome.className = this.getOutcomeDivName(outcome);

                    const $outcomeName = document.createElement('div');
                    $outcomeName.className = "outcome_name";
                    $outcomeName.innerHTML = this.getOutcomeText(event, outcome);
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
            this.$league.appendChild($event);
        });
    }

    renderPrice(price) {
        console.log("prod: " + this.prod)
        console.log("url: " + this.url)
        console.log("target: " + this.target)

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
        }

    }


}

window.customElements.define('league-events', League);