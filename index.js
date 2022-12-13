
//takes search bar input and sends as argument into listTeams()

document.querySelector(`form`).addEventListener(`submit`, (e) => {
    e.preventDefault()
    listTeams(e.target.searchBar.value)
})
