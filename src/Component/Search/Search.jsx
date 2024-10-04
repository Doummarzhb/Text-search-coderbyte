import React, { useState } from 'react';
import './SearchPage.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const posts = [
    {
      id: 1,
      title: 'Understanding the difference between grid-template and grid-auto',
      date: 'Oct 09, 2018',
      content: `With all the new properties related to CSS Grid Layout, one of the distinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically, the difference between grid-template-rows/columns and grid-auto-rows/columns.`,
    },
    { id: 2, title: 'Recreating the GitHub Contribution Graph with CSS Grid Layout', date: 'Oct 10, 2018', content: 'In this post, we will recreate the GitHub contribution graph using CSS Grid Layout.' },
  ];
 
  const countOccurrences = (text, term) => {
    if (!term) return 0;
    const regex = new RegExp(term, 'gi');  
    return (text.match(regex) || []).length;  
  };

  const totalOccurrences = posts.reduce((count, post) => {
    return count + countOccurrences(post.content, searchTerm) + countOccurrences(post.title, searchTerm);
  }, 0);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const highlightText = (text) => {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
    );
  };

  return (
    <div className="search-page">
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
 
      <p>
        {totalOccurrences} {totalOccurrences === 1 ? 'posts' : 'posts'} 
        {searchTerm && ` of "${searchTerm}"`} found in posts.
      </p>

      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <div key={post.id} className="post">
            <h2>{highlightText(post.title)}</h2>  
            <p>{post.date}</p>
 
            {post.content && (
              <p>
                {highlightText(post.content)}  
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
};

export default Search;
