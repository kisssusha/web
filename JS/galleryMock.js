window.addEventListener("load", async function loadUrl() {
    const container = document.getElementById('photos');
    let gallery = []

    function getRandomInRange(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    try {
        let response = await fetch('https://jsonplaceholder.typicode.com/photos')
        gallery = await response.json();
        gallery = gallery.filter(function (item, index, array) {
            return (item.id % getRandomInRange(90, 200) === 0);
        });
    } catch (e) {
        const message = document.createElement("p")
        message.innerHTML = "Ошибка - не удалось загрузить фото"
        message.classList.add("error_message")
        container.appendChild(message)
        return
    } finally {
        document.getElementsByClassName("preloader")[0].style.display = "none"
    }
    gallery.forEach(function (gal, i, gallery) {
        const newUrl = document.createElement("article");
        const title = document.createElement("div");

        const titleName = document.createElement("h3");
        titleName.innerHTML = gal.title;
        const thumbnailUrl = document.createElement("img");
        thumbnailUrl.src =  gal.thumbnailUrl;
        const mainPhoto = document.createElement("img");
        mainPhoto.src = gal.url;

        title.classList.add("title_in_album")
        titleName.classList.add("title_name_in_album")
        thumbnailUrl.classList.add("thumbnailUrl_of_photo")
        mainPhoto.classList.add("main_photo")
        newUrl.classList.add("photo_with_title")

        title.appendChild(thumbnailUrl)
        title.appendChild(titleName)
        newUrl.appendChild(title)
        newUrl.appendChild(mainPhoto)
        container.appendChild(newUrl)
    });
})
