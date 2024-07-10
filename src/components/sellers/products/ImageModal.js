import React, { useState, useRef } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useDispatch, useSelector } from "react-redux";
import { saveDataWithImage } from "../../../redux/features/sellers/sellerProductSlice";

const ImageModal = ({ modal, setModal, variantId, picDetail }) => {
  console.log(picDetail, "picDetail");
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState(null);
  const [productImageUrl, setProductImageUrl] = useState("");
  const [croppedImage, setCroppedImage] = useState("");
  console.log(croppedImage, "croppedImage");
  const [modalData, setModalData] = useState({
    imageName: "",
    altName: "",
    productImage: "",
  });
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [isCropped, setIsCropped] = useState(false);
  console.log(isCropped, "isCropped");
  const { productImages } = useSelector((state) => state.sellerProducts);

  const toggle = () => {
    setModal(!modal);
    setProductImageUrl("");
    setCroppedImage("");
  };

  const modalCancel = () => toggle();

  const modalInput = (e) => {
    setIsCropped(false);
    const { name, type, value, files } = e.target;
    if (type === "text") {
      setModalData({ ...modalData, [name]: value });
    } else if (type === "file" && files.length > 0) {
      const file = files[0];
      setProductImage(file);
      setProductImageUrl(URL.createObjectURL(file));
      setModalData({ ...modalData, productImage: file });
    }
  };

  const saveModalData = () => {
    setIsCropped(false);
    const finalData = new FormData();
    for (const key in modalData) {
      finalData.append(key, modalData[key]);
    }
    if (croppedImage) {
      finalData.append("croppedImage", croppedImage);
    }
    console.log("modalData:", modalData);
    console.log("finalData:", finalData);
    // Replace with your own save logic
    dispatch(saveDataWithImage({ finalData, variantId }));
    toggle();
    setCroppedImage("");
    setProductImageUrl("");
  };

  const onImageLoad = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setCrop(
      centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, 1, width, height),
        width,
        height
      )
    );
  };

  const onComplete = (c) => {
    setCompletedCrop(c);
  };

  const handleCropComplete = async () => {
    setIsCropped(true);
    if (completedCrop?.width && completedCrop?.height && imgRef.current) {
      const canvas = document.createElement("canvas");
      const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
      const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) return;

      ctx.drawImage(
        imgRef.current,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0,
        0,
        completedCrop.width,
        completedCrop.height
      );
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const file = new File([blob], "image.jpg", { type: blob.type });
        console.log(file, "file");
        setModalData({ ...modalData, productImage: file });

        const fileUrl = URL.createObjectURL(blob);
        setCroppedImage(fileUrl);
      }, "image/jpeg");
    }
  };

  return (
    <div className="ttl_mdl">
      <Modal
        className="prdct_mdl adp_new_modal"
        isOpen={modal}
        toggle={toggle}
        centered
        fade
        size="lg"
        backdrop
      >
        {picDetail._id ? (
          <ModalHeader>Image Details</ModalHeader>
        ) : (
          <ModalHeader toggle={toggle}>Upload Image & Details</ModalHeader>
        )}
        <ModalBody>
          <div className="modal_body_flxone">
            <label htmlFor="imageName">Image Name: </label>
            {picDetail._id ? (
              <input
                id="imageName"
                type="text"
                name="imageName"
                value={picDetail?.imageName}
              />
            ) : (
              <input
                id="imageName"
                type="text"
                name="imageName"
                onChange={modalInput}
              />
            )}
            <br />
            <label htmlFor="altName">Alt Name: </label>
            {picDetail._id ? (
              <input
                id="altName"
                type="text"
                name="altName"
                value={picDetail?.altName}
              />
            ) : (
              <input
                id="altName"
                type="text"
                name="altName"
                onChange={modalInput}
              />
            )}
            <br />
            {/* {picDetail._id && <img src={picDetail?.url} />} */}
            {croppedImage && (
              <div>
                <h3>Cropped Image Preview:</h3>
                <img src={croppedImage} alt="Cropped" />
              </div>
            )}
          </div>
          <br />
          <>
            {picDetail._id ? (
              <img src={picDetail?.url} />
            ) : (
              <div className="modal_body_flxtwo">
                <input
                  type="file"
                  name="Product Image"
                  accept="image/*"
                  onChange={modalInput}
                />
                <br />
                <br />
                {productImageUrl && (
                  <>
                    <ReactCrop
                      crop={crop}
                      onChange={(newCrop) => setCrop(newCrop)}
                      onComplete={onComplete}
                    >
                      <img
                        ref={imgRef}
                        alt="Product"
                        src={productImageUrl}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                    <button
                      type="button"
                      className="edit"
                      onClick={handleCropComplete}
                    >
                      Crop
                    </button>
                  </>
                )}
              </div>
            )}
          </>
        </ModalBody>
        {!picDetail._id && (
          <ModalFooter>
            <Button
              disabled={!isCropped}
              color="primary"
              className="modalBtn"
              onClick={saveModalData}
            >
              Add
            </Button>
            <Button
              color="secondary"
              // className="modalBtn"
              className="edit"
              onClick={modalCancel}
            >
              Cancel
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  );
};

export default ImageModal;
