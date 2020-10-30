async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value;

  const blog_text = document.querySelector('textarea[name="blog-body"]').value.trim();

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      title,
      blog_text
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
//   On form submission, this will grab the post-title and post-url values from the form and send them with a POST request to /api/posts. Remember, though, that the /api/posts endpoint requires a third property: the user ID. Like the other routes, this can be obtained from the session.