import axios from "axios";

async function getData(userId) {
    const user = await axios(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const posts = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    user.data.posts = posts.data;
    console.log(user.data);
}

export default getData;