import React, {useEffect, useState} from 'react';
import axios from 'axios';
import proxyUrl from './routes';
import './App.css'
import _ from 'lodash'
import Button from "./components/Button";
import Rate from "./components/Rate";

const key = 'a0d58e37b8708821102ec9559119d2cf'
const proxy = 'https://fathomless-plateau-00447.herokuapp.com/'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [symbols, setSymbols] = useState([])
  const [rates, setRates] = useState([])
  const [showCurrency, setShowCurrency] = useState(false)
  const [currencyId, setCurrencyId] = useState([])
  const [flag, setFlag] = useState({})
  const [currentFlag, setCurrentFlag] = useState({})
  const [isFlagReceived, setIsFlagReceived] = useState(false)

  const handleClick = (id) => {
    setShowCurrency(true)
    setCurrencyId(id)
    getCurrentFlag(id[0])
  }

  useEffect(() => {
    const loadRates = async () => {
      setLoading(true);

      const responseRates = await axios.get(proxyUrl(key, 'latest'))
      await setRates(responseRates.data.rates)

      const responseSymbols = await axios.get(proxyUrl(key, 'symbols'))
      await setSymbols(responseSymbols.data.symbols)

      const responseFlag = await axios.get(`${proxy}http://country.io/currency.json`)
      await setFlag(responseFlag.data)

      setLoading(false);
    }
    loadRates()
  }, []);

  const rate = rates[currencyId[0]]

const getCurrentFlag = async (code) => {
  let currentFlagCode = _.findKey(flag, (val) => val === code);
  currentFlagCode = currentFlagCode || 'ru'
  const responseCurrentFlag = await axios.get(
    `https://flagcdn.com/60x45/${currentFlagCode.toLowerCase()}.png`,
    {responseType: 'blob'})
  await setCurrentFlag(responseCurrentFlag.data)
  setIsFlagReceived(true)
}

  return (
    <>
      <div className='app-wrapper'>
        {loading ? (
          <h4>Loading...</h4>) :
          <Button symbols={symbols} showCurrency={handleClick}/>
        }
      </div>
      {showCurrency && isFlagReceived ? <div>{<Rate id={currencyId} rate={rate} flag={currentFlag}/>}</div> : null}
    </>
  )
}

export default App;
