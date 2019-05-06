import React, { Component } from "react";
import styled from "styled-components";
import numeral from "numeral";
import { confetti } from "dom-confetti";

const StyledDiv = styled.div``;

const MovieUnit = styled.div`
  display: flex;
  flex-direction: column;
  background-image: ${props =>
    props.backgroundImage
      ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${
          props.backgroundImage
        })`
      : ""};
  background-position: 50% 50%;
  background-size: cover;
  padding: 2rem;
  transition: 0.25s;
  &:hover {
    padding-top: 10rem;
    padding-bottom: 10rem;
    > div.sub-introduce {
      display: flex;
      flex-direction: column;
    }
    > div.like-button {
      display: flex;
      justify-content: center;
    }
  }
  > span.title {
    font-size: 3.5rem;
    color: #e4e4e4;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  > div.genre {
    display: flex;
    margin-bottom: 1rem;

    > span {
      margin-right: 1rem;
      font-size: 1rem;
      color: #f5f5f5;
    }
  }
  > span.sub {
    font-size: 2rem;
    color: #f5f5f5;
    margin-bottom: 1rem;
    cursor: pointer;
  }
  > div.sub-introduce {
    display: none;
    padding-top: 2rem;
    transition: 0.25s;

    > span {
      color: white;
      line-height: 1.5;
      font-size: 1.5rem;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
    }
  }
  > div.sub-introduce {
    display: none;
    padding-top: 2rem;
    transition: 0.25s;

    > span {
      color: white;
      line-height: 1.5;
      font-size: 1.5rem;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
    }
  }
  > div.like-button {
    display: none;
    padding-top: 4rem;

    > span {
      width: 100px;
      height: 100px;
      cursor: pointer;
      background-image: ${props =>
        props.likeImage
          ? `linear-gradient(rgba(245, 245, 245, 0), rgba(245, 245, 245, 0)), url(${
              props.likeImage
            })`
          : ""};
      background-position: 50% 50%;
      background-size: cover;
    }
  }
`;

class MovieList extends Component {
  domconfettiRefs = this.props.movieData.map(() => React.createRef());

  showParadise = idx => {
    confetti(this.domconfettiRefs[idx].current);
  };

  goToSpecificMove = name => {
    this.props.history.push(`${name}`);
  };

  render() {
    const renderSubIntro = subIntro => {
      const splited = subIntro.split("\n");
      return splited.map((intro, idx) => {
        return <span key={idx}>{intro}</span>;
      });
    };
    const renderGenre = genres => {
      return genres.map((genre, idx) => {
        return <span key={idx}>{genre}</span>;
      });
    };
    const renderMovieData = movieDataArray => {
      return movieDataArray.map((movieUnit, idx) => {
        return (
          <MovieUnit backgroundImage={movieUnit.image} key={idx}>
            <span
              className="title"
              onClick={() => {
                this.goToSpecificMove(movieUnit.movieName);
              }}
            >
              {movieUnit.movieName}
            </span>
            <div className="genre">{renderGenre(movieUnit.genre)}</div>
            <span className="sub">
              {movieUnit.releaseDate == null
                ? "미개봉"
                : `${movieUnit.releaseDate} 개봉`}
            </span>
            {movieUnit.releaseDate != null && (
              <span className="sub">
                {`누적 관객 수: ${numeral(movieUnit.totalAudience).format(
                  "0,0"
                )}명 (${movieUnit.grade}/10)`}
              </span>
            )}
            <div className="sub-introduce">
              {renderSubIntro(movieUnit.subIntro)}
            </div>

            <div className="like-button">
              <span
                likeImage={movieUnit.image}
                ref={this.domconfettiRefs[idx]}
                onClick={() => {
                  this.showParadise(idx);
                }}
              />
            </div>
          </MovieUnit>
        );
      });
    };
    return <StyledDiv>{renderMovieData(this.props.movieData)}</StyledDiv>;
  }
}

export default MovieList;
