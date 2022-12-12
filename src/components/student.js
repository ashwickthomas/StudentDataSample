import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Container,Paper} from '@mui/material';
import { Button } from '@mui/material';

export default function BasicTextFields() {

    const paperStyle ={padding:'50px 40px', width:600,height:'auto', top:10,margin:'20px auto' };
    const[name,setName]= React.useState('');
    const[address,setAddress]=React.useState('');
    const[students,setStudents]=React.useState([]);

    const handleClick=(e)=>
    {
        e.preventDefault();
         console.log(name);
    const student = {name,address};

    fetch("http://localhost:8080/student/save",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(student)

    }).then(()=> 
    {
        console.log("Ne Student Added");
    });

    }

    React.useEffect(()=>
    {
            fetch("http://localhost:8080/student/getstudents")
            .then(res=>res.json())
            .then(result=>setStudents(result))

    })

  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
        <Container style={{padding:'10px 270px'}}>
            <Paper elevation={3} style={paperStyle} >
                <h1 style={{color:'blue'}}>Add Student</h1>
                <div style={{padding:'10px'}}>
      <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth onChange={(e)=>{setName(e.target.value)}}/>
      </div>
      <div style={{padding:'10px'}}>
      <TextField id="outlined-basic" label="Address" variant="outlined" fullWidth onChange={(e)=>{setAddress(e.target.value)}}/>
      </div>
      <Button variant="contained" onClick={handleClick}>Submit</Button>
      </Paper>
      <Paper elevation ={3} style={paperStyle}>
        
        {students.map(student=>
        (
              <Paper elevation={6} style={{margin:'10px',padding:'15px',textAlign:"left"}} key={student.id}>
                Id:{student.id}<br></br>
                Name:{student.name}<br></br>
                Address:{student.address}<br></br>
              </Paper>
        ))
}    

 </Paper>
      </Container>
    </Box>
  );
}
