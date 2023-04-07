import { useRouter } from 'next/router'
import React from 'react'
import { Row, Col,Button } from 'react-bootstrap';
import ArtworkCardDetail from '@/components/ArtworkCardDetail';

export default function objectID() {

    const router = useRouter();
    const {objectID} = router.query;

    return (
        <>
            <Row>
                <Col>
                    <ArtworkCardDetail objectID={objectID} />
                </Col>
            </Row>
        </>
    )
}
