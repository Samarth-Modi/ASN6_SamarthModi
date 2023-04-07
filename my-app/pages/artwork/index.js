/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Samarth Modi Student ID: 133357202 Date: 7TH April 2023
*
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/ 

import React from 'react'
import {useState, useEffect} from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { Row, Col, Pagination } from 'react-bootstrap'
import Error from 'next/error';
import ArtworkCard from '@/components/ArtworkCard'
import {Card} from 'react-bootstrap';
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12;

export default function Index() {

    const [artworkList,setarkWorkList] = useState();
    const [page,setPage] = useState(1);

    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const {data,error} = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`)

    function previousPage()
    {
        if(page > 1)
        {
            setPage(page-1);
        }
    }

    function nextPage()
    {
        if(page <  artworkList.length){
        setPage(page+1);
        }
    }

     useEffect(()=>
    {
      if(data)
      {
        const results = [];
        for(let i = 0; i < data ?.objectIDs?.length; i += PER_PAGE)
        {
          const chunk = data?.objectIDs.slice(i,i+PER_PAGE);
          results.push(chunk);
        }
        setarkWorkList(results)
        setPage(1);
    
        let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));

        for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
          const chunk = filteredResults.slice(i, i + PER_PAGE);
          results.push(chunk);
         }

      }
    },[data]); 


    if(error)
    {
      return <Error statusCode={404} />;
    }

    if(!artworkList)
    {
      return null;
    }


  return (
    <>
     {artworkList.length > 0 ? (
        <Row className="gy-4">
          {artworkList[page - 1].map((currentObjectID) => (
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

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </>
  )
}
