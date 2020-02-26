/*eslint-disable*/
import React, {Component} from 'react';
import axios from 'axios';
import {getDocument} from "../../util/APIUtils";


class Document extends Component {
  constructor(props) {
    super(props);
    this.state = {
      document: null,
      isLoading: false
    }
    this.loadDocument = this.loadDocument.bind(this);
  }

  loadDocument(documentId) {
    this.setState({
      isLoading: true
    });
    getDocument(documentId).then(response => {
      console.log(response)
      this.setState({
        document: response,
        isLoading: false
      });
    }).catch(error => {
      if (error.status === 404) {
        this.setState({
          serverError: true,
          isLoading: false
        });
      }
    });
  }


  componentDidMount() {
    const documentId = this.props.match.params.documentId;
    this.loadDocument(documentId);
  }

  componentDidUpdate(nextProps) {
    if (this.props.match.params.documentId !== nextProps.match.params.documentId) ;
  }

  render() {
    return (
      <div className="layout">
        {
          this.state.document ? (
            <div>
              {this.state.document.id}<br/>
              {this.state.document.title}<br/>
              {this.state.document.slug}<br/>
              {this.state.document.content}<br/>
            </div>
          ) : null}
      </div>
    );
  }
}

export default Document;