import useSWR from 'swr'
import { Card, Button } from 'react-bootstrap'
import Link from 'next/link'
import Error from 'next/error'
import { useAtom } from 'jotai'
import { favouritesAtom } from '@/store'
import { useEffect, useState } from 'react'
import { addToFavourites, removeFromFavourites } from '@/lib/userData'

const fetcher = (url) => fetch(url).then((res) => res.json())

const ArtworkCardDetail = ({ objectID }) => {
  const { data, error } = useSWR( 
    objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`:null,
    fetcher
  )

  const [favouriteList,setFavouriteList] = useAtom(favouritesAtom)


  const[showAdded,setShowAdded] = useState(false); 

  //Add a "showAdded" value to the state (this will control how the button (defined below) is displayed) with a
  //default value of true if the "favouritesList" includes the objectID (passed in "props") and false if it does not
  useEffect(()=>{
    setShowAdded(favouriteList?.includes(objectID))
   }, [favouriteList])
   
  //favouritesClicked function
  async function favouritesClicked() 
  {
    if(showAdded == true)
    {
    setFavouriteList(await removeFromFavourites(objectID))
     /* setFavouriteList(current => current.filter(fav => fav != objectID)); */
    /* setShowAdded(false); */
    }
    else
    {
      setFavouriteList(await addToFavourites(objectID))
      /* 
      setFavouriteList(current => [...current,objectID]); */
     /*  setShowAdded(true); */
    }
  }

  if (error) {
    return <Error statusCode={404} />
  }

  if (!data) {
    return null
  }

  const {
    primaryImage,
    title,
    objectDate,
    classification,
    medium,
    artistDisplayName,
    artistWikidata_URL,
    creditLine,
    dimensions,
  } = data

  return (
    <Card>
      {primaryImage && (
        <Card.Img variant="top" src={primaryImage} />
      )}
      <Card.Body>
        <Card.Title>{title || 'N/A'}</Card.Title>
        <Card.Text>
          Object Date: {objectDate || 'N/A'}
          <br />
          Classification: {classification || 'N/A'}
          <br />
          Medium: {medium || 'N/A'}
          <br />
          <br />
          Artist: {artistDisplayName || 'N/A'}
          {artistWikidata_URL && (
            <a href={artistWikidata_URL} target="_blank" rel="noreferrer">
              wiki
            </a>
          )}
          <br />
          Credit Line: {creditLine || 'N/A'}
          <br />
          Dimensions: {dimensions || 'N/A'}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
          <Button variant="primary">{objectID}</Button>
        </Link>
        <br/>
        <br/>
        <Button variant ={showAdded ?'primary':'outline-primary'} onClick = {favouritesClicked}>
          {showAdded ? '- Favourite(added)':'+Favourite'}
        </Button >
        <br/>
      </Card.Body>
    </Card>
  )
}

export default ArtworkCardDetail
