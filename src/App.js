import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { useToggle } from "react-use";
import styled from "@emotion/styled";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

const Ul = styled.ul`
  list-style: none;
  text-align: left;
`;

const Li = styled.li``;

const CustomLink = styled(Link)`
  color: #b4b4b4;
  text-decoration: none;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div
              style={{
                height: "100%",
                width: "100%"
              }}
            >
              <Navi />
              <Switch>
                <Route exact path="/" component={Container} />
                <Route exact path="/first" component={Container} />
                {/* <Route
                exact
                path={["/second/:route/:item_id", "/second/:route", "/second"]}
                component={Nested}
              /> */}
                <Route
                  exact
                  path={"/second/:route/:item_id"}
                  component={Nested}
                />
                <Route exact path={"/second/:route"} component={Nested} />
                <Route exact path={"/second"} component={Nested} />
                <Route exact component={NotFound} />
              </Switch>
            </div>
          </Router>
        </header>
      </div>
    );
  }
}

const Nested = ({ match }) => {
  return (
    <Body
      style={{
        border: "10px solid lightblue"
      }}
    >
      <div>{match.url}</div>
      <div>{JSON.stringify(match.params)}</div>
      <Switch>
        <Route exact path={`/second/:route`} component={Container} />
        <Route exact path={`/second/item`} component={Container} />
        <Route exact path={`/second/item/:item_id`} component={DContainer} />
        <Route exact component={InnerNotFound} />
      </Switch>
    </Body>
  );
};

const Navi = () => {
  const [on, toggle] = useToggle();
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: 400,
        background: "#ffffff",
        transform: `translateX(-${on ? 0 : 350}px)`,
        transition: "transform 500ms"
      }}
    >
      <button
        onClick={() => toggle()}
        style={{
          fontSize: 20,
          color: "#b4b4b4",
          width: 50,
          height: 50,
          transform: "translateX(350px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          outline: "none"
        }}
      >
        X
      </button>
      <Ul>
        <Li>
          <CustomLink to="/">Home</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/first">first</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/second">Nested</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/second/route">Nested/Route</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/second/item">Nested/Item</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/second/item/111">Nested/Item/Id</CustomLink>
        </Li>
        <Li>
          <CustomLink to="/testestest">NotFound</CustomLink>
        </Li>
      </Ul>
    </div>
  );
};

const Container = ({ match }) => {
  return (
    <Body
      style={{
        border: "10px solid #fff"
      }}
    >
      <div>{match.url}</div>
      <div>{JSON.stringify(match.params)}</div>
    </Body>
  );
};

const DContainer = ({ match }) => {
  return (
    <Body
      style={{
        border: "10px solid pink"
      }}
    >
      <div>{JSON.stringify(match.params)}</div>
      <Container match={match} />
    </Body>
  );
};

const InnerNotFound = () => {
  return <Body>Inner NotFound</Body>;
};

const NotFound = () => {
  return <Body>NotFound</Body>;
};

export default App;
