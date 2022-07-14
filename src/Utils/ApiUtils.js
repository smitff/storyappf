// const serverurl = "http://awarepedia786-001-site1.htempurl.com/api/";
// const imageurl = "http://awarepedia786-001-site1.htempurl.com/Images/";
// http://ec2-43-204-141-71.ap-south-1.compute.amazonaws.com
const serverurl = "http://ec2-15-206-88-112.ap-south-1.compute.amazonaws.com:3000/api/";
// http://ec2-15-206-88-112.ap-south-1.compute.amazonaws.com:3000/
const imageurl = "http://ec2-15-206-88-112.ap-south-1.compute.amazonaws.com:3000/";
const adurl = "https://storyads1.herokuapp.com/getAdId"
// const imageurl = "http://10.0.2.2:3000/";

export const ApiUtils = {
    getallcatgories: `${serverurl}getAllCategory`,
    getallstoriesbycatid: `${serverurl}getCategoryWiseStory/`,
    
}

export const ImageService = {
    categoryImg:`${imageurl}category/`,
    storyImg:`${imageurl}storyimg/`,
}


export const TextFile = {
    storyTxtFile:`${imageurl}stories/`,
}

export const AdsUrl = {
    adsurl:adurl
}









