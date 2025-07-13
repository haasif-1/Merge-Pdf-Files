const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: true })); 

// import { mergePDFs } from './merge.js';
const {mergePDFs} = require('./merge')

app.get('/', (req, res) => {
   
  res.sendFile(path.join(__dirname,"templates/index.html"))
})


app.post('/merge', upload.array('pdfs', 2), async (req, res) => {

    const file1 = path.join(__dirname, req.files[0].path);
    const file2 = path.join(__dirname, req.files[1].path);
    const { range1, range2 } = req.body;
      
    // console.log(req.files)
// res.json({
//   files: req.files,
//   ranges: { range1, range2 }
// });

    console.log("Files:", req.files);
    console.log("Ranges:", range1, range2);
    const get_d = await mergePDFs(file1 ,range1, file2 ,range2);
    res.redirect(`http://localhost:3000/static/${get_d}.pdf`);

});


app.listen(port, () => {
      console.log('Hello world')
  console.log(`Example app listening on port http://localhost:${port}`)
})