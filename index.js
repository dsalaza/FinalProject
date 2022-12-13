
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
