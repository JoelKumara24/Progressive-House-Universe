import "./Blog.scss";

function Blog() {
  const blogPosts = [
    {
      title: "The Rise of Melodic House in 2025",
      date: "Apr 10, 2025",
      author: "Sophia Evans",
      excerpt:
        "Melodic house has taken the electronic music scene by storm in 2025. In this article, we explore the key artists and events driving this resurgence.",
      link: "#",
    },
    {
      title: "Behind the Scenes: Hernan Cattaneo’s Latest Set",
      date: "Mar 15, 2025",
      author: "Alex Carter",
      excerpt:
        "We sat down with Hernan Cattaneo to discuss his creative process and the inspiration behind his latest live set at PHU’s annual festival.",
      link: "#",
    },
    {
      title: "Top 5 Tracks to Add to Your Playlist This Spring",
      date: "Feb 28, 2025",
      author: "Sophia Evans",
      excerpt:
        "Spring is here, and we’ve curated a list of the top 5 melodic house tracks to elevate your playlist. From Yotto to Khen, these tracks are must-haves.",
      link: "#",
    },
    {
      title: "How PHU Events Are Redefining the Festival Experience",
      date: "Jan 12, 2025",
      author: "Michael Reed",
      excerpt:
        "PHU events are more than just music—they’re immersive experiences. Learn how we’re setting a new standard for festivals in the progressive house scene.",
      link: "#",
    },
  ];

  return (
    <div className="blog">
      <h1>Blog</h1>
      <p className="intro">
        Over the Horizon.
      </p>
      { /*
      <div className="blog-posts">
        {blogPosts.map((post, index) => (
          <div key={index} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-meta">
              <span className="post-date">{post.date}</span>
              <span className="post-author">by {post.author}</span>
            </div>
            <p className="post-excerpt">{post.excerpt}</p>
            <a href={post.link} className="read-more">
              Read More
            </a>
          </div>
        ))}
      </div>  */}
    </div>
  );
}

export default Blog;