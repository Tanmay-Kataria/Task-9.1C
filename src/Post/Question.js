import React, { useState } from "react";
import {getDatabase, ref, set, push, child } from "firebase/database";
import app from '../Login/firebase';

const ForQuestion = () => {
  const [formData, setFormData] = useState({ // The state for form data in questions is defined and set as null in default. 
    title: "",
    description: "",
    tag: "",
    date:""
  });

  const handleChange = (event) => { // All the values of FormData are upadated through this handle change method. 
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const uploadquesData = (event) => { // Data is uploaded to the firebase along with time so that it can be further used to filter data. 
    const unixTimestamp = Math.floor(Date.now() / 1000);
    let date = new Date(unixTimestamp * 1000);
    date = date.toLocaleString(); 
    formData.date = date;

    event.preventDefault();
    const database = getDatabase(app);
    const id = push(child(ref(database), 'questions/')).key;
    set(ref(database,`questions/${id}`), {
      title: formData.title,
      description: formData.description,
      tag: formData.tag,
      date: formData.date
    }).then(() => {
      console.log("Data stored in Realtime Database successfully.");
      console.log(formData);
    });
                    
    alert("Data submitted");
    setFormData({ // Reset the data that is being displayed on the form. 
      title: "",
      description: "",
      tag: "",
      date:""
    });
  };

  return (
    <div className="info-area">
      <p>This section is designed based on the type of the post. 
        It could be developed by conditional rendering.</p>
      <label for="title">Title  </label>
      <input type='text' name='title' id='title' placeholder='Start your question with how, what, why, etc.' value={formData.title} onChange={handleChange}/><br></br><br></br>

      <label for="description">Describe your problem </label><br></br>
      <textarea id='description' className="textar" rows={10} name='description' value={formData.description} onChange={handleChange}></textarea><br></br><br></br>
  
      <label for="tag">Tags </label>
      <input type='text' name='tag' id='tag' placeholder='Please add up to 3 tags to describe what your question is about e.g., Java' value={formData.tag} onChange={handleChange}/><br></br>
      <button className="submit-butn" onClick={uploadquesData}>Post</button>
    </div>
  );
};

export default ForQuestion;