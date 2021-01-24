const app = {
    api_key: 'qA0ZA7Y5brO8OFftpoRpt4j2yifcGliI',
    searchForm: $('#search-form'),
    formBtns: $('#search-form button'),
    gifs: $('#gifs')
};

app.formBtns.click(function(e) {
    e.preventDefault();
    if ($(this).attr("id") === "search") {
        const search = $('#search').val();
        searchGif(app.api_key, search);
        app.searchForm.trigger("reset");
    } else if ($(this).attr("id") === "clear") {
        app.gifs.empty();
    };
});

async function searchGif(api_key, tag) {
    try {
        const res = await axios.get('https://api.giphy.com/v1/gifs/random', { params: { api_key, tag }});
        const newGif = makeNewGif(res);
        addNewGif(newGif);
    } catch(err) {
        alert('Ops, something went wrong...');
        console.log(err);
    };
};

function addNewGif(newGif) {
    app.gifs.append(newGif);
};

function makeNewGif(APIres) {
    const gifURL = APIres.data.data.image_url;
    const newIMG = $('<img>').attr("src", gifURL);
    return newIMG;    
};