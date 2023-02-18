const searchBar = document.querySelector('.search-input'); 
const searchButton = document.querySelector('button[type=submit]');
const imageList = document.querySelector('.gallery');

let page = 1;
let limit = 20; 

searchBar.addEventListener("input", (event) => {
    let input = event.target.value
    // console.log(input)
})

searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("Clicked!")
    let input = searchBar.value;
    console.log(searchBar.value)
    if(searchBar !== "") {
        try {
            const images = await fetchImages(input);
            // console.log(images)
            // renderImageListItems(images);
        } catch (error) {
            console.log(error.message)
        }
    }
})

async function fetchImages(name) {
    const key = '33708705-fcc5c6414e4f1d5b337962d91'
    const baseURL = `https://pixabay.com/api/`;
    const arr = [1, 2, 3, 4, 5];
    
// create an array of promises 
    
    const response = await fetch(`${baseURL}?key=${key}&q=${name}&image_type=photo&safesearch=true&page=1`)
    const result = await response.json()
    result.hits.map((hit) => {
        const pic = document.createElement("div.photo-card");
            pic.innerHTML = 
                `<img src="${hit.webformatURL}" alt="Photo of ${hit.tags}" loading="lazy" />
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b>
                        ${hit.likes} 
                    </p>
                    <p class="info-item">
                        <b>Views</b>
                        ${hit.views} 
                    </p>
                    <p class="info-item">
                        <b>Comments</b>
                        ${hit.comments} 
                    </p>
                    <p class="info-item">
                        <b>Downloads</b>
                        ${hit.downloads} 
                    </p>
                </div>`;
            document.querySelector('.gallery').appendChild(pic)
    });
// Run all promises in parallel land wait for their completion
    // const images = await Promise.all(arrayOfPromises);
    
    // return images
    console.log(result)
  
    
}



// async function fetchImages(name) {
//     const token = '33708705-fcc5c6414e4f1d5b337962d91'
//     const videos = await fetch(`https://pixabay.com/api/videos/?key=${token}`);
//     const images =  await fetch(`${videos}&q=${name}`);
//     return images;
// };

// function renderImageListItems(images) {
//     const imageList = document.querySelector('.gallery');
//     // const each = images.forEach((image) => {
//     //     console.log(image.hits)
//     // })
//     const markup = images.map((image) => 
//         `<div class="photo-card">
//             <img src="${image.hits.map(hits => hits.webformatURL)}" alt="" loading="lazy" />
//             <div class="info">
//                 <p class="info-item">
//                     <b>${image.hits.map(hits => " " + hits.id)}</b>
//                 </p>
//                 <p class="info-item>
//                     <b>${image}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>${image}</b>
//                 </p>
//                 <p class="info-item">
//                     <b>${image}</b>
//                 </p>
//             </div>
//         </div>
//         `)
//         .join("");
//     imageList.innerHTML =  markup;
//     console.log(markup)
// }