const backendDomain = "http://localhost:8080";

const SummaryApi = {
    signUp : {
        url: `${backendDomain}/api/v1/signup`,
        method: 'post'
    },
    login : {
        url: `${backendDomain}/api/v1/login`,
        method : 'post'
    },
    currentUser : {
        url : `${backendDomain}/api/v1/user-details`,
        method : 'get'
    },
    logoutUser : {
        url : `${backendDomain}/api/v1/logout`,
        method : 'get'
    },
    allUser : {
        url : `${backendDomain}/api/v1/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${backendDomain}/api/v1/update-user`,
        method : 'post'
    },
    uploadProduct : {
        url : `${backendDomain}/api/v1/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${backendDomain}/api/v1/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${backendDomain}/api/v1/update-product`,
        method : 'post'
    },
    categoryProduct : {
        url : `${backendDomain}/api/v1/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${backendDomain}/api/v1/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${backendDomain}/api/v1/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${backendDomain}/api/v1/add-to-cart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${backendDomain}/api/v1/count-add-to-cart-product`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${backendDomain}/api/v1/view-cart-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${backendDomain}/api/v1/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${backendDomain}/api/v1/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${backendDomain}/api/v1/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${backendDomain}/api/v1/filter-product`,
        method : 'post'
    },
}

export default SummaryApi;