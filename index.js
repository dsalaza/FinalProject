
//takes search bar input and sends as argument into listTeams()

document.querySelector(`form`).addEventListener(`submit`, (e) => {
    e.preventDefault()
    listTeams(e.target.searchBar.value)
})

//takes input from search bar, checks to see if the input is equal to a team name in the 
//database, then runs listRoster() using the teamID

function listTeams (team) {

    fetch(`http://lookup-service-prod.mlb.com/json/named.team_all_season.bam?sport_code='mlb'&sort_order=name_asc&season=2022`)
    .then(resp => resp.json())
    .then(data => { 
        
        let teamArray = data.team_all_season.queryResults.row
        teamArray.find(element => {

            if (element.name === team) {
                listRoster(element.team_id)
            }
        })
    })
}

//finds roster by teamID and renders playercard

function listRoster (teamID) {

    fetch(`http://lookup-service-prod.mlb.com/json/named.roster_40.bam?team_id=${teamID}`)
    .then(resp => resp.json())
    .then(data => { 
        let rosterArray = data.roster_40.queryResults.row
        rosterArray.forEach(element => {

            let createPlayerName = document.createElement(`p`)
            createPlayerName.classList.add(`playerName`)
            createPlayerName.innerText = `${element.name_display_first_last}`
            document.querySelector(`#roster`).appendChild(createPlayerName)

            let createPlayerInfo = document.createElement(`p`)
            createPlayerInfo.classList.add(`playerInfo`)
            createPlayerInfo.innerText = `postition: ${element.position_txt}, throws: ${element.throws}, bats: ${element.bats}`
            document.querySelectorAll(`p.playerName`).forEach(element => element.appendChild(createPlayerInfo))

        })
        
    })
}
