import React, { Component } from "react";
import api from "./services/api";
import Upload from "./components/Upload";
import FileList from "./components/FileList";
import GlobalStyle from "./styles/global";
import filesize from "filesize";
import { uniqueId } from "lodash";
import { Container, Content } from "./styles/style";

class App extends Component {
    state = {
        uploadedFiles: [],
    };

    async componentDidMount() {
        const response = await api.get('/');

        this.setState({
            uploadedFiles: response.data.map(f => ({
                id: f._id,
                name: f.name,
                readableSize: filesize(f.size),
                preview: f.url,
                uploaded:true,
                url: f.url
            }))
        })
    }

    componentWillUnmount() {
        this.state.uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
    }

    handleUpload = (files) => {
        const uploadedFiles = files.map((file) => ({
            file,
            id: uniqueId(),
            name: file.name,
            readableSize: filesize(file.size),
            preview: URL.createObjectURL(file),
            progress: 0,
            uploaded: false,
            error: false,
            url: null,
        }));

        this.setState({
            uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
        });

        uploadedFiles.forEach(this.processUpload);
    };

    handleDelete = async id => {
        await api.delete(`/${id}`);

        this.setState({
            uploadedFiles: this.state.uploadedFiles.filter((f) => id !== f.id)
        })
    }

    updateFile = (id, data) => {
        this.setState({
            uploadedFiles: this.state.uploadedFiles.map((f) =>
                id === f.id ? { ...f, ...data } : f
            ),
        });
    };

    processUpload = (item) => {
        const data = new FormData();

        data.append("file", item.file, item.name);
        api.post("/", data, {
            onUploadProgress: (e) => {
                const progress = parseInt(
                    Math.round((e.loaded * 100) / e.total)
                );
                this.updateFile(item.id, { progress });
            },
        })
            .then((res) => {
                this.updateFile(item.id, {
                    uploaded: true,
                    id: res.data._id,
                    url: res.data.url,
                });
            })
            .catch(() => {
                this.updateFile(item.id, {
                    error: true,
                });
            });
    };

    render() {
        const { uploadedFiles } = this.state;

        return (
            <Container>
                <Content>
                    <Upload onUpload={this.handleUpload} />
                    {!!uploadedFiles.length && (
                        <FileList files={uploadedFiles} onDelete={this.handleDelete} />
                    )}
                </Content>
                <GlobalStyle />
            </Container>
        );
    }
}

export default App;
