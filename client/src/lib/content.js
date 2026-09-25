import { createContext, createElement, useContext, useEffect, useState } from 'react';
import site from '@content/site.json';
import projectsFile from '@content/projects.json';
import newsFile from '@content/news.json';
import landingsFile from '@content/landings.json';

export const localContent = {
  site,
  projects: projectsFile.projects,
  articles: newsFile.articles,
  landings: landingsFile.landings.filter((item) => item.active !== false),
};

const ContentContext = createContext(localContent);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(localContent);

  useEffect(() => {
    let ignore = false;
    fetch('/api/content')
      .then((response) => {
        if (!response.ok) throw new Error('content');
        return response.json();
      })
      .then((data) => {
        if (!ignore && data?.site && Array.isArray(data.projects)) setContent(data);
      })
      .catch(() => {});
    return () => {
      ignore = true;
    };
  }, []);

  return createElement(ContentContext.Provider, { value: content }, children);
}

export function useContent() {
  return useContext(ContentContext);
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(iso));
}
