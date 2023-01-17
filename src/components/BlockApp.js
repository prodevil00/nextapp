import { useEffect } from 'react'

export default function BlockApp(){

  useEffect(() => {
    const prod = process.env.NODE_ENV === 'production'

    async function fetchCountryCode() {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if(['IN','BR', 'PH', 'TH'].includes(data.country_code) && window.location.pathname !== '/404'){
          window.location.replace('/404')
        }
      } catch (error) {
        console.error(error)
      }
    };
    if(prod){fetchCountryCode()}
  }, [])


    return null
}