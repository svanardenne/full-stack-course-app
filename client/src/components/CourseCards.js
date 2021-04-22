import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const CardContainer = styled.div`
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const CourseCards = (props) => {
  return (
    <CardContainer className="grid-33">
      <Link className="course--module course--link" to={`/courses/${props.id}`}>
        <h4 className="course--label">Course</h4>
        <h3 className="course--title">{props.title}</h3>
      </Link>
    </CardContainer>
  );
};

export default CourseCards;
