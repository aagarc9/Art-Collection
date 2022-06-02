import React from "react";



const ArtPage = () => {
    return (
    <div>
        Art Page Here!
        Likes: {artObject.likesCount}
    </div>   
    );
  };

export default ArtPage;




const artObject = {
    title: 'TestArt',
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