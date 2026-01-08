import { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { db } from '../firebase.config';
import { ASSETS as MOCK_ASSETS } from '../data/mockData';

export const useAssets = () => {
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const updateAsset = async (id, data) => {
        try {
            const assetRef = ref(db, `assets/${id}`);
            await update(assetRef, data);
        } catch (err) {
            console.error("Error updating asset:", err);
            throw err;
        }
    };

    useEffect(() => {
        const assetsRef = ref(db, 'assets');

        const unsubscribe = onValue(assetsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Convert object to array if needed, or just use as is.
                // Our mock data is an array, but Firebase returns an object/array depending on keys.
                // If keys are indices (0, 1, 2), it's an array. If keys are IDs (W-01, etc), it's an object.
                // Let's robustly handle object-to-array conversion.
                const assetsArray = Array.isArray(data)
                    ? data
                    : Object.keys(data).map(key => ({ ...data[key], firebaseId: key }));

                setAssets(assetsArray);
            } else {
                setAssets([]); // No data found
            }
            setLoading(false);
        }, (error) => {
            console.error("Firebase fetch error:", error);
            setError(error);
            setAssets(MOCK_ASSETS); // Fallback to mock data on error
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { assets, loading, error, updateAsset };
};
