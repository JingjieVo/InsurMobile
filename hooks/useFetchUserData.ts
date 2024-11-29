import { useEffect, useState } from "react";

export const useFetchUserData = (fetchUserInfo: () => Promise<UserData | null>) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                const userData = await fetchUserInfo();
                if (userData) {
                    setUser(userData);
                }
            } catch (err: any) {
                setError(err.message || 'Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [fetchUserInfo]);

    return { user, loading, error };
};