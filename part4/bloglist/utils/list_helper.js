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

function mostBlogs(blogs) {
    let authors = blogs.reduce((accumulator, currentValue) => {

        let currAuthor = accumulator.find((author) => {
            // console.log('currentValue', currentValue);
            // console.log('author', author);
            return author.author === currentValue.author;
        });

        if (currAuthor) {
            currAuthor.blogs++;
        } else {
            accumulator.push({
                author: currentValue.author,
                blogs: 1
            });
        }

        return accumulator;
    }, []);

    let maxAuthor = undefined;

    authors.forEach((author) => {
        if (maxAuthor === undefined) {
            maxAuthor = author;
        } else if (author.blogs > maxAuthor.blogs) {
            maxAuthor = author;
        }
    });

    return maxAuthor;
}

function mostLikes(blogs) {
    let authors = blogs.reduce((accumulator, currentValue) => {
        let currAuthor = accumulator.find((author) => {
            return author.author === currentValue.author;
        });

        if (currAuthor) {
            currAuthor.likes += currentValue.likes
        } else {
            accumulator.push({
                author: currentValue.author,
                likes: currentValue.likes
            });
        }

        return accumulator;
    }, []);

    let maxAuthor = undefined;

    authors.forEach((author) => {
        if (maxAuthor === undefined) {
            maxAuthor = author;
        } else if (author.likes > maxAuthor.likes) {
            maxAuthor = author;
        }
    });

    return maxAuthor;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};