import React from "react";



const ArtPage = () => {
    return (
    <div class="artpage">
        Welcome to your Art Page!
        <div class="title-art">
         {artObject.title}
        </div>

        <a href={`}${artObject.img}`} target="_blank">
          <img className='art-img'
            src={`${artObject.img}?w=180&h=180&fit=crop&auto=format`}
            srcSet={`${artObject.img}?w=180&h=180&fit=crop&auto=format&dpr=2 2x`}
            alt={artObject.title}
            loading="lazy"
          />
          </a>
        How does this artwork make you feel?
        <div class="artContainer">
        
        Likes: {artObject.likesCount}
        Views: {artObject.viewsCount}
        Funny: {artObject.evokeFunnyCount}
        Beautiful: {artObject.evokeBeautifulCount}
        Sad: {artObject.evokeSadCount}
        Wholesome: {artObject.evokeWholesomeCount}
        Mysterious: {artObject.evokeMysteriousCount}
        Thoughtful: {artObject.evokeThoughtfulCount}
        </div>
    </div>   
    );
  };

export default ArtPage;

const artObject = {
    title: 'Breakfast',
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    description: 'This is to test front end',
    owner: 'testOwner',
    likesCount: 40,
    viewsCount: 200,
    evokeFunnyCount: 5,
    evokeBeautifulCount: 22,
    evokeSadCount: 1,
    evokeWholesomeCount: 11,
    evokeMysteriousCount: 20,
    evokeThoughtfulCount: 6,
    evokeInspiringCount: 7,
    evokeCalmingCount: 4
  
}
