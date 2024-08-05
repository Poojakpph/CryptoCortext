import { createContext, useEffect, useState } from "react";

export const CoinContext= createContext();

const CoinContextProvider=(props)=>{

    const [allCoin, setAllCoin]= useState([]);
    const [currency, setCurrency]=useState({
        name:"usd",
        symbol: "$"
    })

    const fetchAllCoin= async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-Rh89uEbGZCWN53567EctdX5W'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

    // note- whenever the currency gets updated , we have to add a new api request and for that we need to call useeffect function again

    // this gets executed once component gets loaded
    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const contextValue={
         allCoin, currency, setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )

}
export default CoinContextProvider;