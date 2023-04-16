import { NewsArticle } from '@/models/NewsArticles';
import { Card } from 'react-bootstrap';
import placeholderImage from "@/assets/images/newsarticle_placeholder.avif";
import Image from 'next/image';

interface NewsArticleEntryProps {
  article: NewsArticle
}
 
const NewsArticleEntry = ({ article: { title, description, url, urlToImage}}: NewsArticleEntryProps) => {

  const validImageUrl = (urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")) ? urlToImage : undefined;

  return ( 
    <a href={url}>
      <Card className='h-100'>
        <Image
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt='News Article Image'
          className='card-img-top'
          style={{ objectFit: 'cover'}} 
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
   );
}
 
export default NewsArticleEntry;