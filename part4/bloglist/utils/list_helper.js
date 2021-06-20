function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    return blogs.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.likes
    }, 0);
}

function favoriteBlog(blogs) {
    let favoriteBlog = undefined;

    blogs.forEach((blog) => {
        if (favoriteBlog === undefined) {
            favoriteBlog = blog;
        }
        else if (blog.likes > favoriteBlog.likes) {
            favoriteBlog = blog;
        }
    });

    return favoriteBlog;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};