import { VanillaHTTP } from "../src/http.js";

const postsContainer = document.getElementById("posts");
const loadBtn = document.getElementById("load-posts");
const form = document.getElementById("create-post-form");

async function loadPosts() {
  try {
    const posts = await VanillaHTTP.get("https://jsonplaceholder.typicode.com/posts");
    postsContainer.innerHTML = "";
    posts.slice(0, 5).forEach(post => {
      const li = document.createElement("li");
      li.textContent = `${post.id}. ${post.title}`;
      postsContainer.appendChild(li);
    });
  } catch (err) {
    alert(err.message);
  }
}

async function createPost(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  try {
    const newPost = await VanillaHTTP.post(
      "https://jsonplaceholder.typicode.com/posts",
      { title, body: content, userId: 1 }
    );
    alert("✅ Post created: " + JSON.stringify(newPost));
    form.reset();
  } catch (err) {
    alert(err.message);
  }
}

loadBtn.addEventListener("click", loadPosts);
form.addEventListener("submit", createPost);
