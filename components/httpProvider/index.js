import {apiURL} from './../../config';

const httpService = {
	post(url, data){
		return fetch(apiURL + url, {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ data })
		})
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
	      console.error("errrrrr",error);
	    });
	},

	get(url){
		return fetch(apiURL + url)
	    .then(response => response.json())
	    .then(resJson => {
	    	if(resJson){
	    		return resJson;
	    	}
	    })
	    .catch(error => {
	      console.error("errrrrr",error);
	    });
	},

	delete(url){
		return fetch(apiURL + url, {
		  method: 'DELETE',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		})
	    .then(response => response.json())
	    .then(resJson => {
	    	if(resJson){
	    		return resJson;
	    	}
	    })
	    .catch(error => {
	      console.error("errrrrr",error);
	    });
	},
	put(url, data){
		console.log("put called")
		return fetch(apiURL + url, {
		  method: 'PUT',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ data })
		})
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
	      console.error("errrrrr",error);
	    });
	},

}

export default httpService;