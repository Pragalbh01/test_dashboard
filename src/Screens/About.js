import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useDispatch } from "react-redux";
import { fetchAboutContent } from "../redux/dataSlice";
import { BASE_URL } from "../config/url";

const About = () => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const dispatch = useDispatch();

  const handleSave = async () => {
    try {
      const rawContent = convertToRaw(editorState.getCurrentContent());

      await axios.post(
        BASE_URL + "api/about/add",
        { content: JSON.stringify(rawContent) },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      alert("About section saved successfully");
    } catch (error) {
      alert("Error saving content");
    }
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await axios.get(BASE_URL + "api/about/get-content", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (res.data?.content) {
          const savedData = convertFromRaw(JSON.parse(res.data.content));
          setEditorState(EditorState.createWithContent(savedData));
        }
      } catch (error) {
        console.error("Error fetching about content");
      }
    };

    fetchContent();
  
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Edit About Section</h2>
      <div className="bg-white p-2 border rounded">
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor p-2"
          onEditorStateChange={(state) => setEditorState(state)}
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-green-600 text-white p-2 mt-4 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default About;