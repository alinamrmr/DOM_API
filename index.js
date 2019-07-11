let posts = [];
let postsLim = 10;
const url = 'https://api.myjson.com/bins/152f9j';

fetch(url).then(
			response => {
				response.json().then(data => {
                    const rawData = data.data;
                    createList(rawData);
				});
			}
        ).catch((error) => {
            console.log(JSON.stringify(error));
        });
function createList(data) {
	posts = data.map( post => {
	    let li = document.createElement("li");
        let title = document.createElement("h2");
        let description = document.createElement("p");
        let img = document.createElement("img");
        let createdAt = document.createElement("p");
        let tags = [];

        title.innerHTML = post.title;
        description.innerHTML = post.description;
        img.src = post.image;
        createdAt.innerHTML = new Date(post.createdAt);         
        for (let i = 0; i < post.tags.length; i++) {
            tags[i] = document.createElement("span");
            tags[i].innerHTML = "#" + post.tags[i].toLowerCase();
        }
                
        let remove = document.createElement("button");
        remove.innerHTML = "delete";
        removePost = function() {
            document.getElementById("list").removeChild(this.parentNode);
        };
        remove.addEventListener('click', removePost);
                
        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(img);
        li.appendChild(createdAt);
        for (let i = 0; i < post.tags.length; i++) {
            li.appendChild(tags[i]);
        }
        li.appendChild(remove);
        return li;
        });
    //console.log(posts.length);
    sortByDateAsc(posts);
    for (let i = 0; i < postsLim; i++) {
        list = document.getElementById('list');
		list.appendChild(posts[i]);
	}
}

window.onscroll = function(){
    if(posts.length === 0)
        return;
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        //console.log('bottom');
        for (let i = postsLim; i < postsLim + 10; i++) {
            list = document.getElementById('list');
            list.appendChild(posts[i]);
        }
        postsLim += 10;
    }
}


function sortByDateAsc(posts){
    posts.sort((a, b) => {
        a = new Date(a.createdAt);
        b = new Date(b.createdAt);
        return (a - b);
    });
    //console.log("sort");
}

let defaultBtn = document.getElementById('default');
let setToDefault = function(){
    window.scrollTo(0,0);
    postsLim = 10;
    let tmpList = document.getElementById("list").cloneNode(false);
    for (let i = 0; i < postsLim; i++) {
		tmpList.appendChild(posts[i]);
    }
    document.getElementById("list").parentNode.replaceChild(tmpList, document.getElementById('list'));
    /*for (let i = 0; i < postsLim; i++) {
        list = document.getElementById('list');
		list.removeChild(posts[i]);
    }
    console.log(list);
    console.log("empty");
    postsLim = 10;
    for (let i = 0; i < postsLim; i++) {
        list = document.getElementById('list');
		list.appendChild(posts[i]);
    }*/
};
defaultBtn.addEventListener('click', setToDefault);
