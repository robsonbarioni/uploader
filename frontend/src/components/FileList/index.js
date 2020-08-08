import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from "react-icons/md";
import { Container, FileInfo, Preview } from "./style";

export default FileList = ({ files, onDelete }) => (
    <Container>
        {files.map((f) => (
            <li key={f.id}>
                <FileInfo>
                    <Preview src={f.preview} />
                    <div>
                        <strong>{f.name}</strong>
                        <span>
                            {f.readableSize}
                            {f.url && (<button onClick={() => onDelete(f.id)}>Excluir</button>)}
                        </span>
                    </div>
                </FileInfo>

                <div>
                    {!f.uploaded && !f.error && (
                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: "#7159c1" },
                            }}
                            strokeWidth={10}
                            value={f.progress}
                        />
                    )}

                    {f.url && (
                        <a
                            href={f.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink
                                style={{ marginRight: 8 }}
                                size={24}
                                color="#222"
                            />
                        </a>
                    )}

                    {f.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}

                    {f.error && <MdError size={24} color="#e57878" />}
                </div>
            </li>
        ))}
    </Container>
);
