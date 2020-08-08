import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from "./styles";

export default class Upload extends Component {
    renderDragMessage = (isActive, isReject) => {
        if (isReject)
            return (
                <UploadMessage type="error">
                    Arquivo não suportado
                </UploadMessage>
            );

        if (isActive)
            return (
                <UploadMessage type="success">Solte os arquivos</UploadMessage>
            );

        return <UploadMessage>Arraste os arquivos aqui</UploadMessage>;
    };

    render() {
        const {onUpload} = this.props;

        return (
            <Dropzone accept="image/*" onDropAccepted={onUpload}>
                {({
                    getRootProps,
                    getInputProps,
                    isDragActive,
                    isDragReject,
                }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {this.renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
        );
    }
}
