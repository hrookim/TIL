import React from 'react';
import { useState } from 'react';
import './Hashtags.css';

function Hashtags(props) {
  const hashtag = [
      {
          title: '# 10대',
          isClicked: false,
          className: 'hashtag'
      },
      {
          title: '# 20대',
          isClicked: false,
          className: 'hashtag'
      },
      {
          title: '# 30대',
          isClicked: false,
          className: 'hashtag'
      },
      {
          title: '# 40대',
          isClicked: false,
          className: 'hashtag'
      },
      {
          title: '# 50대',
          isClicked: false,
          className: 'hashtag'
      }
  ]
  const [hashtags, setHashtags] = useState(hashtag)

  const clickHashtag = i => {
    const newHashtags = hashtags.map((item, idx) => {
      if (i === idx) {
        item.isClicked = !item.isClicked
        if (item.isClicked === true) {
          item.className = "hashtag-selected"
        } else {
          item.className = "hashtag"
        }
      } 
      return item
    })
    console.log("newHash", newHashtags)
    setHashtags(newHashtags)
  }

  return (
    <div className="container">
      {hashtags.map((item, idx) => {
        return (
          <>
            <button
              value={idx}
              // hashtag: 회색, hashtag selected: 빨강
              className={item.className}
              onClick={() => {clickHashtag(idx)}}
            >
              {item.title}
            </button>
          </>
        );
      })}
      <div className='hashtag'># 임의</div>
    </div>
  );
}

export default Hashtags;