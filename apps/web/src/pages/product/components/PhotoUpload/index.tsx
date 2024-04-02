import { memo, useState, useRef } from 'react';
import { Group, Button, Stack, BackgroundImage } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import cx from 'clsx';

import { productApi } from 'resources/product';

import { handleError } from 'utils';
import Image from '../../../../../public/images/photo_8924441.png';

import classes from './index.module.css';

const ONE_MB_IN_BYTES = 1048576;

const PhotoUpload = (props: { imageUrl:string | undefined, setImageUrl: any }) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const targetZone = useRef(null);
  const { imageUrl, setImageUrl } = props;

  const { mutate: uploadImage } = productApi.useUploadImage();

  const isFileSizeCorrect = (file: any) => {
    if ((file.size / ONE_MB_IN_BYTES) > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const handleClick = () => {
    if (targetZone.current) {
      const current = targetZone.current as any;
      current.click();
    }
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (['image/png', 'image/jpg', 'image/jpeg'].includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG or PNG photos.');
    return false;
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    setErrorMessage(null);

    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      const body = new FormData();
      body.append('file', imageFile, imageFile.name);

      await uploadImage(body, {
        onSuccess: (res) => setImageUrl(res.imageUrl),
        onError: (err) => handleError(err),
      });
    }
  };

  const handlerPhotoRemove = async () => {
    setErrorMessage(null);
    setImageUrl(null);
  };

  return (
    <>
      <Stack>
        <Group align="flex-start" gap={32} style={{ display: 'flex', alignItems: 'center' }}>
          <Stack align="center" gap={10}>
            <Dropzone
              ref={targetZone}
              name="imageUrl"
              accept={['image/png', 'image/jpg', 'image/jpeg']}
              onDrop={handlePhotoUpload}
              classNames={{
                root: classes.dropzoneRoot,
              }}
            >
              <label
                className={cx(classes.browseButton, {
                  [classes.error]: errorMessage,
                })}
              >
                <BackgroundImage
                  className={classes.avatar}
                  w={150}
                  h={150}
                  src={imageUrl || Image.src}
                />

              </label>
            </Dropzone>

            {imageUrl && (
              <Button
                type="submit"
                variant="subtle"
                onClick={handlerPhotoRemove}
                size="sm"
              >
                Remove
              </Button>
            )}
          </Stack>

          <Stack gap={4} pt={6}>
            <Button variant="default" radius="md" onClick={handleClick} style={{ marginTop: 'auto', marginBottom: 'auto', width: 160, fontSize: 16, height: 40 }}>
              Upload Photo
            </Button>
          </Stack>
        </Group>
      </Stack>
      {!!errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default memo(PhotoUpload);
