import { useState } from "react";

//modular fetch player info but better
// at first like this const {fetchData, isLoading, error} = useFetchBetter(`http://localhost:4000/api`)
//after in the event handler the other part
function useFetchBetter(url) {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // do this for example: const playerData = await fetchData('/player/'+PlayerId)
    // GET is default if nothing added, body is also null by default and token is null by default
    // fetchData(url, method, token, body)
    // this is already has /api , with second url you add other part for example /player/
    const fetchData = async (id, method="GET", token=null, body=null) => {
        const urlid = url + id
        if(body !== null){
            body = JSON.stringify(body)
        }
        try {
            const response = await fetch(urlid, {
                method:method,
                headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                body:body,
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error);
                setIsLoading(false);
                return null;
            }
            setIsLoading(false);
            return data;
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
            return null;
        }
    };
    return {fetchData, isLoading, error}
};

export default useFetchBetter;