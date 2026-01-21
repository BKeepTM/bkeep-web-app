import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Typography } from '@mui/material';

export default function ImageUploader({ onFilesChange }) {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    const mappedFiles = acceptedFiles.map(file =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
      setFiles(mappedFiles);
      if (onFilesChange) {
        onFilesChange(mappedFiles); 
      }
    }, [onFilesChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  return (
    <div>
      {/* Drag & Drop box */}
      <div
        {...getRootProps()}
        style={{
          border: '2px dashed gray',
          padding: 30,
          height: 250,
          textAlign: 'center',
          backgroundColor: isDragActive ? '#f0f0f0' : 'transparent',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          {isDragActive ? 'Spusti sliko tukaj...' : 'Naloži ali povleci sliko za analizo'}
        </Typography>
        <Button variant="outlined" sx={{ color: 'black', borderColor: 'black', mb: 4, width: '30%' }}>Prebrskaj</Button>
      </div>

      {/* Preview slik pod uploaderjem */}
      {files.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 15,
            marginTop: 20,
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
          }}
        >
          {files.map(file => (
            <div key={file.name} style={{ textAlign: 'center' }}>
              <img
                src={file.preview}
                alt={file.name}
                width={250} 
                style={{
                  borderRadius: 12,
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  objectFit: 'cover',
                }}
              />
              <Typography variant="caption">{file.name}</Typography>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
