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
                  <NavDropdown.Item href="/funds/query" >Consultar Fundo</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/funds/wallet" >Portfólio</Nav.Link>
              <NavDropdown title="Transações de Caixa" >
                  <NavDropdown.Item href="/cash_transactions">Consultar Transações de Caixa</NavDropdown.Item>
                  <NavDropdown.Item href="/entries" >Gerenciar Transações de Caixa</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/security_transactions" >Gerenciar Ativos</Nav.Link>
              <Nav.Link href="/blockchain_query" >Blockchain</Nav.Link>
          </Nav>
      </Navbar>
    </div>
  );
}

export default Menu;
