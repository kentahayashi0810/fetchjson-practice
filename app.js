const input = document.getElementById("input");
const button = document.getElementById("button");

button.addEventListener("click", () => {
  const target = document.getElementById("posts");
  target.innerHTML = "";
  const inputId = input.value;

  renderPosts(inputId);
  input.value = "";
});

const renderPosts = (userId) => {
  let URL = "https://jsonplaceholder.typicode.com/posts";
  if (userId) {
    URL += "?userId=" + userId;
  }

  const target = document.getElementById("posts");
  const heading = document.getElementById("heading");
  const container = document.createDocumentFragment();
  let maxPostCounts = 10;

  fetch(URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`リクエスト失敗 status code ${response.status} `);
      }
    })
    .then((posts) => {
      const postsCount = posts.length;
      maxPostCounts = postsCount > maxPostCounts ? maxPostCounts : postsCount;

      for (let i = 0; i < maxPostCounts; i++) {
        const link = document.createElement("a");
        link.setAttribute("href", `./${userId}-${posts.id}`);
        link.setAttribute("class", "link");
        const div = document.createElement("div");
        div.setAttribute("class", "post");
        const title = document.createElement("h3");
        title.setAttribute("class", "title");
        const content = document.createElement("class", "div");
        content.setAttribute("class", "content");
        title.textContent = posts[i].title;
        content.textContent = posts[i].body;

        div.appendChild(title);
        div.appendChild(content);
        link.appendChild(div);

        container.appendChild(link);
      }

      heading.textContent = "Posts " + (userId ? "By " + userId : "");
      target.appendChild(container);
    })
    .catch((error) => {
      console.warn(error);
    });
};
