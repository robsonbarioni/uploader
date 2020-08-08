import styled, { css } from "styled-components";

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5'
}

export const DropContainer = styled.div.attrs({ className: "dropzone" })`
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: height 0.2s easy;

    ${(props) => props.isDragActive && dragActive};
    ${(props) => props.isDragReject && dragReject};
`;

export const UploadMessage = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    color: ${props=> messageColors[props.type ||'default']};
`;
