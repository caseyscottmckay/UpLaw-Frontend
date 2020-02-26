import React, { Component } from 'react'
import SearchResultCard from './SearchResultCard'
import { Row, Col } from 'antd'
import uuidv4 from 'uuid/v4'
import './ShowResults.css'
import axios from "axios";

export default class ShowResults extends Component {
  constructor (props) {
    super(props)
    this.state = {
      results: []
    }
  }

  handleApiCall (props) {
    let query = props.match.params.query
       //let searchUrl = `http://localhost:8080/api/documents?query=a`;
    let searchUrl = `http://localhost:8080/api/documents?query=${query}`;
    axios.get(searchUrl)
      .then(response => {
        const state = Object.assign({}, this.state);
        state.documents = response.data;
        this.setState(state);

        this.setState({
          results: response.data
        })
        console.log(response.data)

      }).catch((error) => {
      if (axios.isCancel(error) || error) {
        this.setState({
          loading: false,
          message: 'Failed to fetch results.Please check network',
        });
      }
    }).catch(error => {
      console.error('Error path:', error.response);
    });
  }

  componentWillReceiveProps (nextProps) {
    this.handleApiCall(nextProps)
  }

  componentDidMount () {
    this.handleApiCall(this.props)
  }

  render () {
    if (!this.state.documents){
      return <div></div>
    }

    return (

      <div>
       Search results for {this.props.match.params.query}
        <Row>
          <Col span={12} offset={6}>
            <h1 className='title'>{ this.props.currentPage } </h1>
          </Col>
        </Row>

        <Row gutter={24}>
          {

            this.state.results.map(result => {
              return (
                <Col className='gutter-row' span={5} offset={1} key={uuidv4()}>
                  <SearchResultCard
                    name={result.title}
                    date={result.release_date}
                    vote={result.vote_average}
                    image={result.poster_path}
                    id={result.id}
                  />
                </Col>
              )
            })
          }
        </Row>


      </div>
    )
  }
}