const fs = require('fs');
const path = require('path');

const contentDir = path.join(__dirname, '..', '..', 'content');

const files = {
  site: 'site.json',
  projects: 'projects.json',
  news: 'news.json',
  landings: 'landings.json',
};

function readJson(name) {
  const filePath = path.join(contentDir, name);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function loadContent() {
  const site = readJson(files.site);
  const projects = readJson(files.projects).projects || [];
  const articles = readJson(files.news).articles || [];
  const landings = (readJson(files.landings).landings || []).filter((item) => item.active !== false);

  return { site, projects, articles, landings };
}

function publicContent() {
  const content = loadContent();
  return {
    site: content.site,
    projects: content.projects,
    articles: content.articles,
    landings: content.landings,
  };
}

module.exports = { loadContent, publicContent };
