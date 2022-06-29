import React, { Component } from "react";
import NewsItem from "./NewsItem";

export class News extends Component {
  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1
    }
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=1"
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({articles: parsedData.articles})
  }

  handleprevclick = async () =>{
    console.log("prev")

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page - 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })
  }

  handlenextclick = async () =>{
    console.log("Next")

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=2a9222d5c2334ded8e6f04d2571fc4e3&page=${this.state.page + 1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
    
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-4">NewsMokey - Top Headlines</h1>
        <div className="row gx-5">
          {this.state.articles.map((element)=>{
            return(
            <div className="col-md-4 my-5" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 52):""} description={element.description?element.description.slice(0, 95):""} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
            )
          })}
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handleprevclick}> &larr; Previous</button>
          <button className="btn btn-dark" onClick={this.handlenextclick}> &rarr; Next</button>
        </div>
      </div>
    );
  }
}

export default News;
