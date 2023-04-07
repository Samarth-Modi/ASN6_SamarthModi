import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Navbar, Nav, Form, Button, NavDropdown } from "react-bootstrap";
import Link from "next/link";
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  const token = readToken();

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await router.push(`/artwork?title=true&q=${searchField}`);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    setIsExpanded(false);
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  }

  const handleNavClick = () => {
    setIsExpanded(false);
  }

  const logout = () => {
    setIsExpanded(false);
    removeToken();
    router.push('/login');
  }

  return (
    <>
      <Navbar bg="light" expand="lg" className="fixed-top" expanded={isExpanded}>
        <Container>
          <Navbar.Brand>Samarth Modi</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" onClick={handleNavClick}>
              <Link href="/" passHref legacyBehavior>
                <Nav.Link active={router.pathname === "/search"}>Home</Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/search"}>Advanced Search</Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={handleSubmit}>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
              </Form>
            )}
            <Nav className="ms-auto" bg='dark'>
              {token ? (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href='/favourites' passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/favourites"}>Favourites</NavDropdown.Item>
                  </Link>
                  <Link href='/history' passHref legacyBehavior>
                    <NavDropdown.Item active={router.pathname === "/history"}>Search History</NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/register"} onClick={() => setIsExpanded(false)}>Register</Nav.Link>
                </Link>
              )}
              {!token && (
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link active={router.pathname === "/login"} onClick={() => setIsExpanded(false)}>Login</Nav.Link>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
