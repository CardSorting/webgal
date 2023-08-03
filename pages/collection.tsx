import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from '../styles/collection.module.css';

interface CollectionItem {
  itemId: string;
  imageUrl: string;
  prompt: string;
  rarity: string;
  creditPrice: number;
  favorite: boolean;
}

const CollectionPage = ({ userId }: { userId: string }) => {
  const [collection, setCollection] = useState<CollectionItem[] | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const getCollection = async (newPage: number) => {
    try {
      const res = await axios.get(`/api/collection?userId=${userId}&page=${newPage}&limit=${itemsPerPage}`);
      setCollection(res.data);
      setPage(newPage);
    } catch (err) {
      console.error('Error fetching collection:', err.message);
    }
  };

  useEffect(() => {
    getCollection(page);
  }, [userId]);

  return (
    <div className={styles.collectionContainer}>
      <h1>User Collection</h1>
      {collection ? (
        collection.map((item, index) => (
          <div key={item.itemId} className={styles.collectionItem}>
            <img src={item.imageUrl} alt={item.prompt} className={styles.image} />
            <div className={styles.details}>
              <p>{item.prompt}</p>
              <p>Rarity: {item.rarity}</p>
              <p>Price: {item.creditPrice}</p>
              {item.favorite && <p>Favorite!</p>}
            </div>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
      <div className={styles.pagination}>
        <button onClick={() => getCollection(page - 1)} disabled={page === 1} className={styles.pageButton}>
          Previous page
        </button>
        <button onClick={() => getCollection(page + 1)} disabled={page === 10} className={styles.pageButton}>
          Next page
        </button>
      </div>
    </div>
  );
};

export default CollectionPage;