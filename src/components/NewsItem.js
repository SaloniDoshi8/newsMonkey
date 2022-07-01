import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props
    return (
    <div>
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left: '90%'}}>{source}</span>
            <img src={!imageUrl?"https://images.news18.com/ibnlive/uploads/2022/05/mars-nasa-165164724816x9.png":imageUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{!title?"News Title":title}...</h5>
                <p className="card-text">{!description?"News Description":description}...</p>
                <p className="card-text"><small className="text-muted">{!author?"Unkown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-success">Read More</a>
            </div>
        </div>
    </div>
    )
  }
}

export default NewsItem;
