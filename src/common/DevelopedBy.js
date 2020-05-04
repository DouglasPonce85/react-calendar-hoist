import React from 'react';
import styled from 'styled-components';

const DevelopedBy = ({ author, linkedinUrl, githubUrl }) => {
    return (
        <DevelopedByWrapper>
            <ImageProfile>
                <img src="https://avatars3.githubusercontent.com/u/9808065?s=460&u=cb6218af0ae7a598afdff1b4ddfe4fde41a2992c&v=4" alt="" />
            </ImageProfile>
            <AuthorInfo>
                <div className="author">
                    <span>Developed by {author}</span>
                </div>
                <div className="contact-links">
                    <a href={linkedinUrl}>
                        <i className="fa fa-linkedin-square" aria-hidden="true" />
                    </a>
                    <a href={githubUrl}>
                        <i className="fa fa-github" aria-hidden="true" />
                    </a>
                </div>
            </AuthorInfo>
        </DevelopedByWrapper>
    );
};

const DevelopedByWrapper = styled.div`
    width: 30%;
    top: 5px;
    border: none !important;
    display: grid;
    justify-content: space-evenly;
    font-size: 12px;
    font-weight: 400 !important;
    color: #a5e6ff;
    margin: 0 auto;
`;

const ImageProfile = styled.div`
    margin: 0 auto;

    img {
        width: 85px;
        height: 85px;
        border-radius: 60px;
    }    
`;

const AuthorInfo = styled.div`
    display: grid;
    height: 50px;
    padding-top: 10px;
    font-style: italic;

    a {
        text-decoration: none;
        color: #a5e6ff;
        cursor: pointer;
    }

    .contact-links {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        text-decoration: none;

        .fa {
            margin-right: 10px !important;
            font-size: 20px;
        }
    }
`;

export default DevelopedBy;