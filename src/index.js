
import Notiflix, { Loading } from "notiflix";
import fetchImages from './js/fetch_images';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchBar = document.querySelector('.search-input'); 
const searchButton = document.querySelector('button[type=submit]');
const imageList = document.querySelector('.gallery');
const loader = document.querySelector('.load_more');


let page = 1;
const per_page = 40;
let input = null;




searchButton.addEventListener("click",(event) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("Clicked!")
    let input = searchBar.value;
    console.log(searchBar.value)
    if (input == "" || input == undefined || !input) {
        loader.classList.add('is_hidden');
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    } else {
        searchImages(input)
    }

   
    // if (input == "" || input == undefined ) {
    //     return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
    // } else {
    //     try {
    //         const images = await fetchImages(input) 
    //         return images
    //              // console.log(images)
    //              // renderImageListItems(images);
    //      } catch (error) {
    //          console.log(error.message)
     
    //      }
    // }

});


loader.addEventListener("click", () => {
    let input = searchBar.value;
    loadMore(input)
    console.log(searchImages())
});

    // console.log(input)

async function searchImages(name) {
    
    imageList.innerHTML = "";
    const key = '33708705-fcc5c6414e4f1d5b337962d91'
    const baseURL = `https://pixabay.com/api/`;
    

    const response = await fetchImages(baseURL, key, name, page, per_page);
    const images = response.data.hits;
    const totalImages = response.data.totalHits;
    
    if (images.length < 0 || totalImages == 0) {
        loader.classList.add('is_hidden')
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    } else if (images.length > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalImages} images`);
        blowUpImage(images)
        loader.classList.remove('is_hidden')
        console.log(page)
        page++
    } else if (images.length > 0 && images.length < 3) {
        loader.classList.add('is_hidden')
    }
}



async function loadMore(name) {
    const key = '33708705-fcc5c6414e4f1d5b337962d91'
    const baseURL = `https://pixabay.com/api/`;
    
    const response = await fetchImages(baseURL, key, name, page, per_page);
    console.log(response.data.hits)
    const images = response.data.hits;
    const totalImages = response.data.totalHits;
    const totalPages = page * per_page;

    if (totalImages <= totalPages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        loader.classList.add('is_hidden');
    }
    blowUpImage(images)
    page += 1
    console.log(page)
}

        
// Run all promises in parallel land wait for their completion
  
function renderImages(images) {
  return images.map((hit) => {
        const pic = document.createElement("div.photo-card");
            pic.innerHTML = 
                `<a href="${hit.largeImageURL}">
                    <img src="${hit.webformatURL}" alt="Photo of ${hit.tags}" loading="lazy" />
                </a>
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
}

function blowUpImage(images) {
    const lightbox = new SimpleLightbox('.gallery a', {
        captions: true,
        captionData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        close: true,
        
    }, renderImages(images));
    lightbox.refresh()
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