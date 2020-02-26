
/* @flow */
import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'antd'
import './SearchResultsCard.css';

type Props = {
  name: number,
  date: string,
  vote: number,
  image: number,
  id: number
}

const SearchResultCard = ({ name, date, vote, image, id }: Props) => (
  <Link to={`/documents/${id}`}>
    <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
      <div className='custom-image'>
      </div>
      <div className='custom-card'>
        <h3>{name}</h3>
        <p>{`Date: ${date} || Votes: ${vote}`}</p>
      </div>
    </Card>
  </Link>
)

export default SearchResultCard