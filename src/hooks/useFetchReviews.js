import { useState, useEffect } from "react";

function useFetchReviews(productId) {
    const [reviews, serReviews] = useState([]);
    const [isReviewsLoading, setIsReviewsLoading] = useState(true);
    const [isReviewsError, setIsReviewsError] = useState(false);

    useEffect(() => {
        async function fetchReviews() {
            try {
                setIsReviewsLoading(true);
                const response = await fetch(`http://localhost:3000/reviews?productId=${productId}`);
                const json = await response.json();

                if (!response.ok) {
                    throw new Error();
                }

                serReviews(json);
                setIsReviewsLoading(false);
            } catch {
                setIsReviewsError(true);
                setIsReviewsLoading(false);
            }
        }

        fetchReviews();
    }, [productId])

    return {
        reviews,
        isReviewsLoading,
        isReviewsError
    }
}

export default useFetchReviews;
