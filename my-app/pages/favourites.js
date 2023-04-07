import React from 'react'
import { favouritesAtom } from '@/store'
import { useAtom } from 'jotai'
import { Card } from 'react-bootstrap'
import {Row, Col} from 'react-bootstrap'
import ArtworkCard from '@/components/ArtworkCard'

export default function favourites() {
  
  const[favouriteList,setFavouriteList] = useAtom(favouritesAtom)

  if(!favouriteList) return null;
  


    return (
    <>
    {favouriteList.length > 0 ? (
        <Row className="gy-4">
          {favouriteList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for something else.
          </Card.Body>
        </Card>
      )}
    </>
  )
}
