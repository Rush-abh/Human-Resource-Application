import React, { Component, useEffect, useState } from "react";
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import axios from 'axios';
import hrAppBackend from "../../apis/hrAppBackend";
import { Link } from "react-router-dom";


//class Documents extends Component {

//   state = {
//     filter: "",
//     data: [
//       {
//         FileName: "Passport",
//         UploadDate: "26/08/2020",
//         DocumentType: "PDF",
//         Description: "Latest Document"
//       },
//       {
//         FileName: "TFN",
//         UploadDate: "26/08/2020",
//         DocumentType: "PDF",
//         Description: "TFN Number"
//       },
//       {
//         FileName: "Visa",
//         UploadDate: "26/08/2020",
//         DocumentType: "PDF",
//         Description: "Temporary Visa"
//       },
//       {
//         FileName: "Certification",
//         UploadDate: "26/08/2020",
//         DocumentType: "JPG",
//         Description: "Java certification"
//       }
//     ],

//     // Initially, no file is selected 
//     selectedFile: null
//   };

//   handleChange = event => {
//     this.setState({ filter: event.target.value });
//   };
//   // On file select (from the pop up) 
//   onFileChange = event => {

//     // Update the state 
//     this.setState({ selectedFile: event.target.files[0] });

//   };

//   // On file upload (click the upload button) 
//   onFileUpload = () => {

//     // Create an object of formData 
//     const formData = new FormData();

//     // Update the formData object 
//     formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     );

//     // Details of the uploaded file 
//     console.log(this.state.selectedFile);

//     // Request made to the backend api 
//     // Send formData object 
//     //axios.post("api/uploadfile", formData);
//     hrAppBackend.post('/document', form_data)
//       .then(success => {
//         console.log("success");
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   };

//   // File content to be displayed after 
//   // file upload is complete 
//   fileData = () => {

//     if (this.state.selectedFile) {

//       return (
//         <div>
//           <h2>File Details:</h2>
//           <p>File Name: {this.state.selectedFile.name}</p>
//           <p>File Type: {this.state.selectedFile.type}</p>
//           <p>
//             Last Modified:{" "}
//             {this.state.selectedFile.lastModifiedDate.toDateString()}
//           </p>
//         </div>
//       );
//     } else {
//       return (
//         <div>
//           <br />
//           <h4>Choose before Pressing the Upload button</h4>
//         </div>
//       );
//     }
//   };

//   render() {
//     const { filter, data } = this.state;
//     const lowercasedFilter = filter.toLowerCase();
//     const filteredData = data.filter(item => {
//       return Object.keys(item).some(key =>
//         item[key].toLowerCase().includes(lowercasedFilter)
//       );
//     });

//     return (
//       <div>
//         <h1>
//           Employee Documents
//           </h1>
//         <h3>
//           Please upload your file using upload button!
//           </h3>
//         <div>
//           <input type="file" onChange={this.onFileChange} />
//           <button onClick={this.onFileUpload}>
//             Upload!
//               </button>
//         </div>
//         {this.fileData()}

//         <h2>
//           List of File Names
//         </h2>


//         <div>
//           <input value={filter} onChange={this.handleChange} />
//           {filteredData.map(item => (
//             <div key={item.FileName}>
//               <div>
//                 {item.FileName}       {item.UploadDate}      {item.DocumentType}      {item.Description}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }
// }

// export default Documents;

// export default class Documents extends React.Component {


//   state = {
//     title: '',
//     content: '',
//     image: null
//   };

//   handleChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value
//     })
//   };

//   handleImageChange = (e) => {
//     this.setState({
//       image: e.target.files[0]
//     })
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(this.state);
//     let form_data = new FormData();
//     form_data.append('image', this.state.image, this.state.image.name);
//     form_data.append('document_name', this.state.title);
//     form_data.append('document_description', this.state.content);
//     //let url = 'http://127.0.0.1:8000/api/document/';
//     hrAppBackend.post('/document', form_data)
//       .then(success => {
//         console.log("success");
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   };

//   render() {
//     return (
//       <div className="App">
//         <form onSubmit={this.handleSubmit}>
//           <p>
//             <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required />
//           </p>
//           <p>
//             <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required />

//           </p>
//           <p>
//             <input type="file"
//               id="image"
//               accept="image/png, image/jpeg" onChange={this.handleImageChange} required />
//           </p>
//           <input type="submit" />
//         </form>
//       </div>
//     );
//   }
// }

const Document = () => {
  const [files, updateFiles] = useState([]);
  const [searchTerm, updateSearchTerm] = useState("");

  let url = `/document?search=${searchTerm}`
  useEffect(() => {
    hrAppBackend.get(url)
      .then(success => {
        updateFiles(success.data)
      })
      .catch(error => {
        console.log(error);
      })
  }, [url])

  return <div className="row">
    <div className="col-12 col-md-8 offset-md-2">
      <b>Documents</b>
      <hr></hr>
      <Grid container spacing={1} alignItems="flex-end">
        <Grid item>
          <Icon className="fa fa-search" />
        </Grid>
        <Grid item>
          <TextField id="input-with-icon-grid" label="Search" value={searchTerm} onChange={(event) => { updateSearchTerm(event.target.value) }} />
        </Grid>
      </Grid>
      <table>
        <thead>
          <tr>
            <td><b>File Name</b></td>
            <td><b>Upload Date</b></td>
            <td><b>Document Type</b></td>
            <td><b>Description</b></td>
          </tr>

        </thead>

        <tbody>
          {
            files.map(exampleFile => {
              return <tr>
                <td>{exampleFile.document_name}</td>
                <td>{exampleFile.document_upload_date}</td>
                <td>{exampleFile.document_type}</td>
                <td>{exampleFile.document_description}</td>
                <td><a href={exampleFile.file_location}>View File</a></td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>
  </div>
}

export default Document;