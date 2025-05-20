import React, { useState, useEffect } from 'react';

const AIRTABLE_BASE_ID = 'app4NWtM2VWNluAWL';
const AIRTABLE_TABLE_NAME = 'Posts';
const AIRTABLE_PAT = 'patZoVv9QaUc80C7z.9b8f9b195ef5d05b7c13b7642e8413550245ad1a568cb8f7b03b71f93600b9ac'; 

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
          {
            headers: {
              Authorization: `Bearer ${AIRTABLE_PAT}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Ошибка Airtable: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const loadedPosts = data.records.map(record => ({
          id: record.id,
          title: record.fields.Title,
          category: record.fields.Category,
          url: record.fields.URL || '#',  // подтягиваем поле URL
        }));

        setPosts(loadedPosts);
        setLoading(false);
      } catch (err) {
        console.error('Ошибка загрузки данных Airtable:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const filteredPosts = query.trim() === ''
    ? []
    : posts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase())
      );

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Искать на FlopSpace..."
        className="search-bar__input-field"
        value={query}
        onChange={handleChange}
      />
      <div className="search-results">
        {filteredPosts.map(post => (
          <div key={post.id} className="search-result-item">
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              {post.title} — <i>{post.category}</i>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;