import { useUser } from '../lib/user-hooks';
import Layout from '../components/layout/layout';
import BookCatalogPage from './book-catalog-page';

export function Index() {
  const user = useUser({redirectTo: '/login-page', redirectIfFound: false});

  return (
    <Layout>
      {user && <BookCatalogPage></BookCatalogPage>}
    </Layout>
  );
}

export default Index;
