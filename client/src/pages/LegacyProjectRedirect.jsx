import { Navigate, useParams } from 'react-router-dom';

const legacy = {
  '1': 'uttaree-electronics',
  '2': 'uttaree-agro',
  '3': 'uttaree-art-school',
};

export default function LegacyProjectRedirect() {
  const { id } = useParams();
  const slug = legacy[id];
  if (!slug) return <Navigate to="/companies" replace />;
  return <Navigate to={`/companies/${slug}`} replace />;
}
