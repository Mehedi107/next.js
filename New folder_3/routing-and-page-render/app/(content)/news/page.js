import Link from 'next/link';

export default async function NewsPage() {
  const response = await fetch('http://localhost:8080/news');
  const news = await response.json();

  return (
    <>
      <h1>New page</h1>
      <ul className="news-list">
        {news.map(newsItem => (
          <li key={newsItem.id}>
            <Link href={`/news/${newsItem.slug}`}>
              <img
                src={`/images/news/${newsItem.image}`}
                alt={newsItem.title}
              />
              <span>{newsItem.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
