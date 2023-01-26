import axios from "axios";


export const fetchPhotos = async (search, numPage) => {
    const response = await axios.get(`https://pixabay.com/api/`, 
    {
        method: "get",
        params: {
            key: "31279594-d7f31148a9794d6f86efa6037",
            q: search,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 12,
            page: numPage,
        },
    });
   
    return response.data.hits
    
}
