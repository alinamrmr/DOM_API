let posts = [];
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
        let title = document.createElement("h3");
        let description = document.createElement("p");
        let img = document.createElement("img");
        let createdAt = document.createElement("p");
        let tags = [];

        title.innerHTML = post.title;
        description.innerHTML = post.description;
        img.src = post.image;
        let date = new Date(post.createdAt);
        createdAt.innerHTML = date.toGMTString();             
        for (let i = 0; i < post.tags.length; i++) {
            tags[i] = document.createElement("span");
            tags[i].innerHTML = "#" + post.tags[i].toLowerCase();
        }
                
        let remove = document.createElement("button");
        remove.innerHTML = "delete";
        remove.onclick = function() {
            document.getElementById("list").removeChild(this.parentNode);
        };
                
        li.appendChild(title);
        li.appendChild(description);
        li.appendChild(img);
        li.appendChild(createdAt);
        for (let i = 0; i < post.tags.length; i++) {
            li.appendChild(tags[i]);
        }
        li.appendChild(remove);
        return li;
        })
    for (let i = 0; i < 10; i++) {
        let list = document.getElementById('list');
		list.appendChild(posts.shift());
	}
}
