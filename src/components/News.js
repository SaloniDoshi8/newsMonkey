import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false})
  }

  async componentDidMount(){
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({articles: parsedData.articles, 
    //   totalResults: parsedData.totalResults,
    //   loading: false})
    this.updateNews();
  }

  handleprevclick = async () =>{
    // console.log("prev")

    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading: false
    // })
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
  }

  handlenextclick = async () =>{
    // console.log("Next")

    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
    this.setState({
      page: this.state.page + 1
    })
    this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row gx-5">
          {!this.state.loading && this.state.articles.map((element)=>{
            return(
            <div className="col-md-4 my-5" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 52):""} description={element.description?element.description.slice(0, 95):""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            )
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprevclick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handlenextclick}> &rarr; Next</button>
        </div>
      </div>
    );
  }
}

export default News;
