import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch, useSelector } from "react-redux";
import { productDescription } from "../../../redux/features/sellers/sellerProductSlice";

const MyEditor = () => {
  const dispatch = useDispatch();
  const [editorData, setEditorData] = useState("");

  const { productId } = useSelector((state) => state.sellerProducts);

  return (
    <div>
      {/* <h2>Using CKEditor 5 with Custom Upload Adapter in React</h2> */}
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        config={{
          extraPlugins: [MyCustomUploadAdapterPlugin],
        }}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
          //   console.log({ event, editor, data });
          console.log(data, "7777");
          console.log({ data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
      <div>
        <br />
        <br />
        <button
          className="edit"
          onClick={() => {
            dispatch(
              productDescription({
                productDescription: editorData,
                productId: productId,
              })
            );
          }}
        >
          Save
        </button>
        <br />
        <br />
        <h3>Editor Data</h3>
        {console.log(editorData.replaceAll('"', "'"), "editorData")}
        <div
          className="edtr_paras"
          dangerouslySetInnerHTML={{ __html: editorData }}
        >
          {/* <img src={URL.createObjectURL(imgFile)} /> */}
        </div>
      </div>
    </div>
  );
};

class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
    this.url = "http://15.206.169.180/api/products/uploadImageForProductDesc"; // Replace with your upload URL
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const data = new FormData();
          console.log(file, "file999");
          //   setImgFile(file);
          data.append("upload", file);

          fetch(this.url, {
            method: "POST",
            body: data,
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(result, "result");
              resolve({
                default: result.url, // The URL where the file is stored
              });
            })
            .catch((error) => {
              reject(error);
            });
        })
    );
  }

  abort() {
    // This method can be used to abort the upload process if necessary
  }
}

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    console.log(loader, "loader");
    return new MyUploadAdapter(loader);
  };
}

export default MyEditor;
