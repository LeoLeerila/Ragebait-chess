import { useState, useEffect } from "react";

//modular fetch data
//url IS nesessary, method default is GET
const UseFetchData = async (url, method = "GET", body = null) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            let res
            try {
                //if method is GET it does the GET, very self-explanatory
                if (method === "GET") {
                    const res = await fetch(url);
                }else{
                    // here goes every other method, body is nesessary here
                    const res = await fetch(url, {
                        method:method,
                        body:JSON.stringify(body),
                        headers:{'Content-Type': 'application/json',},
                    });}
                //error error error error
                if(!res.ok){
                    throw new Error("Network response was not ok");
                }
                const result = await res.json();
                setData(result);
                setError(null);
                
            } catch {
                setError(err.message);
                setData(null);  
            } finally {
                setLoading(false);
            }   
        }
        fetchData();
    }, [url, method, body])
    return { data, loading, error };
};

export default UseFetchData;