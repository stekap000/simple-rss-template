function get(url, callback){
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            callback.call(xhr);
        }
    }
    xhr.open("GET", url);
    xhr.send();
}

function callback(){
    const xhr = this;
		const xmlDOM = xhr.responseXML;

    let feedHTML = "";

    const items = xmlDOM.querySelectorAll("item");

		items.forEach(item => 
        feedHTML += `
                        <hr>
                        <article>
                            <h4>${item.querySelector('title').innerHTML}</h4>
                            <p>${item.querySelector('description').innerHTML}</p>
                            <a href="${item.querySelector('link').innerHTML}" target="_blank"><img style="height: 150px; width:auto;" src="${item.querySelector("[url^='https']").getAttribute('url')}"/></a>
                        </article>
                    `
		);

    document.getElementById("feed").innerHTML = feedHTML;
}

function init(){
    get("https://www.wired.com/feed", callback);
}
