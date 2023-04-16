import NewsArticlesGrid from '@/components/NewsArticleGrid';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { Alert } from 'react-bootstrap';

interface CategoryNewsPageProps {
  newsArticles: NewsArticle[];
}

//Different categories from the server but hard-coded
export const getStaticPaths: GetStaticPaths = async () => {
  const categorySlugs = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology"
  ];

  const paths = categorySlugs.map(slug => ({ params: { category: slug }}));

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryNewsPageProps> = async ({ params }) => {
  const category = params?.category?.toString();
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${process.env.NEWS_API_KEY}`)
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
    revalidate: 5 * 60,
  }
}

const CategoryNewsPage = ({ newsArticles }:CategoryNewsPageProps) => {
  const router = useRouter();
  const categoryName = router.query.category?.toString();

  const title = "Category: " + categoryName;

  return ( 
    <>
      <main>
        <h2 style={{textTransform:'capitalize'}}>{title}</h2>
        <Alert>
            This is page uses <strong>client-side data fetching</strong> to show fresh data for every search.
            Requests are handled by our backend via <strong>API routes</strong>.
        </Alert>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
   );
}
 
export default CategoryNewsPage;