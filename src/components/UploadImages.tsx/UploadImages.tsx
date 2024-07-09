import React from 'react';
import IconButton from '@material-ui/core/IconButton';

import ImageIcon from '@material-ui/icons/ImageOutlined';

import { ImageObj } from '../AddTweetForm/AddTweetForm';
import { ImageList } from '../ImageList/ImageList';

interface UploadImageProps {
  images: ImageObj[];
  onChangeImages: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}
export const UploadImages: React.FC<UploadImageProps> = ({
  onChangeImages,
  images,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClickImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  const removeImage = (url: string) => {
    onChangeImages((prev) => prev.filter((obj) => obj.blobUrl !== url));
  };
  const handleChangeFileInput = React.useCallback((event: Event) => {
    if (event.target) {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fileObj = new Blob([file]);
        onChangeImages((prev) => [
          ...prev,
          {
            blobUrl: URL.createObjectURL(fileObj),
            file,
          },
        ]);
      }
    }
  }, []);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener('change', handleChangeFileInput);
    }
    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener('change', handleChangeFileInput);
      }
    };
  }, []);

  return (
    <div>
      <input ref={inputRef} type="file" id="upload-input" hidden />
      <IconButton onClick={handleClickImage} color="primary">
        <ImageIcon />
      </IconButton>
      <ImageList
        images={images.map((obj) => obj.blobUrl)}
        removeImage={removeImage}
      />
    </div>
  );
};
