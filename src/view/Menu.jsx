import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import '../App.css';

function Menu(params) {
  return (
    <div>
      <Navbar bg= "dark" variant="dark">
          <Navbar.Brand >
              <span className="logo">InvestTech</span>
          </Navbar.Brand>
          <Nav>
              <NavDropdown title="Fundos" >
                  <NavDropdown.Item href="/funds/register">Cadastrar Fundo</NavDropdown.Item>
                  <NavDropdown.Item href="/funds/query" >Consultar Fundos Cadastrados</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/wallet" >Portfólio</Nav.Link>
              <Nav.Link href="/cash_transactions" >Gerenciar Caixas</Nav.Link>
              <Nav.Link href="/security_transactions" >Gerenciar Ativos</Nav.Link>
              <Nav.Link href="/blockchain_query" >Blockchain</Nav.Link>
          </Nav>
      </Navbar>
    </div>
  );
}

export default Menu;
