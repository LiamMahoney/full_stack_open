function dummy(blogs) {
    return 1;
}

function totalLikes(blogs) {
    return blogs.reduce((accumulator, currentValue) => {
        return accumulator += currentValue.likes
    }, 0);
}

module.exports = {
    dummy,
    totalLikes
};