/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Samarth Modi Student ID: 1333572302 Date: 7TH April 2023
*
* Vercel App (Deployed) Link: https://asn-6-samarth-modi-2gjz0gjcd-samarth-modi.vercel.app/
*
********************************************************************************/

import { Container, Row, Col, Image } from 'react-bootstrap';
import styles from '@/styles/History.module.css';

function Home() {
  return (
    <Container>
      <Row>
        <Col md={12}>
          <Image fluid rounded src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" alt="The Metropolitan Museum of Art" />
        </Col>
        <Col md={12}>
          <p>The Metropolitan Museum of Art, colloquially known as the Met, is located in New York City and is the largest art museum in the United States. With a collection of over 2 million works, it is also one of the most comprehensive art museums in the world.</p>
          <p>The museum was founded in 1870 by a group of American citizens who wanted to create a museum to rival the great European museums. Today, the Mets collection includes everything from ancient Egyptian artifacts to contemporary art, with highlights including works by Rembrandt, Vermeer, Van Gogh, and Picasso.</p>
          <p>If youre interested in learning more about the Met, check out the link below.... </p> <br/>
          <button className={styles.historyListItem}>
          <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
          </button>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;