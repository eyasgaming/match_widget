const template = document.createElement('template');

/****
 * 
 * usage: <league-events drawText="draw" winText="win" leagueId="1000000000">no events text</league-events>
 * 
 ***/

template.innerHTML = `
    <div id ="league">
    </div>
  `

class League extends HTMLElement {

    // You can edit these:
    prod = false;
    affiliateId = "AY2838324479"

    // Do not edit anyething below this line
    nonProdUrl = "https://graphql.cts.kambicdn.com"
    prodUrl = "https://graphql.kambicdn.com"

    nonProdTarget = "https://lancebet-com-uat.eyasgaming.net"
    prodTarget = "https://www.lancebet.com"

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

    connectedCallback() {
        this.$league = this._shadowRoot.querySelector('#league');
        this.$league.innerHTML = "...";
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
      //   .catch((error) => this.$league.innerHTML = this.textContent);
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

            const $eventTitle = document.createElement('div');
            $eventTitle.innerHTML = event.name;
            $eventTitle.className = "event_name";
            $event.appendChild($eventTitle);


            var localDate = new Date(event.start);
            const $eventDate = document.createElement('div');
            $eventDate.innerHTML = localDate.toLocaleString();
            $eventDate.className = "event_date";
            $event.appendChild($eventDate);

            event.betOffers.forEach((betOffer) => {


                const $betOffer = document.createElement('div');
                $betOffer.className = "bet_offers";

                betOffer.outcomes.forEach((outcome) => {
                    const $outcome = document.createElement('div');
                    $outcome.className = this.getOutcomeDivName(outcome);
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


}

window.customElements.define('league-events', League);