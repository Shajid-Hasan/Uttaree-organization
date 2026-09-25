import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContentProvider } from './lib/content';
import SiteLayout from './components/layout/SiteLayout';
import Home from './pages/Home';
import About from './pages/About';
import Companies from './pages/Companies';
import Company from './pages/Company';
import News from './pages/News';
import Article from './pages/Article';
import Contact from './pages/Contact';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import LegacyProjectRedirect from './pages/LegacyProjectRedirect';

export default function App() {
  return (
    <ContentProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/go/:slug" element={<Landing />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/companies/:slug" element={<Company />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:slug" element={<Article />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:id" element={<LegacyProjectRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  );
}
