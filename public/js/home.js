const readReviews = document.getElementById('readreview');
const writeReviews = document.getElementById('writereview');


readReviews.addEventListener('click', () => {
    document.location.replace('/readreview');
});

writeReviews.addEventListener('click', () => {
    document.location.replace('/writereview');
});