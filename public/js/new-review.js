async function newFormHandler(event) {
    event.preventDefault();
    const name = document.querySelector('#blog-name').value;
    const description = document.querySelector('#blog-text').value;
    const country_name = document.querySelector('#country-select').value;

    // Send fetch request to add a new blog
    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            description,
            country_name,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    //if the blog is added, the 'all' template will be rerendered
    console.log(response)
    if (response.ok) {
        document.location.replace('/readreview');
    } else {
        alert('Failed to add new blog');
    }
}

document.querySelector('.create-blog-form').addEventListener('submit', newFormHandler);