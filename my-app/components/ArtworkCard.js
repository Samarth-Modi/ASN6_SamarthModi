import {Card, Button} from "react-bootstrap"
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'



export default function ArtworkCard({objectID}) {

    
    const {data,error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`)

    if(error)
    {
        return <Error statusCode={404}/>
    }
    
    if(!data)
    {
        return null
    }
    
    const { primaryImageSmall, title, objectDate, classification, medium } = data;
    
    const imageUrl = primaryImageSmall
    ? primaryImageSmall
    : 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';
    const imageAlt = title ? title: 'N/A';
    const objectDateText = objectDate ? objectDate : 'N/A';
    const classificationText = classification ? classification : 'N/A';
    const mediumText = medium ? medium : 'N/A';

  return (
    <>
      <Card>
        <Card.Img variant="top" src={imageUrl} alt={imageAlt} />
        <Card.Body>
        <Card.Text>
            <strong>Date:</strong> {objectDateText}
            <br/>
            <strong>classification:</strong> {classificationText}
            <br/>
            <strong>Medium:</strong> {mediumText}
        </Card.Text>
        <Link href={`/artwork/${objectID}`} passHref>
            <Button variant="primary">{objectID}</Button>
        </Link>
        </Card.Body>
      </Card>
    </>
  );
};