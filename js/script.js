import {
    movies
} from "./db.js";

let ul = document.querySelector('.promo__interactive-list')
let bac = document.querySelector('.promo__bg')
let gen = document.querySelector('.promo__genre')
let title = document.querySelector('.promo__title')
let text = document.querySelector('.promo__descr')
let IMBd = document.querySelector('.IMBd')
let kinopoisk = document.querySelector('.kinopoisk')
let searchInput = document.querySelector('#searchInput')

let genUl = document.querySelector('.genresUl')
let genres_arr = ['All', ...movies.map(item => item.Genre)]

searchInput.oninput = () => {
    let query = searchInput.value.toLowerCase().trim()

    let filtered = movies.filter(item => {
        let title = item.Title.toLowerCase()
        if (title.includes(query)) {
            return item
        }
    })

    reload(filtered)
}

let filterfordel = [...movies]
reload(filterfordel.sort((atitel, btitel) => atitel.Title > btitel.Title ? 1 : -1))

function reload(data) {
    ul.innerHTML = ""

    setMovieData(data[0])

    for (let item of data) {
        let li = document.createElement('li')
        let deletee = document.createElement('div')

        li.classList.add('promo__interactive-item')
        deletee.classList.add('delete')

        li.innerHTML = item.Title

        li.append(deletee)
        ul.append(li)

        deletee.onclick = () => {
            filterfordel = filterfordel.filter(el => el.ID !== item.ID)
            reload(filterfordel)
        }

        li.onclick = () => {
            setMovieData(item)
        }
    }
}


function setMovieData(item) {
    bac.style.backgroundImage = url("${item.Poster}")
    gen.innerHTML = item.Genre
    title.innerHTML = item.Title
    text.innerHTML = item.Plot
    IMBd.innerHTML = `IMDb: ${item.imdbRating}`
    kinopoisk.innerHTML = `Кинопоиск: ${item.Metascore}`
}
genres_arr = [...new Set(genres_arr)]

generateGenres(genres_arr)
function generateGenres(arr) {
    genUl.innerHTML = ""

    for (let item of arr) {
        let li = document.createElement('li')
        let a = document.createElement('a')

        if (arr.indexOf(item) === 0) {
            a.classList.add('promo__menu-item_active')
        }

        a.classList.add('promo__menu-item')
        a.href = "#"
        a.innerHTML = item


        li.append(a)
        genUl.append(li)
        // functions
        li.onclick = () => {
            genUl.childNodes.forEach(elem => elem.firstChild.classList.remove('promo__menu-item_active'))

            li.firstChild.classList.add('promo__menu-item_active')


            let filtered = movies.filter(elem => {
                let genre = elem.Genre.toLowerCase()
                if (item.toLowerCase() === genre) {
                    return elem
                } else if (item.toLowerCase() === 'all') {
                    reload(movies)
                }
            })


            if (filtered.length > 0) {
                reload(filtered)
            }
        }

    }
}