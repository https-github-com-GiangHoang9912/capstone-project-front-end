import "./home.css";
import Header from "../common/header/header";
import Footer from "../common/footer/footer";
import Constant from "../const.json";
import React, { Component } from "react";
import axios from "axios";

interface IState {
  name?: string;
}

interface IProps {
}

class HomePage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      name: ''
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-home">
          <Header />
          <div className="home">{this.state.name}</div>
          <Footer />
        </div>
      </React.Fragment>
    );
  }

  async componentDidMount() {
    const url = "/student";
    const response = await axios.get(Constant.BASE_URL + url)
    this.setState({name: response.data.name});
  }
}

export default HomePage;